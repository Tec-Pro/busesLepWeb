angular.module('app')
.controller('SpecialTravelCtrl', function($scope, $location){

  $scope.active_gall_img = 2;
  $scope.is_fullscreen = false;
  
	//Date picker options
  $scope.dpOpts = {
      locale: {
        format: "DD/MM/YYYY",
        daysOfWeek: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie','Sab'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
      },
      //If it's a single date picker or not.
      singleDatePicker: true,
      //If month dropdowns should be shown.
      showDropdowns: true
  }


  $scope.params = {
    today: moment(),
    departureDate: moment(),
    returnDate: ''
  }

  $scope.$watch('params.departureDate', function(date){
    if ($scope.params.returnDate !== ''){ 
      var a = $scope.params.returnDate;
      var b = date;
      if (a.isBefore(b, 'day')){
        $scope.params.returnDate = date;
      }
    }
  })

  $scope.gallery_thumbnails = [
    {
      source: "./img/special/thumbnail1.png",
      full_size: "./img/special/fullscreen1.png"
    },
    {
      source: "./img/special/thumbnail2.png",
      full_size: "./img/special/fullscreen2.png"
    },
    {
      source: "./img/special/thumbnail3.png",
      full_size: "./img/special/fullscreen3.png"
    },
    {
      source: "./img/special/thumbnail4.png",
      full_size: "./img/special/fullscreen4.png"
    },
    {
      source: "./img/special/thumbnail5.png",
      full_size: "./img/special/fullscreen5.png"
    }
  ];

  $scope.set_active_gall_img = function(pos){
    if (0 <= pos || pos <= 4){
      $scope.active_gall_img = pos;
    }
  };

  $scope.active_gall_img_right = function(){
    if ($scope.active_gall_img == 4){
      $scope.active_gall_img = 0;
    } else {
      $scope.active_gall_img++;
    }
  };


  $scope.active_gall_img_left = function(){
    if ($scope.active_gall_img == 0){
      $scope.active_gall_img = 4;
    } else {
      $scope.active_gall_img--;
    }
  };
});