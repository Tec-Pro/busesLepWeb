angular.module('app')
.controller('LoginCtrl', function ($scope, $location, localStorageService, wsService) {

   var wsdl_url = 'https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepCEnc.dll/soap/ILepWebService';
   var urn = 'LepWebServiceIntf-ILepWebService';
   var parameters = [
    {
      name: "userWS",
      type: "string",
      value: "UsuarioLep"
    },
    {
      name: "passWS",
      type: "string",
      value: "Lep1234"
    },
    {
      name: "id_plataforma",
      type: "int",
      value: "3"
    }]


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
        parameters.splice(2,0, {name: "DNI",type: "int",value: $scope.user.dni.toString()},
                               {name: "Pass",type: "string",value: $scope.user.pass}); //meto los parametros
        wsService.callService(wsdl_url, urn, "login", parameters).then(function(origins){
          if (origins != null && origins[0] != null){ 
            $scope.user.name = origins[0].Nombre;
            $scope.user.lastname = origins[0].Apellido;
            $scope.user.email = origins[0].Email;
            localStorageService.set("user-lep", $scope.user);
            localStorageService.set("rld", "yes");
            location.reload();
          } else {
                alert("DNI y/o contraseña incorrectos");
          }
        });
        parameters.splice(2,2); //saco los parametros
    };

    $scope.logout = function ( ) {
        $scope.user = {dni: "", pass: "", name: "", lastname: "", email: ""};
        localStorageService.set("user-lep", $scope.user);
        localStorageService.set("rld", "yes");
        location.reload();
    };

    $scope.signin = function ( ) {
        if ($scope.user.pass.localeCompare($scope.user.pass2) == 0){
          parameters.splice(2,0, {name: "PDni",type: "int",value: $scope.user.dni.toString()}, 
                                 {name: "pass",type: "string",value: $scope.user.pass},
                                 {name: "Nombre",type: "string",value: $scope.user.name},
                                 {name: "Apellido",type: "string",value: $scope.user.lastname},
                                 {name: "Email",type: "string",value: $scope.user.email}); //meto los parametros
          wsService.callService(wsdl_url, urn, "RegistrarUsuario", parameters).then(function(origins){
            if (origins != null && origins[0] != null){
              localStorageService.set("user-lep", $scope.user);
              localStorageService.set("rld", "yes");
              location.reload();
            } else {
              alert("Usted ya tiene una cuenta creada");
            }
          });
          parameters.splice(2,5); //saco los parametros
        } else {
          alert('Las contraseñas no coinciden');
        }
    };

    $scope.editPass = function ( ) {
        if ($scope.user.pass.localeCompare($scope.user.pass2) == 0){
          var oldPass = localStorageService.get("user-lep").pass;
          parameters.splice(2,0, {name: "Dni",type: "int",value: $scope.user.dni.toString()},
                                 {name: "Email",type: "string",value: $scope.user.email},
                                 {name: "pas",type: "string",value: oldPass},
                                 {name: "NuevaPass",type: "string",value: $scope.user.pass}
                                 ); //meto los parametros
          wsService.callService(wsdl_url, urn, "ModificarContraseÃ±a", parameters).then(function(origins){
            if (origins == 1) {
                localStorageService.set("user-lep", $scope.user);
                $location.path("/");
              } else {
                alert("No se ha podido editar la contraseña");
              }
          });
          parameters.splice(2,4); //saco los parametros 
        } else {
          alert('Las contraseñas no coinciden');
        }
    };

    $scope.editProfile = function ( ) {
          parameters.splice(2,0, {name: "DNI",type: "int",value: $scope.user.dni.toString()}, 
                                 {name: "Nombre",type: "string",value: $scope.user.name},
                                 {name: "Apellido",type: "string",value: $scope.user.lastname},
                                 {name: "Email",type: "string",value: $scope.user.email}); //meto los parametros
          wsService.callService(wsdl_url, urn, "EditarPerfilCliente", parameters).then(function(origins){
            if (origins != null && origins[0] != null){
              localStorageService.set("user-lep", $scope.user);
              $location.path("/");
            } else {
              alert("No se ha podido editar el perfil");
            }
          });
          parameters.splice(2,4); //saco los parametros
    };

    
    $scope.recoverPass = function ( ) {
        parameters.splice(2,0, {name: "Dni",type: "int",value: $scope.user.dni.toString()}, 
                              {name: "Email",type: "string",value: $scope.user.email}); //meto los parametros
        wsService.callService(wsdl_url, urn, "RecuperarContrasena", parameters).then(function(origins){
        console.log(origins);
        if (origins == 1) {
          alert("Se ha enviado a su email la contraseña");
          $location.path("/");
        } else {
          alert("La cuenta no existe o no está activada");
        }
      });
      parameters.splice(2,2); //saco los parametros 
    };

});