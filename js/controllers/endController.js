angular.module('app')
.controller('EndController', function($scope, $routeParams, $location) {
    $scope.code = $routeParams.code;

     $scope.go = function ( path ) {
      $location.path( path );
    };
});