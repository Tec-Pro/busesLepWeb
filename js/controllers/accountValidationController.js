angular.module('app')
.controller('AccValCtrl', ['$scope', '$location', '$routeParams', '$anchorScroll', 'wsService', function($scope, $location, $routeParams, $anchorScroll, wsService){

  var wsdl_url_web = "https://webservices.buseslep.com.ar:443/WebServices/WSLepPaginaWeb.dll/soap/IWSLepPaginaWeb";
	var wsdl_url = "https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepcGPS.dll/soap/ILepWebService";
	urn = "WSLepPaginaWebIntf-IWSLepPaginaWeb";
	method = "ActivarCuentaWeb";


	
	var sanitizer = /\D/;

	if (typeof $routeParams.dni != 'undefined' && typeof $routeParams.cod != 'undefined'){
		if (!sanitizer.test($routeParams.dni) && !sanitizer.test($routeParams.cod)){
			$scope.dni = $routeParams.dni;
			$scope.code = $routeParams.cod;
		} else {
			alert("Codigo o DNI inválidos");
			$location.url($location.path("/"));
		}
	} else {
		$location.url($location.path("/"));
	}

	$scope.validate = function(){
		if (sanitizer.test($scope.dni)){
			alert("El campo DNI solo acepta dígitos.");
		} else if(sanitizer.test($scope.code)){
			alert("El campo código solo acepta dígitos.")
		} else {
			var validate_params = [
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
			wsService.callService(wsdl_url_web, urn, method, validate_params, true).then(function(msg){
				if (msg == -1) {
					alert("Error al activar su cuenta, verifique que los datos sean correctos e intente nuevamente");
				} else if (msg == 1) {
					alert("Activación de su cuenta realizada correctamente");
    			$location.url($location.path("/"));
    		} else {
    			alert("Error de activación, por favor intente nuevamente más tarde");
    		}
    	});
		}
	}


}]);