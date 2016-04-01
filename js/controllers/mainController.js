angular.module('app')
.controller('MainCtrl', function($scope, $location,tripService){
    $scope.params = {
        current: new Date(),
        origin: '',
        destination: '',
        departure: new Date(),
        arrival: '',
        amount: ''
    };

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


