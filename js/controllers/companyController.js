angular.module('app')
.controller('CompCtrl', function($scope, $location){

	$scope.active = 1;
	$scope.active_unit_tab = 1;
	$scope.active_gall_img = 2;

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

	$scope.set_active_gall_img = function(pos){
		if (0 <= pos || pos <= 4){
			$scope.active_gall_img = pos;
		}
	}

	$scope.active_gall_img_right = function(){
		if ($scope.active_gall_img == 4){
			$scope.active_gall_img = 0;
		} else {
			$scope.active_gall_img++;
		}
	}


	$scope.active_gall_img_left = function(){
		if ($scope.active_gall_img == 0){
			$scope.active_gall_img = 4;
		} else {
			$scope.active_gall_img--;
		}
	}
});