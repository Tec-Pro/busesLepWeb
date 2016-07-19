angular.module('app')
.controller('MercadopagoController', function($scope,$http, wsService, localStorageService, tripService){	

	var wsdl_url = "https://webservices.buseslep.com.ar:443/WebServices/WSCobroMercadoPagocTestyEnc.dll/soap/IWSCobroMercadoPago";
	var urn = "WSCobroMercadoPagoIntf-IWSCobroMercadoPago";
	wsMethod = "RealizarCobroMercadoPago";
	Mercadopago.setPublishableKey("TEST-2e5d7d95-7cb8-48d3-8bd6-cfde1bc34254"); //APP_USR-3f8dc194-8894-4d07-bb6c-b4a786a19c6c
	$scope.paymentMethods = [];
	$http.get("https://api.mercadolibre.com/sites/MLA/payment_methods").success(function(response){ //llama a la api nuestra y ahi se obtiene los medios de pago
		//obj = JSON.parse(response)		
		payments = response;
		if (payments.length > 0) {
			for (var i = 0; i < payments.length; i++) {
				if(payments[i].payment_type_id == 'credit_card'){
					$scope.paymentMethods.push({id:payments[i].id,name:payments[i].name});
				}
			}; 		
    	}
    });

	document.querySelector('#amount').value = tripService.getTripPrice();
	$scope.selectedPayment = null;
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


	$scope.paymentMethodSelected = function(){
    	//console.log($scope.selectedPayment);
    	amount = document.querySelector('#amount').value;
    	Mercadopago.getPaymentMethod({"payment_method_id": $scope.selectedPayment}, setPaymentMethodInfo);
 	 }
	/*function guessingPaymentMethod(event) {
		
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
	};*/

	function setPaymentMethodInfo(status, response) {
		
	    if (status == 200) {
	        // do somethings ex: show logo of the payment method
	        var form = document.querySelector('#pay');

	        if (document.querySelector("input[name=paymentMethodId]") == null) {
	            var paymentMethod = document.createElement('input');
	            paymentMethod.setAttribute('name', "paymentMethodId");
	            paymentMethod.setAttribute('type', "hidden");
	            paymentMethod.setAttribute('value', response[0].id);
	            //console.log(response[0].id);
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
	            "payment_method_id": response[0].id,
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
	    	  var selectorInstallments = document.querySelector("#installments"),
	            fragment = document.createDocumentFragment(),
	            option = new Option("Choose...", '-1');

	        selectorInstallments.options.length = 0;
	        fragment.appendChild(option);
	        selectorInstallments.appendChild(fragment);
	        selectorInstallments.setAttribute('disabled', 'disabled');
	        return;
	    }
	    
	    Mercadopago.getInstallments({
	        "payment_method_id": $scope.selectedPayment,
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

	addEvent(document.querySelector('input[data-checkout="cardNumber"]'), 'keyup', $scope.paymentMethodSelected);
	addEvent(document.querySelector('input[data-checkout="cardNumber"]'), 'keyup', clearOptions);
	addEvent(document.querySelector('input[data-checkout="cardNumber"]'), 'change', $scope.paymentMethodSelected);

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
	    	//console.log(response);
	        alert("Numero de tarjeta o codigo de seguridad incorrectos");
	    }else{
	       //alert("all good" + response.id);
	       //console.log(response);
	        var form = document.querySelector('#pay');
	        var card = document.createElement('input');
	        card.setAttribute('name',"token");
	        card.setAttribute('type',"hidden");
	        card.setAttribute('value',response.id);
	        form.appendChild(card);
	        idventa = "354";
	        //var form = new FormData(document.getElementById("form"));
			//var inputValue = form.get("inputTypeName");
			cuotas = document.querySelector('#installments').value
			
	        var datosCompra = {descriptions:"boletos", 
	        				external_reference: "boleto:"+idventa,
	        				installments: cuotas,
	        				payer:{email: "test_user_19653727@testuser.com"},
	        				payment_method_id: $scope.selectedPayment,
	        				token: response.id,
	        				transaction_amount: $scope.totalAmount
	        				}
	       // console.log(JSON.stringify(datosCompra));
	        wsParameters = [
				{
					name: "UserCobro",
					type: "string",
					value: "54GFDG2224785486DG"
				},
				{
					name: "PassCobro",
					type: "string",
					value: "15eQiDeCtCaDmS2506"
				},
				{
					name: "DatosCompra",
					type: "string",
					value: JSON.stringify(datosCompra)
				},
				{
					name: "id_plataforma",
					type: "int",
					value: "3"
				}]
	        wsService.callService(wsdl_url, urn, wsMethod, wsParameters).then(function(response){
	        	console.log(response);
	        });
	        doSubmit=true;
	        //form.submit();
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