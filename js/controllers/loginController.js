angular.module('app')
.controller('LoginCtrl', function ($scope, $location, localStorageService, wsService) {

   var wsdl_url = 'https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepCEnc.dll/soap/ILepWebService';
   var urn = 'LepWebServiceIntf-ILepWebService';

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
   };

    $scope.go = function ( path ) {
      $location.path( path );
    };

    $scope.login = function ( ) {
        wsService.callService(wsdl_url, urn, "login", $scope.user.dni.toString(),$scope.user.pass.toString()).then(function(origins){
        if (origins != null && origins[0] != null){ 
          $scope.user.name = origins[0].Nombre;
          $scope.user.lastname = origins[0].Apellido;
          $scope.user.email = origins[0].Email;
          localStorageService.set("user-lep", $scope.user);
          localStorageService.set("rld", "yes");
          location.reload();
        }
        });
        
    };

    $scope.logout = function ( ) {
        $scope.user = {dni: "", pass: "", name: "", lastname: "", email: ""};
        localStorageService.set("user-lep", $scope.user);
    };

    $scope.signin = function ( ) {
        if ($scope.user.pass.localeCompare($scope.user.pass2) == 0){
          wsService.callService(wsdl_url, urn, "RegistrarUsuario", $scope.user.dni.toString(),$scope.user.pass.toString(),$scope.user.name.toString(),$scope.user.lastname.toString(),$scope.user.email.toString()).then(function(origins){
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
          wsService.callService(wsdl_url, urn, "ModificarContraseÃ±a", $scope.user.dni.toString(),oldPass.pass.toString(),$scope.user.pass.toString(),$scope.user.email.toString()).then(function(origins){
            if (origins == 1) {
                localStorageService.set("user-lep", $scope.user);
                $location.path("/");
              } else {
                alert("No se ha podido editar la contraseña");
              }
          }); 
        } else {
          alert('Las contraseñas no coinciden');
        }
    };

    $scope.editProfile = function ( ) {
          wsService.callService(wsdl_url, urn, "EditarPerfilCliente", $scope.user.dni.toString(),$scope.user.name.toString(),$scope.user.lastname.toString(),$scope.user.email.toString()).then(function(origins){
            if (origins != null && origins[0] != null){
              localStorageService.set("user-lep", $scope.user);
              $location.path("/");
            } else {
              alert("No se ha podido editar el perfil");
            }
          }); 
    };

    
    $scope.recoverPass = function ( ) {
        wsService.callService(wsdl_url, urn, "RecuperarContrasena", $scope.user.dni.toString(),$scope.user.email.toString()).then(function(origins){
        console.log(origins);
        if (origins == 1) {
          alert("Se ha enviado a su email la contraseña");
          $location.path("/");
        } else {
          alert("La cuenta no existe o no está activada");
        }
      }); 
    };

});