/**
*  Module
*
* Description
*/
angular.module('app').controller('SummaryController', function($scope, $location, tripService){
	
	$scope.isBuy = tripService.getBuy();
	$scope.isRoundTrip = tripService.getRoundTrip();

	$scope.goReserve = function(){
		$location.path('/details/{{}}');
	}

	$scope.goSeatPicker = function () {
		$location.path('/seatPicker');
	}
});