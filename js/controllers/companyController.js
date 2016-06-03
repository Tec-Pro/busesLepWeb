angular.module('app')
.controller('CompCtrl', function($scope, $location){

	$scope.active = 1;

	$scope.set_active = function(tab){
		$scope.active = tab;
	}
});