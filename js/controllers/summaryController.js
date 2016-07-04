/**
*  Module
*
* Description
*/
angular.module('app').controller('SummaryController', function($scope, $location, tripService, scheduleService){
	
	$scope.isBuy = false;
	$scope.isRoundTrip = tripService.getDepartureTrip().round_trip === 1;
	$scope.price = tripService.getTripPrice();
	window.scrollTo(0,140);
	
	$scope.trip = {
		// origin: tripService.getTrip().origin_name,
		// destination: tripService.getTrip().destination_name,
		// departure1: scheduleService.getSchedule().departure_datetime_1,
		// arrival1: scheduleService.getSchedule().arrival_datetime_1,
		// departure2: scheduleService.getSchedule().departure_datetime_2,
		// arrival2: scheduleService.getSchedule().arrival_datetime_2,
		amount: ''
	};

	if($scope.isRoundTrip){

	};

	$scope.schedule = scheduleService.getSchedule();
	$scope.scheduleReturn = scheduleService.getScheduleReturn();

	$scope.goSeatPicker = function () {
		$location.path('/seatPicker');
		tripService.setBuy(1);
	}
	
	$scope.goBack = function () {
		window.history.back();
	}

	$scope.goReserve = function(){
		$location.path('/reserveDetails');
		tripService.setBuy(0);	
	}
});