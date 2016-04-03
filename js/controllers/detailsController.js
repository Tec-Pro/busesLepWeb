angular.module('app').controller('DetailsController', function ($scope, $location, tripService){

	$scope.buy = tripService.getBuy();
	$scope.roundTrip = tripService.getRoundTrip();
	$scope.code = 2456;
	$scope.goEnd = function() {
	    $location.path('/endPurchase/' + $scope.code);	 
	    //seat.img = '../img/occupied_seat.png'
	};
	$scope.goReserve= function() {
	    $location.path('/endReserve');	 
	};
});