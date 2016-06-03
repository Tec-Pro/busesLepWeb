angular.module('app')
.controller('CompCtrl', function($scope, $location){

	$scope.hide-history = false;
	$scope.hide-about-us = true;
	$scope.hide-contact-us = true;
	$scope.hide-units = true;

	$scope.set_active = function(tab){
		switch(tab){
			case 1: 
				$scope.hide-history = false;
				$scope.hide-about-us = true;
				$scope.hide-contact-us = true;
				$scope.hide-units = true;
				break;
			case 2:
				$scope.hide-history = true;
				$scope.hide-about-us = false;
				$scope.hide-contact-us = true;
				$scope.hide-units = true;
				break;
			case 3:
				$scope.hide-history = true;
				$scope.hide-about-us = true;
				$scope.hide-contact-us = false;
				$scope.hide-units = true;
				break;
			case 4:
				$scope.hide-history = true;
				$scope.hide-about-us = true;
				$scope.hide-contact-us = true;
				$scope.hide-units = false;
				break;
			default:
				break;
		}
	}
});