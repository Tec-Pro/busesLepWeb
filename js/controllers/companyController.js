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

	$scope.gallery_thumbnails = [
		{
			source: "./img/company/thumbnail1.png",
			full_size: ""
		},
		{
			source: "./img/company/thumbnail2.png",
			full_size: ""
		},
		{
			source: "./img/company/thumbnail3.png",
			full_size: ""
		},
		{
			source: "./img/company/thumbnail4.png",
			full_size: ""
		},
		{
			source: "./img/company/thumbnail5.png",
			full_size: ""
		}
	]
});