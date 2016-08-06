angular.module('app').controller('LastSearchesController', ['$scope', '$location', '$anchorScroll', function ($scope, $location, $anchorScroll){
	$anchorScroll();				
  	$scope.goSchedules = function() {
	    $location.path('/schedules');	 
	    //seat.img = '../img/occupied_seat.png'
	};

}]);