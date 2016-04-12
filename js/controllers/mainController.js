angular.module('app')
.controller('MainCtrl', function($scope, $location,tripService){

    $scope.today = moment();
    $scope.departureDate = moment();
    $scope.arrivalDate = moment();

    $scope.opts = {
        locale: {
            format: "DD/MM/YYYY",
            daysOfWeek: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie','Sab'],
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

        },
        singleDatePicker: true
    };

    $scope.params = {
        current: new Date(),
        origin: '',
        destination: '',
        departure: new Date(),
        arrival: '',
        amount: ''
    };


    tripService.getOrigins();

    //console.log($scope.response);

    $scope.roundTrip = false;

    $scope.goSearch = function(){
        $location.path('/schedules');
        console.log($scope.roundTrip);
        if ($scope.roundTrip === true){
            tripService.setRoundTrip(1);
        } else {
            tripService.setRoundTrip(0);
        }
        console.log(tripService.getRoundTrip());
    };
});


