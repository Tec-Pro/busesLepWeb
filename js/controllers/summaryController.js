/**
*  Module
*
* Description
*/
angular.module('app').controller('SummaryController', function($scope, $location, tripService){
	
	$scope.isBuy = tripService.getBuy();
	$scope.isRoundTrip = tripService.getRoundTrip();

	$scope.goSeatPicker = function () {
		$location.path('/seatPicker');
		tripService.setBuy(1);
	}

	$scope.goReserve = function(){
		$location.path('/details');
		tripService.setBuy(0);	
	}
});