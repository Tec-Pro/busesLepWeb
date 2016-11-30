angular.module('app')
.controller('LoginCtrl', ['$scope', '$location', '$anchorScroll', 'localStorageService', 'companyService', 'wsService', function ($scope, $location, $anchorScroll, localStorageService, companyService, wsService) {

   var wsdl_url = 'https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepCEnc.dll/soap/ILepWebService';
   var urn = 'LepWebServiceIntf-ILepWebService';

   if(localStorageService.get("user-lep")){

    $scope.user = localStorageService.get("user-lep");
    if ($scope.user.remember == false){
      if (moment().isAfter($scope.user.remember_exp, 'hour')){
        $scope.user = {dni: "", pass: "", name: "", lastname: "", email: "", remember: ""};
      }
    }     
   } else {
        $scope.user = {dni: "", pass: "", name: "", lastname: "", email: "", remember: ""};
  };

  //localStorageService.set("BackTo","/");

  if(localStorageService.get("rld")){
      var y = localStorageService.get("rld");
      if (y == "yes"){
        localStorageService.set("rld", "");
        $location.path(localStorageService.get("BackTo"));
      }
   };

   $scope.BackTo = function( path ){
      localStorageService.set("BackTo", path);
      //alert(localStorageService.get("BackTo"));
   };

   $scope.goContact = function(){
    companyService.setActiveTab(2);
    companyService.setShowContact(true);
    $location.path("/company");
   }
    $scope.go = function ( path ) {
      if(path === '/company'){
        companyService.setActiveTab(0);
        companyService.setShowContact(false);
      }
      $location.search('packid',null);
      $location.path( path );
    };

    $scope.login = function () {
        var parameters = [
          {
            name: "DNI", 
            type: "int", 
            value: $scope.login.dni
          },
          {
            name: "Pass",
            type: "string",
            value: $scope.login.pass
          },
          {
            name: "id_plataforma",
            type: "int",
            value: "3"
          }]
        wsService.callService(wsdl_url,urn,"login", parameters, true).then(function(response){
          if (response != null && response[0] != null && response[0].Email != null){
            $scope.user.dni = $scope.login.dni;
            $scope.user.pass = $scope.login.pass;
            $scope.user.name = response[0].Nombre;
            $scope.user.lastname = response[0].Apellido;
            $scope.user.email = response[0].Email;
            $scope.user.remember = $scope.login.remember;
            if (!$scope.login.remember){
              $scope.user.remember_exp = moment();
            }
            localStorageService.set("user-lep", $scope.user);
            localStorageService.set("rld", "yes");
            location.reload();
          } else if (response == "-1"){
            alert("DNI y/o contraseña incorrectos");
          }
        });
        /*parameters.splice(2,0, {name: "DNI",type: "int",value: $scope.user.dni.toString()},
                               {name: "Pass",type: "string",value: $scope.user.pass}); //meto los parametros
        wsService.callService(wsdl_url, urn, "login", parameters, true).then(function(origins){
          if (origins != null && origins[0] != null && origins[0].Email != null){
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
        parameters.splice(2,2); //saco los parametros*/
    };

    $scope.logout = function ( ) {
        $scope.user = {dni: "", pass: "", name: "", lastname: "", email: "", remember: ""};
        localStorageService.set("user-lep", $scope.user);
        localStorageService.set("BackTo", "/");
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
          wsService.callService(wsdl_url, urn, "RegistrarUsuario", parameters, true).then(function(origins){
            if (origins != null && origins[0] != null){
              localStorageService.set("user-lep", $scope.user);
              localStorageService.set("BackTo", "/account/reserves");
              localStorageService.set("rld", "yes");
              location.reload();
            } else {
              alert("Usted ya tiene una cuenta creada");
            }
          });
          parameters.splice(2,5); //saco los parametros
        } else {
          console.log($scope.user.pass)
          console.log($scope.user.pass2)
          alert('Las contraseñas no coinciden');
        }
    };

    $scope.editPass = function ( ) {
      if ($scope.user.pass.localeCompare($scope.update.pass) == 0){
        var parameters = [
          {
            name: "Dni", 
            type: "int", 
            value: $scope.user.dni
          },
          {
            name: "Email", 
            type: "string", 
            value: $scope.user.email
          },
          {
            name: "Pas",
            type: "string",
            value: $scope.user.pass
          },
          {
            name: "NuevaPass", 
            type: "string", 
            value: $scope.update.new_pass
          },
          {
            name: "id_plataforma",
            type: "int",
            value: "3"
          }]        
      
        if ($scope.update.new_pass.localeCompare($scope.update.confirm_pass) == 0){
          wsService.callService(wsdl_url, urn, "ModificarContraseña", parameters, true).then(function(origins){
            if (origins == 1) {
                $scope.user.pass = $scope.update.new_pass;
                localStorageService.set("user-lep", $scope.user);
                localStorageService.set("BackTo", "/account/update");
                localStorageService.set("rld", "yes");
                location.reload();
              } else {
                alert("No se ha podido editar la contraseña");
              }
          });
        } else {
          alert('Error: La contraseña nueva y la repetida no coinciden');
        }
      } else {
        alert("Error: La contraseña actual ingresada no es correcta");
      }
    };

    $scope.editProfile = function () {
      var parameters = [
          {
            name: "DNI", 
            type: "int", 
            value: $scope.user.dni
          },
          {
            name: "Nombre",
            type: "string",
            value: $scope.user.name
          },
          {
            name: "Apellido",
            type: "string",
            value: $scope.user.lastname
          },
          {
            name: "Email",
            type: "string",
            value: $scope.user.email
          },
          {
            name: "id_plataforma",
            type: "int",
            value: "3"
      }]
          wsService.callService(wsdl_url, urn, "EditarPerfilCliente", parameters, true).then(function(response){
            if (response != null && response[0] != null){
              localStorageService.set("user-lep", $scope.user);
              localStorageService.set("BackTo", "/account/update");
              localStorageService.set("rld", "yes");
              location.reload();
            } else {
              alert("No se ha podido editar el perfil");
            }
          });
    };


    $scope.recoverPass = function ( ) {
        parameters.splice(2,0, {name: "Dni",type: "int",value: $scope.user.dni.toString()},
                              {name: "Email",type: "string",value: $scope.user.email}); //meto los parametros
        wsService.callService(wsdl_url, urn, "RecuperarContrasena", parameters, true).then(function(origins){
        //console.log(origins);
        if (origins == 1) {
          alert("Se ha enviado a su email la contraseña");
          localStorageService.set("BackTo", "/login");
          localStorageService.set("rld", "yes");
          location.reload();
        } else {
          alert("La cuenta no existe o no está activada");
        }
      });
      parameters.splice(2,2); //saco los parametros
    };

}]);
