angular.module('app')
.controller('TestCtrl', function($scope,$http, wsService){

	$scope.wsdl_url = 'https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepCEnc.dll/soap/ILepWebService';
	$scope.urn = 'LepWebServiceIntf-ILepWebService';
	$scope.method = 'LocalidadesDesde';
	$scope.parameters = [
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


 	wsService.callService($scope.wsdl_url, $scope.urn, $scope.method, $scope.parameters).then(function(origins){
 		$scope.result = origins;
 	});
});