angular.module('app')
.controller('MainCtrl', function($scope){
    $scope.params = {
        origin: '',
        destination: '',
        departure: new Date(),
        arrival: '',
        amount: ''
    };

    $scope.checked = false;

    $scope.search = function(){
        $scope.checked = !$scope.checked;
    };


});


    $(function () {
        $('#datetimepicker1').datepicker();
    });


