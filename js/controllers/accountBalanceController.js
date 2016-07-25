angular.module('app')
.controller('AccBalCtrl', function($scope, $location, $window, wsService){
	wsdl_url = "https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepcGPS.dll/wsdl/ILepWebService";
	urn = "LepWebServiceIntf-ILepWebService";

	$scope.lep_card = {
		number: '',
		balance: 0.00
	}

	$scope.beg_card = {
		number: '',
		balance: 0.00
	}

	var get_balance_lep_params = [
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
	    	name: "NroTarjeta",
	    	type: "string",
	    	value: $scope.lep_card.number
	    },
	    {
	      name: "id_plataforma",
	      type: "int",
	      value: "3"
	    }
	]

	var get_balance_beg_params = [
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
	    	name: "NroTarjeta",
	    	type: "string",
	    	value: $scope.beg_card.number
	    },
	    {
	      name: "id_plataforma",
	      type: "int",
	      value: "3"
	    }
	]

	
	$scope.get_balance = function(card){
		if (card === 'beg'){
			wsService.callService();
		} else if (card === 'lep'){
			wsService.callService();
		} else {
			console.log("Invalid card");
		}
	}
});