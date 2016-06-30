angular.module('app').controller('ScheduleController', function ($scope, $location, tripService, scheduleService, $filter, wsService){
	var wsdl_url = 'https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepCEnc.dll/soap/ILepWebService';
    var urn = 'LepWebServiceIntf-ILepWebService';

	$scope.schedules = tripService.getSchedules();

	$scope.departure_trip = tripService.getDepartureTrip();
	$scope.origin = $scope.departure_trip.origin_name;

	$scope.destination = $scope.departure_trip.destination_name;

	$scope.$watch('params.departureDate', function(date){
    	if (!$scope.params.departureDate.isSame($scope.departure_trip.departure_date)){
	        var listarHorarios_parameters = [
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
	            name: "IdLocalidadOrigen",
	            type: "int",
				value: $scope.departure_trip.origin_id
	        },
	        {
	            name: "IdLocalidadDestino",
	            type: "int",
				value: $scope.departure_trip.destination_id
	        },
	        {
	        	name: "Fecha",
	          	type: "string",
	          	value: $scope.params.departureDate.format("YYYYMMDD")
	        },
	        {
	            name: "DNI",
	            type: "int",
	            value: "1"
	        },
	        {
	            name: "id_plataforma",
	            type: "int",
	            value: "3"
			}          
        ];
        wsService.callService(wsdl_url, urn, "ListarHorarios", listarHorarios_parameters).then(function(schedules){
			if (schedules.length > 0){
				$scope.schedules = schedules;
			} else {
				window.alert("No existen viajes para esa fecha");
			}
		});
	
    	}
    });
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
      departureDate: $scope.departure_trip.departure_date,
      returnDate: moment(),
    };

  	console.log($scope.schedules);
	
  	$scope.goSummary = function(index) {
		var selectedSchedule = $scope.schedules[index];
		scheduleService.setScheduleFirstDepartureDatetime(selectedSchedule.fechahora);
		scheduleService.setScheduleFirstArrivalDatetime(selectedSchedule.FechaHoraLlegada);
		scheduleService.setSchedulePrice($scope.goPrice);
		scheduleService.setScheduleStatus(selectedSchedule.ServicioPrestado);
		scheduleService.setScheduleDuration(selectedSchedule.DemoraViaje);
		scheduleService.setScheduleDestinationId($scope.departure_trip.destination_id);
		scheduleService.setScheduleOriginId($scope.departure_trip.origin_id);
		scheduleService.setScheduleDestinationName($scope.departure_trip.destination_name);
		scheduleService.setScheduleOriginName($scope.departure_trip.origin_name);		
	    $location.path('/summary');
			
	};

	$scope.range = function(min, max, step){
		    step = step || 1;
		    var input = [];
		    for (var i = min; i <= max; i += step) input.push(i);
		    return input;
  		};
});