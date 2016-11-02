angular["module"]('app')
["controller"]('AccBalCtrl', ['$scope', '$location', '$window', '$filter', '$anchorScroll','wsService', function($scope, $location, $window, $filter, $anchorScroll, wsService){
	wsdl_url = "https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepcGPS.dll/soap/ILepWebService";
	urn = "LepWebServiceIntf-ILepWebService";
	method = "ConsultaSaldoTarjeta";

	$scope["dni"] = '';
	$scope["cards"] = [];
	$scope["sr"] = false;
	$anchorScroll();

	$scope.go = function ( path ) {
      $location["path"]( path );
    };
	
	$scope.get_balance = function(dni){
		if (dni === '' || dni != parseInt(dni)|| isNaN(parseInt(dni))){
			["alert"]("Ingrese un DNI válido");
		} else {
			var get_balance_params = [
		    {
		    	name: "DNI",
		    	type: "string",
		    	value: dni
		    }
			]
			wsService.callService(wsdl_url, urn, method, get_balance_params, true)["then"](function(cards){
				$scope["cards"] = cards;
				$scope["sr"] = true;
			});
		}
	}
}]);
