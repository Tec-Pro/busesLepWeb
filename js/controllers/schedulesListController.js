angular.module('app').controller('ScheduleController', function ($scope, $location, tripService, scheduleService, $filter){
	
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

  	$scope.schedules = tripService.getSchedules();
	
		$scope.origin = tripService.getTripOriginName();
	
		$scope.destination = tripService.getTripDestinationName();
	
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