angular.module('app')
.controller('AccValCtrl', ['$scope', '$location', '$anchorScroll', 'wsService', function($scope, $location, $anchorScroll, wsService){

  var wsdl_url_web = "https://webservices.buseslep.com.ar:443/WebServices/WSLepPaginaWeb.dll/soap/IWSLepPaginaWeb";
	urn = "";
	method = "ActivarCuentaWeb";

	$scope.dni = '';
	$scope.code = '';

	var sanitizer = /\D/;
	$scope.validate = function(){
		if (sanitizer.test($scope.dni)){
			alert("El campo DNI solo acepta dígitos.");
		} else if(sanitizer.test($scope.code)){
			alert("El campo código solo acepta dígitos.")
		} else {
			var validate_params = [
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
	    		name:"Dni",
	    		type: "int",
	    		value: $scope.dni
	    	},
	    	{
	    		name: "CodRegistracion",
	    		type: "string",
	    		value: $scope.code
	    	}
			];
			wsService.callService(wsdl_url_web, urn, method, validate_params).then(function(msg){
    		$location.path("/");
    	});
		}
	}


}]);