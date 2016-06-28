angular.module('app').controller('ScheduleController', function ($scope, $location, tripService, scheduleService, $filter, wsService){
	
	$scope.schedules = tripService.getSchedules();

	console.log($scope.schedules);

	$scope.departure_trip = tripService.getDepartureTrip();
	$scope.origin = $scope.departure_trip.origin_name;

	$scope.destination = $scope.departure_trip.destination_name;

	$scope.wsdl_url = 'https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepCEnc.dll/soap/ILepWebService';
	$scope.urn = 'LepWebServiceIntf-ILepWebService';
	$scope.method = 'ObtenerTarifaTramo';
	$scope.parameters = [
		{
			name: "userWS",
			type: "string",
			value: "UsuarioLep"
		},
		{
			name: "passWS",
			type: "string",
			value: "Lep1234"
		},
		{
			name: "ID_LocalidadOrigen",
			type: "int",
			value: $scope.departure_trip.origin_id
		},
		{
			name: "ID_LocalidadDestino",
			type: "int",
			value: $scope.departure_trip.destination_id
		}
	]

	wsService.callService($scope.wsdl_url, $scope.urn, $scope.method, $scope.parameters).then(function(tarifas){
 		result = tarifas.split("-");
 		$scope.goPrice = Number(result[0].trim().substring(7));
 		$scope.roundTripPrice = Number(result[1].trim().substring(13));
 	});
 	
	//riocuarto es id=10 cordoba plaza es id=1
	//Date picker options
    $scope.dpOpts = {
        locale: {
          format: "DD/MM",
          daysOfWeek: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie','Sab'],
          monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        },
        //If it's a single date picker or not.
        singleDatePicker: true,
        //If month dropdowns should be shown.
        showDropdowns: true
    };



	$scope.params = {
      today: moment(),
      origin: '',
      destination: '',
      departureDate: moment(),
      returnDate: moment(),
      amount: ''
    };

  	
	
  	$scope.goSummary = function(index) {
			/*var selectedSchedule = $scope.schedules[index];
			console.log(selectedSchedule);
			scheduleService.setScheduleFirstDepartureDatetime(selectedSchedule.fechahora);
			scheduleService.setScheduleFirstArrivalDatetime(selectedSchedule.FechaHoraLlegada);
			
			console.log(scheduleService.getSchedule());*/
			
	    $location.path('/summary');
			
	};

	$scope.range = function(min, max, step){
		    step = step || 1;
		    var input = [];
		    for (var i = min; i <= max; i += step) input.push(i);
		    return input;
  		};
});