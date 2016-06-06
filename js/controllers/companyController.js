angular.module('app')
.controller('CompCtrl', function($scope, $location){

	$scope.active = 1;
	$scope.active_unit_tab = 1;

	$scope.set_active = function(tab){
		$scope.active = tab;
	}

	$scope.set_active_unit_tab = function(tab){
		$scope.active_unit_tab = tab;
	}
});