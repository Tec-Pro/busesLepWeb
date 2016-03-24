angular.module('app')
    .controller('MainCtrl', function($scope){
        $scope.search = {
            origin: '',
            destination: '',
            departure: new Date(),
            arrival: '',
            amount: ''
        };

        $scope.checked = false;

    });
