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
	document.querySelector('#amount').value = 200;
	$scope.totalAmount = document.querySelector('#amount').value;
   	$scope.showSecurityCodeInput = true;
   	$scope.onlyNumbers = /^\d+$/;
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
		var cardSelector = document.querySelector("#cardId");
	    if (cardSelector && cardSelector[cardSelector.options.selectedIndex].value != "-1") {
	        return cardSelector[cardSelector.options.selectedIndex].getAttribute('first_six_digits');
	    }
	    var ccNumber = document.querySelector('input[data-checkout="cardNumber"]');
	    return ccNumber.value.replace(/[ .-]/g, '').slice(0, 6);
	};

	function clearOptions() {
	    var bin = getBin();
	    if (bin.length == 0) {
	        document.querySelector("#issuer").style.display = 'none';
	        document.querySelector("#issuer").innerHTML = "";

	        var selectorInstallments = document.querySelector("#installments"),
	            fragment = document.createDocumentFragment(),
	            option = new Option("Choose...", '-1');

	        selectorInstallments.options.length = 0;
	        fragment.appendChild(option);
	        selectorInstallments.appendChild(fragment);
	        selectorInstallments.setAttribute('disabled', 'disabled');
	    }
	}

	function guessingPaymentMethod(event) {
	    var bin = getBin();
	    amount = document.querySelector('#amount').value;
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

	         // check if the security code (ex: Tarshop) is required
	        var cardConfiguration = response[0].settings,
	            bin = getBin(),
	            amount = document.querySelector('#amount').value;

	        for (var index = 0; index < cardConfiguration.length; index++) {
	            if (bin.match(cardConfiguration[index].bin.pattern) != null && cardConfiguration[index].security_code.length == 0) {
	                /*
	                * In this case you do not need the Security code. You can hide the input.
	                */
	                $scope.showSecurityCodeInput = false;
	            } else {
	            	$scope.showSecurityCodeInput = true;
	                /*
	                * In this case you NEED the Security code. You MUST show the input.
	                */
	            }
	        }

	        Mercadopago.getInstallments({
	            "bin": bin,
	            "amount": amount
	        }, setInstallmentInfo);

	        // check if the issuer is necessary to pay
	        var issuerMandatory = false,
	            additionalInfo = response[0].additional_info_needed;

	        for (var i = 0; i < additionalInfo.length; i++) {
	            if (additionalInfo[i] == "issuer_id") {
	                issuerMandatory = true;
	            }
	        };
	        if (issuerMandatory) {
	            Mercadopago.getIssuers(response[0].id, showCardIssuers);

	            addEvent(document.querySelector('#issuer'), 'change', setInstallmentsByIssuerId);
	            
	        } else {
	        	
	            document.querySelector("#issuer").style.display = 'none';
	            document.querySelector("#issuer").options.length = 0;     
	        }
		}
	};

	function showCardIssuers(status, issuers) {
	    var issuersSelector = document.querySelector("#issuer"),
	        fragment = document.createDocumentFragment();

	    issuersSelector.options.length = 0;
	    var option = new Option("Choose...", '-1');
	    fragment.appendChild(option);
	    for (var i = 0; i < issuers.length; i++) {
	        if (issuers[i].name != "default") {
	            option = new Option(issuers[i].name, issuers[i].id);
	        } else {
	            option = new Option("Otro", issuers[i].id);
	        }
	        fragment.appendChild(option);
	    }
	    issuersSelector.appendChild(fragment);
	    issuersSelector.removeAttribute('disabled');
	    document.querySelector("#issuer").removeAttribute('style');
	};

	function setInstallmentsByIssuerId(status, response) {
	    var issuerId = document.querySelector('#issuer').value,
	        amount = document.querySelector('#amount').value;
	        
	    if (issuerId === '-1') {
	        return;
	    }
	    
	    Mercadopago.getInstallments({
	        "bin": getBin(),
	        "amount": amount,
	        "issuer_id": issuerId
	    }, setInstallmentInfo);
	};

	function setInstallmentInfo(status, response) {
	    var selectorInstallments = document.querySelector("#installments"),
	        fragment = document.createDocumentFragment();

	    selectorInstallments.options.length = 0;

	    if (response.length > 0) {
	        var option = new Option("Choose...", '-1'),
	            payerCosts = response[0].payer_costs;

	        fragment.appendChild(option);
	        for (var i = 0; i < payerCosts.length; i++) {
	            option = new Option(payerCosts[i].recommended_message || payerCosts[i].installments, payerCosts[i].installments);
	            fragment.appendChild(option);
	        }
	        selectorInstallments.appendChild(fragment);
	        selectorInstallments.removeAttribute('disabled');
	    }
	};

	function cardsHandler() {
	    clearOptions();
	    var cardSelector = document.querySelector("#cardId"),
	        amount = document.querySelector('#amount').value;
	    if (cardSelector && cardSelector[cardSelector.options.selectedIndex].value != "-1") {
	        var _bin = cardSelector[cardSelector.options.selectedIndex].getAttribute("first_six_digits");
	        Mercadopago.getPaymentMethod({
	            "bin": _bin
	        }, setPaymentMethodInfo);
	    }
	}

	addEvent(document.querySelector('input[data-checkout="cardNumber"]'), 'keyup', guessingPaymentMethod);
	addEvent(document.querySelector('input[data-checkout="cardNumber"]'), 'keyup', clearOptions);
	addEvent(document.querySelector('input[data-checkout="cardNumber"]'), 'change', guessingPaymentMethod);

	cardsHandler();

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
	        doSubmit=true;
	        form.submit();
	        //$http.post("http://localhost:8081/api/mercadopago").success(function(response){ //llama a nuestra api para efectuar el pago
			//	console.log(response);
			//});
	    }
	};

	function validate(evt) {
	  var theEvent = evt || window.event;
	  var key = theEvent.keyCode || theEvent.which;
	  key = String.fromCharCode( key );
	  var regex = /[0-9]|\./;
	  if( !regex.test(key) ) {
	    theEvent.returnValue = false;
	    if(theEvent.preventDefault) theEvent.preventDefault();
	  }
	}
	
});