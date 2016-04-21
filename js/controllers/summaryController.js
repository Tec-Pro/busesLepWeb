/**
*  Module
*
* Description
*/
angular.module('app').controller('SummaryController', function($scope, $location, tripService, scheduleService){
	
	$scope.isBuy = tripService.getBuy() === 1;
	$scope.isRoundTrip = tripService.getRoundTrip() === 1;
	
	console.log($scope.isRoundTrip);
	
	$scope.trip = {
		origin: tripService.getTrip().origin_name,
		destination: tripService.getTrip().destination_name,
		departure1: scheduleService.getSchedule().departure_datetime_1,
		arrival1: scheduleService.getSchedule().arrival_datetime_1,
		departure2: scheduleService.getSchedule().departure_datetime_2,
		arrival2: scheduleService.getSchedule().arrival_datetime_2,
		amount: tripService.getTrip().ticket_amount
	};
	$scope.goSeatPicker = function () {
		$location.path('/seatPicker');
		tripService.setBuy(1);
	}

	$scope.goReserve = function(){
		$location.path('/details');
		tripService.setBuy(0);	
	}
});