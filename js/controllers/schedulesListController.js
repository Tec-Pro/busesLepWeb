angular.module('app').controller('ScheduleController', function ($scope, $location, tripService, scheduleService, $filter){
	
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

window.onbeforeunload = function(){
    window.scrollTo(0,0);
}