/**
*  Module
*
* Description
*/
angular.module('app').controller('SummaryController', ['$scope', '$location', '$anchorScroll', 'tripService', 'scheduleService', 'localStorageService', 'wsService', function($scope, $location, $anchorScroll, tripService, scheduleService, localStorageService, wsService){
  var wsdl_url = 'https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepCEnc.dll/soap/ILepWebService';
  var urn = 'LepWebServiceIntf-ILepWebService';
  $scope.isBuy = false;
  $scope.isRoundTrip = tripService.getDepartureTrip().round_trip === 1;
  $scope.trip = tripService.getDepartureTrip();
  $scope.origin_office = tripService.getOriginOffice().origin_office;


  $scope.passengers = 1;
  ////console.log(localStorageService.get("user-lep").dni);
  //
  $anchorScroll();
  /*$scope.trip = {
    // origin: tripService.getTrip().origin_name,
    // destination: tripService.getTrip().destination_name,
    // departure1: scheduleService.getSchedule().departure_datetime_1,
    // arrival1: scheduleService.getSchedule().arrival_datetime_1,
    // departure2: scheduleService.getSchedule().departure_datetime_2,
    // arrival2: scheduleService.getSchedule().arrival_datetime_2,
    amount: ''
  };*/


  $scope.schedule = scheduleService.getSchedule();
  if ($scope.schedule === null){
    $location.path('/');
  }
  $scope.scheduleReturn = scheduleService.getScheduleReturn();
  if(tripService.getDepartureTrip().round_trip === 1){
  	$scope.price = $scope.schedule.precio + $scope.scheduleReturn.precioVuelta;
  } else {
  	$scope.price = $scope.schedule.precio;
  }

  if($scope.trip == undefined || $scope.schedule == undefined){
        $location.path('/');
  }

  $scope.goSeatPicker = function () {

    if(localStorageService.get("user-lep") == null || localStorageService.get("user-lep") == undefined){
      localStorageService.set('BackTo','/summary');
      $location.path('/login');
      return;
    }

    if(localStorageService.get("user-lep").email == ""){
      localStorageService.set('BackTo','/summary');
      $location.path('/login');
    }
    else{
      addReserve("1");
    }
  }

  $scope.goBack = function () {
    window.history.back();
  }

  $scope.goReserve = function(){
    tripService.savePassengers($scope.passengers);
    if(localStorageService.get("user-lep") == null || localStorageService.get("user-lep") == undefined){
      localStorageService.set('BackTo','/summary');
      $location.path('/login');
      return;
    }
    if(localStorageService.get("user-lep").email == ""){
      localStorageService.set('BackTo','/summary');
      $location.path('/login');
    }
    else{
      addReserve("0");
      //$location.path('/reserveDetails');
    }
  }

  addReserve = function(isBuy){
    var idEmprVuelta = '0';
    var idDestVuelta = '0';
    var codHorarioVuelta = '0';
    var idLocDesdeVuelta = '0';
    var idLocHastaVuelta = '0';
    var cantVuelta = '0';
    if($scope.isRoundTrip){
      idEmprVuelta = $scope.scheduleReturn.Id_Empresa;
      idDestVuelta = $scope.scheduleReturn.id_destino;
      codHorarioVuelta = $scope.scheduleReturn.cod_horario;
      idLocDesdeVuelta = $scope.trip.destination_id;
      idLocHastaVuelta = $scope.trip.origin_id;
      cantVuelta = $scope.passengers;
    }

    var add_reserve_parameters = [
          {
            name: "Dni",
            type: "string",
            value: localStorageService.get("user-lep").dni.toString()
          },
          {
            name: "IDEmpresaIda",
            type: "int",
            value: $scope.schedule.Id_Empresa.toString()
          },
          {
            name: "IDDestinoIda",
            type: "int",
            value: $scope.schedule.id_destino.toString()
          },
          {
            name: "CodHorarioIda",
            type: "int",
            value: $scope.schedule.cod_horario.toString()
          },
          {
            name: "IdLocalidadDesdeIda",
            type: "int",
            value: $scope.trip.origin_id.toString()
          },
          {
            name: "IdlocalidadHastaIda",
            type: "int",
            value: $scope.trip.destination_id.toString()
          },
          {
            name: "CantidadIda",
            type: "int",
            value: $scope.passengers.toString()
          },
          {
            name: "IDEmpresaVuelta",
            type: "int",
            value: idEmprVuelta.toString()
          },
          {
            name: "IDDestinoVuelta",
            type: "int",
            value: idDestVuelta.toString()
          },
          {
            name: "CodHorarioVuelta",
            type: "int",
            value: codHorarioVuelta.toString()
          },
          {
            name: "IdLocalidadDesdeVuelta",
            type: "int",
            value: idLocDesdeVuelta.toString()
          },
          {
            name: "IdlocalidadHastaVuelta",
            type: "int",
            value: idLocHastaVuelta.toString()
          },
          {
            name: "CantidadVuelta",
            type: "int",
            value: cantVuelta.toString()
          },
          {
            name: "EsCompra",
            type: "int",
            value: isBuy
          },
          {
            name: "id_plataforma",
            type: "int",
            value: "3"
          }
        ];
      wsService.callService(wsdl_url, urn, "AgregarReserva", add_reserve_parameters, true).then(function(response){
          if(response > 0){
              tripService.saveSellCode(response);
              tripService.saveTripPrice($scope.price * $scope.passengers);
              tripService.savePassengers($scope.passengers);
              if(isBuy){
                $location.path('/seatPicker');
              }
          }
          if(response == 0){
            tripService.setBuy(0);
            $location.path('/endReserve'); 
          }
          if(response < 0){
            //console.log("problema al reservar");
          }
      });
  }

}]);
