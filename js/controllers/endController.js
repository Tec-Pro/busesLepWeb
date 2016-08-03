angular.module('app')
.controller('EndController', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location) {
    $scope.code = $routeParams.code;

    $scope.go = function ( path ) {
      $location.path( path );
    };


    $scope.$on('$routeChangeStart', function (scope, next, current) {
        //console.log(next.$$route.controller);
        if (next.$$route.controller == "MercadopagoController") {
            // Show here for your model, and do what you need**
            //$("#yourModel").show();
            $location.path('/');	
        }
    });
}]);