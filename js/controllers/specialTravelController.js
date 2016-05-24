angular.module('app')
.controller('SpecialTravelCtrl', function($scope, $location){

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
    };


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
    });
});