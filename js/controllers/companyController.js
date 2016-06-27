angular.module('app')
.controller('CompCtrl', function($scope, $location, companyService, Lightbox){

	$scope.active = 4;
	$scope.active_unit_tab = companyService.getActiveUnitTab();
	$scope.active_gall_img = 2;

	$scope.set_active = function(tab){
		$scope.active = tab;
	}

	$scope.set_active_unit_tab = function(tab){
		$scope.active_unit_tab = tab;
	}

	$scope.images = [
		{
			thumbnail: "./img/company/thumbnail1.png",
			url: "./img/company/fullsize1.png"
		},
		{
			thumbnail: "./img/company/thumbnail2.png",
			url: "./img/company/fullsize2.png"
		},
		{
			thumbnail: "./img/company/thumbnail3.png",
			url: "./img/company/fullsize3.png"
		},
		{
			thumbnail: "./img/company/thumbnail4.png",
			url: "./img/company/fullsize4.png"
		},
		{
			thumbnail: "./img/company/thumbnail5.png",
			url: "./img/company/fullsize5.png"
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

	$scope.openImage = function (index) {
    	Lightbox.openModal($scope.images, index);
  	};
});