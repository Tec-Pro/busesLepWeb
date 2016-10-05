angular.module('app')
.controller('MercadopagoController', ['$scope', '$http', '$location', '$anchorScroll', 'wsService', 'localStorageService', 'tripService', function($scope,$http, $location, $anchorScroll, wsService, localStorageService, tripService){
//https://webservices.buseslep.com.ar:443/WebServices/WSCobroMercadoPagoTest.dll/soap/IWSCobroMercadoPago
	//https://webservices.buseslep.com.ar/WebServices/WSCobroMercadoPago.dll/wsdl/IWSCobroMercadoPago para poner en el soap client
	//https://webservices.buseslep.com.ar:443/WebServices/WSCobroMercadoPago.dll/soap/IWSCobroMercadoPago //para poner en la wsdl_urn
	var wsdl_url ="https://webservices.buseslep.com.ar/WebServices/WSCobroMercadoPagoTest.dll/wsdl/IWSCobroMercadoPago"; //"https://webservices.buseslep.com.ar:443/WebServices/WSCobroMercadoPagocTestyEnc.dll/soap/IWSCobroMercadoPago";
	var urn = "";
	wsMethod = "RealizarCobroMercadoPago";
	$anchorScroll();
	$scope.paymentMethod = [];

	//Sets the test key.
	Mercadopago.setPublishableKey("TEST-2e5d7d95-7cb8-48d3-8bd6-cfde1bc34254"); 
	//TEST-2e5d7d95-7cb8-48d3-8bd6-cfde1bc34254
	
	Mercadopago.getIdentificationTypes();

	$scope.issuer = '';
	$scope.installment = '';
	$scope.object = {
		"bin": ''
	}

	$scope.paymentMethod = [];
	var show_issuers = false;
	var enable_installments = false;

/*	var binHandler = function(){
		if 
	}
*/
	var error_modal = document.getElementById('error-modal');
	var load_modal = document.getElementById('load-modal');

   var display_load_modal = function(){
    load_modal.style.display = "block";
  }

  var hide_load_modal = function(){
    load_modal.style.display = "none";
  }

  $scope.hide_modal = function(){
    error_modal.style.display = "none";
    location.reload();
  }
  var user_email = localStorageService.get("user-lep").email;
  if (user_email == undefined){
  	$location.path('/');
  }

	$scope.price = tripService.getTripPrice();//10//tripService.getTripPrice();
	if(tripService.getTripPrice() == undefined){
		$location.path('/');
	}
	var sell_code = tripService.getSellCode();
	if(sell_code == undefined){
		$location.path('/');
	}
	var remove_options = function(obj){
		if (obj == null) return;
		if (obj.options == null) return;
		obj.options.length = 1;
	}


	function addEvent(el, eventName, handler){
	    if (el.addEventListener) {
	           el.addEventListener(eventName, handler);
	    } else {
	        el.attachEvent('on' + eventName, function(){
	          handler.call(el);
	        });
	    }
	};

	$scope.$watch('object.bin', function(){
		if ($scope.object.bin.length == 6){
			Mercadopago.getPaymentMethod($scope.object, function(status, pm_response){
				console.log(pm_response);
				var form = document.querySelector('#pay');
        if (document.querySelector("input[name=paymentMethodId]") == null) {
            var paymentMethod = document.createElement('input');
            paymentMethod.setAttribute('name', "paymentMethodId");
            paymentMethod.setAttribute('type', "hidden");
            paymentMethod.setAttribute('value', pm_response[0].id);
            //console.log(response[0].id);
            form.appendChild(paymentMethod);
        } else {
            document.querySelector("input[name=paymentMethodId]").value = pm_response[0].id;
        }
				if (pm_response.length > 1){
					$scope.paymentMethod = pm_response[1];
				} else {
					$scope.paymentMethod = pm_response[0];
				}
				if ($scope.paymentMethod.additional_info_needed.includes("issuer_id")){
					Mercadopago.getIssuers($scope.paymentMethod.id, function(status, iss_response){
						document.getElementById('inst_sel').disabled = true;
						if (status == 200){
							var iss_sel =document.getElementById('issuerSelector');
							remove_options(iss_sel);
							for (var i = 0; i < iss_response.length; i++){
								var iss_opt = document.createElement('option');
								iss_opt.value = iss_response[i].id;
								iss_opt.innerHTML = iss_response[i].name;
								iss_sel.appendChild(iss_opt);
							}
							console.log(iss_response);
							document.getElementById('iss_container').style.visibility = "visible";
							/*$scope.installments.length = 0;*/
						}
					});
				} else {
					document.getElementById('iss_container').style.visibility = "hidden";
					/*$scope.issuers.length = 0; */
					Mercadopago.getInstallments({"bin":$scope.object.bin,"amount":$scope.price}, function(status, inst_response){
						console.log(inst_response);
						if (status == 200){
							var inst_sel = document.getElementById('inst_sel');
							remove_options(inst_sel);
							for (var k = 0; k < inst_response[0].payer_costs.length; k++){
								var inst_opt = document.createElement('option');
								inst_opt.value = inst_response[0].payer_costs[k].installments;
								inst_opt.innerHTML = inst_response[0].payer_costs[k].recommended_message;
								inst_sel.appendChild(inst_opt);
							}
							inst_sel.disabled = false;
							console.log(inst_sel);
							//$scope.installments = inst_response;
							//console.log(inst_response);
							//console.log($scope.installments);
							//console.log($scope.installments.length);
						} else {
							inst_sel.disabled = true;
						}
					});
				}
			})
		} else if($scope.object.bin.length < 6) {
/*			$scope.paymentMethod.length = 0;
			$scope.issuers.length = 0;
			$scope.installments.length = 0;*/
			$scope.paymentMethod = [];
		}

	});

	$scope.issuerSelected = function(){
		if($scope.issuer != ''){
			Mercadopago.getInstallments({"bin":$scope.object.bin.substring(0,6), "payment_method_id": $scope.paymentMethod.id, "amount":$scope.price,"issuer_id":$scope.issuer}, function(status, inst_response){
				//console.log({"bin":$scope.object.bin.substring(0,6), "amount":$scope.price,"issuer_id":$scope.issuer});
				//console.log(inst_response);
				console.log(inst_response);
						if (status == 200){
							var inst_sel = document.getElementById('inst_sel');
							remove_options(inst_sel);
							for (var k = 0; k < inst_response[0].payer_costs.length; k++){
								var inst_opt = document.createElement('option');
								inst_opt.value = inst_response[0].payer_costs[k].installments;
								inst_opt.innerHTML = inst_response[0].payer_costs[k].recommended_message;
								inst_sel.appendChild(inst_opt);
							}
							console.log(inst_sel);
							inst_sel.disabled = false;
							console.log(inst_sel);
							//$scope.installments = inst_response;
							//console.log(inst_response);
							//console.log($scope.installments);
							//console.log($scope.installments.length);
						} else {
							console.log("Ehhh");
							document.getElementById('inst_sel').disabled = true;
						}
				//$scope.$apply();
			})
		}
	}


	doSubmit = false;
	addEvent(document.querySelector('#pay'),'submit',doPay);
	function doPay(event){
			console.log("Hola amigo");
	    event.preventDefault();
	    if(!doSubmit){
	        var $form = document.querySelector('#pay');
	        console.log($form);
	        console.log(document.getElementById('cardNumber'));
	        console.log(document.getElementById('cardNumber').value);
	        Mercadopago.createToken($form, sdkResponseHandler); // The function "sdkResponseHandler" is defined below
	        return false;
	    }
	};

		function sdkResponseHandler(status, response) {
			console.log(response);
	    if (status != 200 && status != 201) {
	    	document.getElementById("error-modal-text").innerHTML = "Datos Incorrectos";
		    error_modal.style.display = "block";
	    }else{
	       //alert("all good" + response.id);
	       //console.log(response);
	        var form = document.querySelector('#pay');
	        var card = document.createElement('input');
	        card.setAttribute('name',"token");
	        card.setAttribute('type',"hidden");
	        card.setAttribute('value',response.id);
	        form.appendChild(card);
	        idventa = sell_code;
	        //var form = new FormData(document.getElementById("form"));
			//var inputValue = form.get("inputTypeName");
			cuotas = $scope.installment;
			if (tripService.getPurchaseOrigin() == "0") {
	        	var datosCompra = {description:"boletos",
	        				external_reference: "boleto:"+idventa,
	        				installments: parseInt(cuotas),
	        				payer:{email: "test_user_19653727@testuser.com"},//"test_user_19653727@testuser.com"},//user_email},
	        				payment_method_id: $scope.selectedPayment,
	        				token: response.id,
	        				transaction_amount: parseInt($scope.totalAmount)
	        	}
	        } else if (tripService.getPurchaseOrigin() == "1") {
	        	var datosCompra = {description:"precarga tarjeta",
	        				external_reference: "recarga:"+idventa,
	        				installments: parseInt(cuotas),
	        				payer:{email: "test_user_19653727@testuser.com"},//"test_user_19653727@testuser.com"},//user_email},
	        				payment_method_id: $scope.selectedPayment,
	        				token: response.id,
	        				transaction_amount: parseInt($scope.totalAmount)
	        	}
	        }
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
	       		hide_load_modal();
	       		console.log(response);
	       		if (tripService.getPurchaseOrigin() == "0"){
	       			splittedResponse = response.split("{\"Cod_Impresion\":\"");
	       			var codImpresion = -1;
		       		if(splittedResponse[1] != undefined){
		       			codImpresion = splittedResponse[1].replace("\"}","");
		       		}
	       		} else if (tripService.getPurchaseOrigin() == "1") {
					splittedResponse = response.split("{Result\":\"");
					console.log(splittedResponse);
				}
	       		var messageError = "";
	       		try {
				    switch(JSON.parse(splittedResponse[0]).status_detail) {
				    case "accredited": //Pago aprobado
				    	if(tripService.getPurchaseOrigin() == "0") {
                $location.path('/endPurchase/' + codImpresion);
              } else if (tripService.getPurchaseOrigin() == "1"){
              	$location.path('/endDeposit');
              }
	                        //doSubmit=true;
		        			//form.submit();
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
				}
				catch(err) {
					document.getElementById("error-modal-text").innerHTML = splittedResponse[0];
		        	error_modal.style.display = "block";
				}

	        });


	        /*$http.post("http://localhost:8081/api/mercadopago").success(function(response){ //llama a nuestra api para efectuar el pago
				console.log(response);
			});*/
	    }
	};
	//APP_USR-3f8dc194-8894-4d07-bb6c-b4a786a19c6c

	//Get the payment methods with an AJAX call.
	/*$http.get("https://api.mercadolibre.com/sites/MLA/payment_methods").success(function(response){ 
		payments = response;
		if (payments.length > 0) {
			for (var i = 0; i < payments.length; i++) {
				//Filter the payments.
				if(payments[i].payment_type_id == 'credit_card'){
					$scope.paymentMethods.push({id:payments[i].id,name:payments[i].name});
				}
			};
  	}	
  });*/

}]);
