angular.module('app')
.controller('MainCtrl', function($scope, $location){
    $scope.params = {
        current: new Date(),
        origin: '',
        destination: '',
        departure: new Date(),
        arrival: '',
        amount: ''
    };

    $scope.checked = false;

    $scope.goSearch = function(){
        $location.path('/schedules');
    };
});


