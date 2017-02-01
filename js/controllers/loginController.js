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
    };

    $scope.logout = function ( ) {
        $scope.user = {dni: "", pass: "", name: "", lastname: "", email: "", remember: ""};
        localStorageService.set("user-lep", $scope.user);
        localStorageService.set("BackTo", "/");
        localStorageService.set("rld", "yes");
        location.reload();
    };

    $scope.signin = function ( ) {
      if ($scope.new_user.pass.localeCompare($scope.new_user.pass2) == 0){
        var parameters = [
          {
            name: "PDNI", 
            type: "int", 
            value: $scope.new_user.dni
          },
          {
            name: "pass",
            type: "string",
            value: $scope.new_user.pass
          },
          { 
            name: "Nombre",
            type: "string",
            value: $scope.new_user.name
          },
          {
            name: "Apellido",
            type: "string",
            value: $scope.new_user.lastname
          },
          {
            name: "Email",
            type: "string",
            value: $scope.new_user.email
          },
          {
            name: "id_plataforma",
            type: "int",
            value: "3"
          }];
          wsService.callService(wsdl_url, urn, "RegistrarUsuario", parameters, true).then(function (response){
            if (response != -1) {
              $scope.user = {dni: $scope.new_user.dni, pass: $scope.new_user.pass, name: $scope.new_user.name, lastname: $scope.new_user.lastname, email: $scope.new_user.email, remember: false, remember_exp: moment()};
              localStorageService.set("user-lep", $scope.user);
              localStorageService.set("BackTo", "/account/reserves");
              localStorageService.set("rld", "yes");
              location.reload();
            } else {
              alert("Usted ya tiene una cuenta creada");
            }
          })
      } else {
          alert('Las contraseñas no coinciden');
      }
        /*if ($scope.user.pass.localeCompare($scope.user.pass2) == 0){
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
          parameters.splice(2,5); //saco los parametros*/
        
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
                alert("Contraseña modificada exitosamente.");
                localStorageService.set("user-lep", $scope.user);
                localStorageService.set("BackTo", "/account/update");
                localStorageService.set("rld", "yes");
                location.reload();
              } else {
                alert("No se ha podido editar la contraseña. ¿Ha actiado su cuenta?");
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
              alaert("Su perfil ha sido modificado exitosamente");
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
      var parameters = [
          {
            name: "Dni", 
            type: "int", 
            value: $scope.recover.dni
          },
          {
            name: "Email",
            type: "string",
            value: $scope.recover.email
          },
          {
            name: "id_plataforma",
            type: "int",
            value: "3"
      }]
        wsService.callService(wsdl_url, urn, "RecuperarContrasena", parameters, true).then(function(origins){
        console.log(origins);
        if (origins == 1) {
          alert("Su contraseña ha sido enviada a "+$scope.recover.email);
          localStorageService.set("BackTo", "/login");
          localStorageService.set("rld", "yes");
          location.reload();
        } else {
          alert("La cuenta no existe o no está activada");
        }
      });
    };

}]);
