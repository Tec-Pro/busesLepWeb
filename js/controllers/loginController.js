angular.module('app')
.controller('LoginCtrl', function ($scope , $location, localStorageService) {
    
   if(localStorageService.get("user-lep")){
        $scope.user = localStorageService.get("user-lep");
   } else {
        $scope.user = {dni: "", pass: ""};
    };

    $scope.go = function ( path ) {
      $location.path( path );
    };

    $scope.submitForm = function ( ) {
      localStorageService.set("user-lep", $scope.user);
    };

    $scope.logout = function ( ) {
        $scope.user = {dni: "", pass: ""};
        localStorageService.set("user-lep", $scope.user);
    };

    console.log(localStorageService.get("user-lep"));

});