/**
*  Module
*
* Description
*/
angular.module('app').controller('SummaryController', function($scope, $location){
	
	$scope.goReserve = function(){
		$location.path('/reserve');
	}

	$scope.goSeatPicker = function () {
		$location.path('/seatPicker');
	}
});