angular.module('app')
.controller('LoginCtrl', function ($scope , $location, localStorageService,tripService) {
    
   if(localStorageService.get("user-lep")){
        $scope.user = localStorageService.get("user-lep");
   } else {
        $scope.user = {dni: "", pass: "", name: "", lastname: "", email: ""};
    };


     
   if(localStorageService.get("rld")){
      var y = localStorageService.get("rld");
      if (y == "yes"){
        localStorageService.set("rld", "");
        $location.path("/");
      }
   }

    $scope.go = function ( path ) {
      $location.path( path );
    };

    $scope.login = function ( ) {
        tripService.login($scope.user.dni,$scope.user.pass).then(function(origins){
          $scope.user.name = origins[0].Nombre;
          $scope.user.lastname = origins[0].Apellido;
          $scope.user.email = origins[0].Email;
          localStorageService.set("user-lep", $scope.user);
          localStorageService.set("rld", "yes");
          location.reload();
        });
        
    };

    $scope.logout = function ( ) {
        $scope.user = {dni: "", pass: "", name: "", lastname: "", email: ""};
        localStorageService.set("user-lep", $scope.user);
    };

    $scope.signin = function ( ) {
        if ($scope.user.pass.localeCompare($scope.user.pass2) == 0){
          tripService.createUser($scope.user.dni,$scope.user.pass,$scope.user.name,$scope.user.lastname,$scope.user.email).then(function(origins){
            if (origins != null && origins[0] != null){
              localStorageService.set("user-lep", $scope.user);
              localStorageService.set("rld", "yes");
              location.reload();
            } else {
              alert("Usted ya tiene una cuenta creada");
            }
          }); 
        } else {
          alert('Las contraseñas no coinciden');
        }
    };

    $scope.editPass = function ( ) {
        if ($scope.user.pass.localeCompare($scope.user.pass2) == 0){
          var oldPass = localStorageService.get("user-lep");
          tripService.editPass($scope.user.dni,oldPass.pass,$scope.user.pass,$scope.user.email).then(function(origins){
            if (origins == 1) {
                localStorageService.set("user-lep", $scope.user);
                $location.path("/");
              } else {
                alert("No se ha podido editadar la contraseña");
              }
          }); 
        } else {
          alert('Las contraseñas no coinciden');
        }
    };

    $scope.editProfile = function ( ) {
          tripService.editProfile($scope.user.dni,$scope.user.name,$scope.user.lastname,$scope.user.email).then(function(origins){
            if (origins != null && origins[0] != null){
              localStorageService.set("user-lep", $scope.user);
              $location.path("/");
            } else {
              alert("No se ha podido editar el perfil");
            }
          }); 
    };

    
    $scope.recoverPass = function ( ) {
      tripService.recoverPass($scope.user.dni,$scope.user.email).then(function(origins){
        console.log(origins);
        if (origins == 1) {
          alert("Se ha enviado a su email la contraseña");
          $location.path("/");
        } else {
          alert("La cuenta no existe o no esta activada");
        }
      }); 
    };

});