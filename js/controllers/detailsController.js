angular.module('app').controller('DetailsController', ['$scope', '$location', '$anchorScroll', 'tripService', 'scheduleService', 'localStorageService', 'wsService', function ($scope, $location, $anchorScroll, tripService, scheduleService, localStorageService, wsService){

	var wsdl_url = 'https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepCEnc.dll/soap/ILepWebService';
  	var urn = 'LepWebServiceIntf-ILepWebService';
	$scope.isRoundTrip = tripService.getDepartureTrip().round_trip === 1;
	$scope.price = tripService.getTripPrice();
  	$scope.trip = tripService.getDepartureTrip();  
  	$scope.passengers = tripService.getPassengers();
  	$scope.schedule = scheduleService.getSchedule();
  	if($scope.trip == undefined || $scope.schedule == undefined){
        $location.path('/'); 
    }
	$scope.scheduleReturn = scheduleService.getScheduleReturn();
	$scope.seatsSelectedGo = tripService.getSelectedSeatsGo();
	$scope.seatsSelectedReturn = tripService.getSelectedSeatsReturn();
	$anchorScroll();
	
	$scope.goMercadopagoBuy = function() {
		tripService.savePurchaseOrigin(0);	    $location.path('/buy');	 
	};

	$scope.goReserve= function() {
		addReserve("0");
	     
	};
	$scope.goBack = function () {
		window.history.back();
	}

	$scope.$on('$routeChangeStart', function (scope, next, current) {
        if (next.$$route.controller == "SeatsController") {
            $location.path('/');	
        }
    });

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
	               tripService.setBuy(0);
	               $location.path('/endReserve');	
			});
		}
}]);