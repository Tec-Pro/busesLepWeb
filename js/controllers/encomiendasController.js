angular.module('app')
.controller('EncomController', ['$scope', 'wsService', function($scope, wsService) {

  var wsdl_url = "https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepcGPS.dll/soap/ILepWebService";
  var urn = "LepWebServiceIntf-ILepWebService";

  $scope.result_ready = false;
  $scope.tracking_code = '';

  $scope.package = [];

  $scope.load_data = function(id){
  	console.log(id);
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
    	console.log(data);
    	$scope.result_ready = true;
    	$scope.package = data;
    })
  }

}]);