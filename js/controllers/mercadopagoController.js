angular.module('app')
.controller('MercadopagoController', function($scope,$http, wsService){	

	Mercadopago.setPublishableKey("TEST-3f73d16a-9f11-40ee-8671-58a09ac0aa69");
	
	$http.get("http://localhost:8081/api/mercadopago").success(function(response){ //llama a la api nuestra y ahi se obtiene el access token
		//obj = JSON.parse(response)
		console.log(response.accessToken);
    	url = "https://api.mercadopago.com/v1/payment_methods/?access_token=" + response.accessToken;
    	$http.get(url).success(function(response2){ // llama  a la api de mercadopago para obtener mdeios de pago
    		$scope.paymentMethods = response2;
   		 });
    });
	
	
   	
	Mercadopago.getIdentificationTypes(); // obtengo los tipos de documentos y se ponen solos en el select del html!

	Mercadopago.getInstallments({
			"payment_method_id":"master",
			"amount": 100
		}, function (status, response){
			//console.log(response);
	});

	doSubmit = false;
	//addEvent(document.querySelector('#pay'),'submit',doPay);
	$scope.doPay = function(){
		console.log("jolllo");
	   // event.preventDefault();
	    if(!doSubmit){

	        var $form = document.querySelector('#pay');
	        
	        Mercadopago.createToken($form, sdkResponseHandler); // The function "sdkResponseHandler" is defined below

	        return false;
	    }
	}

	function sdkResponseHandler(status, response3) {
	    if (status != 200 && status != 201) {
	    	console.log(response3);
	        alert("verify filled data");
	    }else{
	       console.log(response3);
	       /* var form = document.querySelector('#pay');

	        var card = document.createElement('input');
	        card.setAttribute('name',"token");
	        card.setAttribute('type',"hidden");
	        card.setAttribute('value',response.id);
	        form.appendChild(card);
	        doSubmit=true;
	        form.submit();*/
	    }
	};
	
});