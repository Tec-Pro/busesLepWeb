angular.module('app').controller('LastSearchesController', ['$scope', '$location', '$anchorScroll', function ($scope, $location, $anchorScroll){
	$anchorScroll();	

	$scope.go = function ( path ) {
      $location.path( path );
    };
    			
  	$scope.goSchedules = function() {
	    $location.path('/schedules');	 
	    //seat.img = '../img/occupied_seat.png'
	};

}]);