angular.module('app')
.controller('MercadopagoController', ['$scope', '$location', 'wsService', 'localStorageService', 'tripService', function($scope, $location, wsService, localStorageService, tripService) {

	var wsdl_url ="https://webservices.buseslep.com.ar:443/WebServices/WSCobroMercadoPago.dll/soap/IWSCobroMercadoPago";  //"https://webservices.buseslep.com.ar:443/WebServices/WSCobroMercadoPagocTestyEnc.dll/soap/IWSCobroMercadoPago";
	var urn = "";
	wsMethod = "RealizarCobroMercadoPago";
  //TEST-2d04b147-a22d-404e-8be3-670a81e57a03 APP_USR-3f8dc194-8894-4d07-bb6c-b4a786a19c6c
	Mercadopago.setPublishableKey("TEST-2d04b147-a22d-404e-8be3-670a81e57a03");
	Mercadopago.getIdentificationTypes();

	var price = tripService.getTripPrice();
	if (price == undefined){
		$location.path("/");
	}
	var sell_code = tripService.getSellCode();
	if (sell_code == undefined){
		$location.path("/");
	}
	var user_email = localStorageService.get("user-lep").email;
	if (user_email == undefined){
		$location.path("/");
	}

	var error_modal = document.getElementById('error-modal');
	var load_modal = document.getElementById('load-modal');

   var display_load_modal = function(){
    load_modal.style.display = "block";
  }

  var hide_load_modal = function(){
    load_modal.style.display = "none";
  }

  $scope.goBack = function(){
  	window.history.back();
  }

  $scope.hide_modal = function(){
    error_modal.style.display = "none";
    location.reload();
  }

	document.querySelector("#amount").value= price;

	document.querySelector("#amountLabel").innerHTML = "$"+price;

	function addEvent(el, eventName, handler){
    if (el.addEventListener) {
           el.addEventListener(eventName, handler);
    } else {
        el.attachEvent('on' + eventName, function(){
          handler.call(el);
        });
    }
	};

	var minLength = 0;
	function getBin() {
	    var cardSelector = document.querySelector("#cardId");
	    if (cardSelector && cardSelector[cardSelector.options.selectedIndex].value != "-1") {
	        return cardSelector[cardSelector.options.selectedIndex].getAttribute('first_six_digits');
	    }
	    var ccNumber = document.querySelector('input[data-checkout="cardNumber"]');
	    return ccNumber.value.replace(/[ .-]/g, '').slice(0, 6);
	}

	function clearOptions() {
	    var bin = getBin();
	    if (bin.length < 6) {
	    		document.querySelector('p[id=securityCodeInfo]').innerHTML = "";
	        document.querySelector("#issuer").style.visibility = 'hidden';
	        document.querySelector("#issuer").innerHTML = "";
	        document.querySelector("#issuerLabel").style.visibility="hidden";

	        var selectorInstallments = document.querySelector("#installments"),
	            fragment = document.createDocumentFragment(),
	            option = new Option("Elija sus cuotas", '-1');

	        selectorInstallments.options.length = 0;
	        fragment.appendChild(option);
	        selectorInstallments.appendChild(fragment);
	        selectorInstallments.setAttribute('disabled', 'disabled');
	        minLength = 0;
	    }
	}

	function guessingPaymentMethod(event) {
	    var bin = getBin(),
	        amount = document.querySelector('#amount').value;
	    if (event.type == "keyup") {
	        if (bin.length == 6) {
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
	    		console.log(response);
	        // do somethings ex: show logo of the payment method
	        var form = document.querySelector('#pay');
	        if (document.querySelector("input[name=paymentMethodId]") == null) {
	            var paymentMethod = document.createElement('input');
	            paymentMethod.setAttribute('name', "paymentMethodId");
	            paymentMethod.setAttribute('type', "hidden");
            	paymentMethod.setAttribute('value', response[response.length-1].id);
	            form.appendChild(paymentMethod);
	        } else {
       			document.querySelector("input[name=paymentMethodId]").value = response[response.length-1].id;
	        }

	        document.querySelector('#paymentMethodInfo').removeAttribute('style');
	        document.querySelector('p[id=paymentMethodName]').innerHTML = response[response.length-1].name;
	        document.querySelector('img[id=paymentMethodImg]').src = response[response.length-1].secure_thumbnail;


	        // check if the security code (ex: Tarshop) is required
	        var cardConfiguration = response[response.length-1].settings,
	            bin = getBin(),
	            amount = document.querySelector('#amount').value;

	        minLength = cardConfiguration[cardConfiguration.length-1].card_number.length;

	        for (var index = 0; index < cardConfiguration.length; index++) {
	            if (bin.match(cardConfiguration[index].bin.pattern) != null && cardConfiguration[index].security_code.length == 0) {
	                /*
	                * In this case you do not need the Security code. You can hide the input.
	                */
	            } else {
	            	document.querySelector('p[id=securityCodeInfo]').innerHTML = "Ingresa los "+cardConfiguration[0].security_code.length +" dígitos ";
	              if (cardConfiguration[index].security_code.card_location == "back") {
		            	document.querySelector('p[id=securityCodeInfo]').innerHTML = document.querySelector('p[id=securityCodeInfo]').innerHTML + "ubicados en el dorso.";	              	
	              } else if (cardConfiguration[index].security_code.card_location == "front") {
	              	document.querySelector('p[id=securityCodeInfo]').innerHTML = document.querySelector('p[id=securityCodeInfo]').innerHTML + "ubicados en el frente.";
	              } 
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
	            additionalInfo = response[response.length-1].additional_info_needed;

	        for (var i = 0; i < additionalInfo.length; i++) {
	            if (additionalInfo[i] == "issuer_id") {
	                issuerMandatory = true;
	            }
	        };
	        if (issuerMandatory) {
	            Mercadopago.getIssuers(response[response.length-1].id, showCardIssuers);
	            addEvent(document.querySelector('#issuer'), 'change', setInstallmentsByIssuerId);
	        } else {
	            document.querySelector("#issuer").style.visibility = 'hidden';
	            document.querySelector("#issuer").options.length = 0;
	            document.querySelector("#issuerLabel").style.visibility = 'hidden';
	        }
	    }
	};

	function showCardIssuers(status, issuers) {
	    var issuersSelector = document.querySelector("#issuer"),
	        fragment = document.createDocumentFragment();

	    issuersSelector.options.length = 0;
	    var option = new Option("Elija su banco", '-1');
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
	    document.querySelector("#issuerLabel").removeAttribute('style');
	};

	function setInstallmentsByIssuerId(status, response) {

	    var issuerId = document.querySelector('#issuer').value,
	        amount = document.querySelector('#amount').value
	        payment_method_id = document.querySelector("input[name=paymentMethodId]").value;

	    if (issuerId === '-1') {
	        return;
	    }

	    Mercadopago.getInstallments({
	        "bin": getBin(),
	        "payment_method_id": payment_method_id,
	        "amount": amount,
	        "issuer_id": issuerId
	    }, setInstallmentInfo);
	};

	function setInstallmentInfo(status, response) {
	    var selectorInstallments = document.querySelector("#installments"),
	        fragment = document.createDocumentFragment();

	    selectorInstallments.options.length = 0;

	    if (response.length > 0) {
	        var option = new Option("Elija sus cuotas", '-1'),
	            payerCosts = response[response.length-1].payer_costs;

	        fragment.appendChild(option);
	        for (var i = 0; i < payerCosts.length; i++) {
	        		console.log(payerCosts[i]);
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
      alert("Verifique los datos ingresados.");
    }else{
       
        var form = document.querySelector('#pay');

        var card = document.createElement('input');
        card.setAttribute('name',"token");
        card.setAttribute('type',"hidden");
        card.setAttribute('value',response.id);
        form.appendChild(card);
        var payment_method_id = document.querySelector("input[name=paymentMethodId]").value;
        var installments = form.installments.value;

        if (tripService.getPurchaseOrigin() == "0") {
	      	var datosCompra = {
	      		description:"boletos",
						external_reference: "boleto:"+sell_code,
						installments: parseInt(installments),
						payer:{email: user_email},//"test_user_64183349@testuser.com"},//user_email},
						payment_method_id: payment_method_id,
						token: response.id,
						transaction_amount: parseInt(price)
      		}
      	} else if (tripService.getPurchaseOrigin() == "1") {
      	var datosCompra = {description:"precarga tarjeta",
					external_reference: "recarga:"+idventa,
					installments: parseInt(installments),
					payer:{email: user_email},//"test_user_19653727@testuser.com"},//user_email},
					payment_method_id: payment_method_id,
					token: response.id,
					transaction_amount: parseInt(price)
		  	}
      }
      console.log(datosCompra);
      console.log(JSON.stringify(datosCompra));
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
			display_load_modal();
     	wsService.callService(wsdl_url, urn, wsMethod, wsParameters).then(function(response){
	     		console.log(response);
	     		hide_load_modal();
	     		if (tripService.getPurchaseOrigin() == "0"){
	     			console.log(response);
	     			splittedResponse = response.split("{\"Cod_Impresion\":\"");
	     			var codImpresion = -1;
	       		if(splittedResponse[1] != undefined){
	       			codImpresion = splittedResponse[1].replace("\"}","");
	       		}
	     		} else if (tripService.getPurchaseOrigin() == "1") {
						splittedResponse = response.split("{Result\":\"");
						console.log(splittedResponse);
					}
   		var messageError = response;
   		try {
	    	switch(JSON.parse(splittedResponse[0]).status_detail) {
		    	case "accredited": //Pago aprobado
			    	if(tripService.getPurchaseOrigin() == "0") {
			        $location.path('/endPurchase/' + codImpresion);
			      } else if (tripService.getPurchaseOrigin() == "1"){
			      	$location.path('/endDeposit');
			      }
		      break;
		      case "pending_contingency": //Pago pendiente
		          messageError="ERROR: Pago pendiente";
		          break;
		      case "cc_rejected_call_for_authorize": //Pago rechazado, llamar para autorizar.
		          messageError="ERROR: Pago rechazado, llamar para autorizar.";
		          break;
		      case "cc_rejected_insufficient_amount": //Pago rechazado, saldo insuficiente.
		          messageError="ERROR: Pago rechazado, saldo insuficiente.";
		          break;
		      case "cc_rejected_bad_filled_security_code": //Pago rechazado por código de seguridad.
		          messageError="ERROR: Pago rechazado por código de seguridad.";
		          break;
		      case "cc_rejected_bad_filled_date": //Pago rechazado por fecha de expiración.
		          messageError="ERROR: Pago rechazado por fecha de expiración.";
		          break;
		      case "cc_rejected_bad_filled_other": //Pago rechazado por error en el formulario
		          messageError="ERROR: Pago rechazado por error en el formulario";
		          break;
		      default: //Pago rechazado
		          messageError="ERROR";
		          break;
				}

				if(messageError != ""){
      		document.getElementById("error-modal-text").innerHTML = messageError;
      		error_modal.style.display = "block";
      		//location.reload();
      	}
			} catch(err) {
				document.getElementById("error-modal-text").innerHTML = splittedResponse[0];
      	error_modal.style.display = "block";
			}

  		});
		}
        //doSubmit=true;
        //form.submit();
    
	};
}]);