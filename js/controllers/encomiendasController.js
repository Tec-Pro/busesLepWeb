angular.module('app')
.controller('EncomController', ['$scope', '$anchorScroll', '$routeParams','$route', 'wsService', function($scope, $anchorScroll, $routeParams, $route, wsService) {

	var wsdl_url = "https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepcGPS.dll/soap/ILepWebService";
	var urn = "LepWebServiceIntf-ILepWebService";

	$scope.tab = 1;

	$scope.result_ready = false;
	$scope.tracking_code = '';

	$scope.package = [];

	var load_data = function(id){
	 	var service_parameters = [
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
	      name: "NroGuia",
	      type: "string",
	      value: id
	    }
    ]


    wsService.callService(wsdl_url, urn, "BuscarEncomienda", service_parameters).then(function(data){
    	if(data.length != 0 && data !== "Error no especificado"){
    		$scope.result_ready = true;
    		$scope.package = data;
    	} else {

    	}
    })

    
	}

	$scope.update_route = function (id) {
		console.log(id);
		if (track_param != id){
    	$route.updateParams({packid: id});
    	track_param = id;
    	$scope.tracking_code = id;
    }
	}

	var track_param = $routeParams.packid;
	if (track_param != undefined){
		$scope.tab = 3;
		load_data(track_param);
		$anchorScroll('enc-options'-10);
	} else {
		$anchorScroll();
	}

}]);