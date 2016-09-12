angular.module('app')
.controller('AccDepCtrl', ['$scope', '$location', '$window', '$anchorScroll', 'wsService', 'tripService', function($scope, $location, $window, $anchorScroll, wsService, tripService){
	wsdl_url = "https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepcGPS.dll/soap/ILepWebService";
	urn = "LepWebServiceIntf-ILepWebService";
	method = "PrecargaTarjeta";
	$anchorScroll();
	$scope.card = {
		number: '',
		amount: 0.00
	}

	$scope.go = function ( path ) {
      $location.path( path );
    };

    $scope.bonus = 0;

    var calculate_bonus = function(amount){
    	if (amount >= 0) {
    		if (amount <500) {
    			return ((amount*25)/100)
    		} else if (amount >= 500 && amount < 1000) {
    			return ((amount*35)/100)
    		} else {
    			return ((amount*40)/100)
    		}
    	} 
    }

    $scope.$watch('card.amount', function(){
    	$scope.bonus = calculate_bonus($scope.card.amount);
    });

	$scope.deposit_to_card = function(card, amount){
		if (amount > 0){
			var deposit_params = [
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
			    	value: $scope.card.number
			    },
			    {
			    	name: "Monto",
			    	type: "double",
			    	value: $scope.card.amount
			    },
			    {
			      name: "id_plataforma",
			      type: "int",
			      value: "3"
			    }
			];
			hide_modal();
			display_loading_modal()
			wsService.callService(wsdl_url, urn, method, deposit_params).then(function(msg){
				hide_loading_modal();
				tripService.savePurchaseOrigin(1);
				tripService.saveTripPrice($scope.card.amount);
				tripService.saveSellCode(msg[0].Id_Venta);
				$location.path("/buy");
			}, function(reason){
        if (reason == "timeout"){
          alert("Tiempo de respuesta agotado, verifique su conexión o intente más tarde.");
        } else {
          alert("Error: "+reason+". Por favor, intente más tarde.");
        }
        hide_loading_modal();
      });
		} else {
			alert("Ingrese un monto mayor a cero");
		}
	}

	// Get the modal
	var modal = document.getElementById('myModal');

	var btn = document.getElementById("depositBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks the button, open the modal 
	btn.onclick = function() {
	  if ($scope.card.amount <= 0 || $scope.card.amount != parseInt($scope.card.amount) || isNaN(parseInt($scope.card.amount))) {
			alert("Ingrese una cantidad mayor a 0 para depositar.");
		} else if ($scope.card.number != parseInt($scope.card.number) || isNaN(parseInt($scope.card.number))) {
			alert("Por favor, ingrese un número válido de tarjeta.");
		} else {
	  		modal.style.display = "block";
		}
	}

	var loading_modal = document.getElementById('acc-dep-loading-modal');
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	    modal.style.display = "none";
	}

	var hide_modal = function(){
		modal.style.display = "none";
	}

	var display_loading_modal = function(){
		loading_modal.style.display = "block";
	}

	var hide_loading_modal = function(){
	  loading_modal.style.display = "none";
	}

	var response = document.getElementById('response-modal');

	var id_response = document.getElementById('sale-id');

	var bonus = document.getElementById('sale-bonus');

	var display_response = function(msg){
		response.style.display = "block";
		id_response.innerHTML = "<strong>"+msg[0].Id_Venta+"</strong>";
		bonus.innerHTML = "<strong>$ "+msg[0].Bonificacion+"</strong>";
	}

	$scope.hide_response = function(){
		response.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == response) {
	        response.style.display = "none";
	    } else if (event.target == modal){
	    	modal.style.display = "none";
	    }
	}

}]);