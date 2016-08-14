angular.module('app')
.controller('EndController', ['$scope', '$routeParams', '$anchorScroll', '$location', function($scope, $routeParams, $anchorScroll, $location) {
    $scope.code = $routeParams.code;
    $anchorScroll();
    $scope.go = function ( path ) {
      $location.path(path);
    };


    $scope.$on('$routeChangeStart', function (scope, next, current) {
        //console.log(next.$$route.controller);
        if(next == undefined)
            return;
        if(next.$$route == undefined)
            return;
        if (next.$$route.controller == "MercadopagoController") {
            // Show here for your model, and do what you need**
            //$("#yourModel").show();
            $location.path('/');	
        }
    });
}]);