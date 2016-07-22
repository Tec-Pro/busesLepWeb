angular.module('app')
.controller('SpecialTravelCtrl', function($scope, $location){

  $scope.active_gall_img = 2;
  $scope.active_gall_thmb = $scope.active_gall_img;
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

  $scope.gallery_images = [
    {
      source: "./img/special/thumbnail1.png",
      full_size: "./img/special/fullsize1.png"
    },
    {
      source: "./img/special/thumbnail2.png",
      full_size: "./img/special/fullsize2.png"
    },
    {
      source: "./img/special/thumbnail3.png",
      full_size: "./img/special/fullsize3.png"
    },
    {
      source: "./img/special/thumbnail4.png",
      full_size: "./img/special/fullsize4.png"
    },
    {
      source: "./img/special/thumbnail5.png",
      full_size: "./img/special/fullsize5.png"
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

  $scope.set_active_gall_thmb = function(pos){
    if (0 <= pos || pos <= 4){
      $scope.active_gall_thmb = pos;
      $scope.active_gall_img = pos;
    }
  };

  $scope.active_gall_thmb_right = function(){
    if ($scope.active_gall_thmb == 4){
      $scope.active_gall_thmb = 0;
      $scope.active_gall_img = 0;
    } else {
      $scope.active_gall_thmb++;
      $scope.active_gall_img++;
    }
  };


  $scope.active_gall_thmb_left = function(){
    if ($scope.active_gall_thmb == 0){
      $scope.active_gall_thmb = 4;
      $scope.active_gall_img = 0;
    } else {
      $scope.active_gall_thmb--;
      $scope.active_gall_img--;
    }
  };

  // Get the modal
var modal = document.getElementById('sp-modal');

// Get the button that opens the modal
var btn = document.getElementById("sp-modal-btn");

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

var display_modal = function(){
  modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
});
