angular.module('app')
.controller('MercadopagoController', function($scope,$http, wsService){	

	Mercadopago.setPublishableKey("TEST-c550b59e-e455-472a-a24e-e7a2f3ca07d3");
	
	/*$http.get("http://localhost:8081/api/mercadopago").success(function(response){ //llama a la api nuestra y ahi se obtiene el access token
		//obj = JSON.parse(response)
		console.log(response.accessToken);
    	url = "https://api.mercadopago.com/v1/payment_methods/?access_token=" + response.accessToken;
    	$http.get(url).success(function(response2){ // llama  a la api de mercadopago para obtener mdeios de pago
    		$scope.paymentMethods = response2;
   		 });
    });*/
	

   	
	Mercadopago.getIdentificationTypes(); // obtengo los tipos de documentos y se ponen solos en el select del html!

	/*Mercadopago.getInstallments({
			"payment_method_id":"master",
			"amount": 100
		}, function (status, response){
			//console.log(response);
	});*/

	function addEvent(el, eventName, handler){
	    if (el.addEventListener) {
	           el.addEventListener(eventName, handler);
	    } else {
	        el.attachEvent('on' + eventName, function(){
	          handler.call(el);
	        });
	    }
	};

	function getBin() {
	    var ccNumber = document.querySelector('input[data-checkout="cardNumber"]');
	    return ccNumber.value.replace(/[ .-]/g, '').slice(0, 6);
	};

	function guessingPaymentMethod(event) {
	    var bin = getBin();
	    if (event.type == "keyup") {
	        if (bin.length >= 6) {
	            Mercadopago.getPaymentMethod({
	                "bin": bin
	            }, setPaymentMethodInfo);
	        }
	    } else {
	        setTimeout(function() {
	            if (bin.length >= 6) {
	                Mercadopago.getPaymentMethod({
	                    "bin": bin
	                }, setPaymentMethodInfo);
	            }
	        }, 100);
	    }
	};

	function setPaymentMethodInfo(status, response) {
	    if (status == 200) {
	        // do somethings ex: show logo of the payment method
	        var form = document.querySelector('#pay');

	        if (document.querySelector("input[name=paymentMethodId]") == null) {
	            var paymentMethod = document.createElement('input');
	            paymentMethod.setAttribute('name', "paymentMethodId");
	            paymentMethod.setAttribute('type', "hidden");
	            paymentMethod.setAttribute('value', response[0].id);

	            form.appendChild(paymentMethod);
	        } else {
	            document.querySelector("input[name=paymentMethodId]").value = response[0].id;
	        }
	    }
	};

	addEvent(document.querySelector('input[data-checkout="cardNumber"]'), 'keyup', guessingPaymentMethod);
	addEvent(document.querySelector('input[data-checkout="cardNumber"]'), 'change', guessingPaymentMethod);

	doSubmit = false;
	addEvent(document.querySelector('#pay'),'submit',doPay);
	function doPay(event){
	    event.preventDefault();
	    if(!doSubmit){
	        var $form = document.querySelector('#pay');
	        Mercadopago.createToken($form, sdkResponseHandler); // The function "sdkResponseHandler" is defined below
	        return false;
	    }
	};

	function sdkResponseHandler(status, response) {
	    if (status != 200 && status != 201) {
	    	console.log(response);
	        alert("verify filled data");
	    }else{
	       //alert("all good" + response.id);
	        var form = document.querySelector('#pay');
	        var card = document.createElement('input');
	        card.setAttribute('name',"token");
	        card.setAttribute('type',"hidden");
	        card.setAttribute('value',response.id);
	        form.appendChild(card);
	        console.log(card);
	        doSubmit=true;
	        form.submit();
	        //$http.post("http://localhost:8081/api/mercadopago").success(function(response){ //llama a nuestra api para efectuar el pago
			//	console.log(response);
			//});
	    }
	};

	
	
});