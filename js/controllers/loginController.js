angular.module('app')
.controller('LoginCtrl', function ($scope , $location, localStorageService) {
    
   if(localStorageService.get("user-lep")){
        $scope.user = localStorageService.get("user-lep");
   } else {
        $scope.user = {dni: "", pass: "", name: "", lastname: "", email: ""};
    };

    $scope.go = function ( path ) {
      $location.path( path );
    };

    $scope.login = function ( ) {
      localStorageService.set("user-lep", $scope.user);
      $location.path("/");
    };

    $scope.logout = function ( ) {
        $scope.user = {dni: "", pass: "", name: "", lastname: "", email: ""};
        localStorageService.set("user-lep", $scope.user);
    };

    $scope.signin = function ( ) {
        if ($scope.user.pass.localeCompare($scope.user.pass2) == 0){
          localStorageService.set("user-lep", $scope.user);
          $location.path("/");
        } else {
          alert('Las contraseñas no coinciden');
        }
    };

    $scope.editPass = function ( ) {
        if ($scope.user.pass.localeCompare($scope.user.pass2) == 0){
          localStorageService.set("user-lep", $scope.user);
          $location.path("/");
        } else {
          alert('Las contraseñas no coinciden');
        }
    };

    $scope.editProfile = function ( ) {
          localStorageService.set("user-lep", $scope.user);
          $location.path("/");
    };

    
    $scope.recoverPass = function ( ) {
          $location.path("/");
    };

});