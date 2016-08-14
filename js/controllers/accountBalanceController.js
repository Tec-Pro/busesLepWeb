angular.module('app')
.controller('AccBalCtrl', ['$scope', '$location', '$window', '$filter', '$anchorScroll','wsService', function($scope, $location, $window, $filter, $anchorScroll, wsService){
	wsdl_url = "https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepcGPS.dll/soap/ILepWebService";
	urn = "LepWebServiceIntf-ILepWebService";
	method = "ConsultaSaldoTarjeta";

	$scope.dni = '';
	$scope.cards = [];
	$scope.show_response = false;
	$anchorScroll();

	$scope.go = function ( path ) {
      $location.path( path );
    };
	
	$scope.get_balance = function(dni){
		if (dni === '' || dni != parseInt(dni)|| isNaN(parseInt(dni))){
			alert("Ingrese un DNI válido");
		} else {
			var get_balance_params = [
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
			    	name: "DNI",
			    	type: "string",
			    	value: dni
			    }
			]
			wsService.callService(wsdl_url,urn,method,get_balance_params).then(function(cards){
				$scope.cards = cards;
				$scope.show_response = true;
				// $scope.cards = [
				// {
				// 	Nro_Tarjeta: 1,
				// 	Saldo: 100.00,
				// 	LinkFoto: "img/Mi cuenta/Abono BEG.png"
				// },{
				// 	Nro_Tarjeta: 2,
				// 	Saldo: 200.00,
				// 		Observacion: "En proceso",
				// 		FechaHoraUltimaActualizacion: "12/05/16 18:09",
				// 	LinkFoto: "img/Mi cuenta/Abono Gral.png"
				// }];
			});
		}
	}
}]);
