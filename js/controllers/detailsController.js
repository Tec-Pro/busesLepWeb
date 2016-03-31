angular.module('app').controller('DetailsController', function ($scope, $routeParams, $location){

	$scope.buy = $routeParams.isBuy;
	$scope.roundTrip = $routeParams.isRoundTrip;
	$scope.code = 2456;
	$scope.goEnd = function() {
	    $location.path('/endPurchase/' + $scope.code);	 
	    //seat.img = '../img/occupied_seat.png'
	};
	$scope.goReserve= function() {
	    $location.path('/endReserve');	 
	};
});