angular.module('app')
.controller('LoginCtrl', function ($scope , $location) {
    
    $scope.user = {dni: "", pass: ""};

    $scope.go = function ( path ) {
      $location.path( path );
    };

    $scope.submitForm = function ( ) {
      console.log($scope.user.dni +" ");
    };

});