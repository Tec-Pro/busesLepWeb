var MP = require ("mercadopago");


//POST - 
exports.addPay = function(req, res) {
	console.log(req.body);
  	res.send(req.body);
	//var mp = new MP ("2904583563743935", "iq8B0tsLT2GcemjWE4j72TSFbzuMg7vn");
	//var mp = new MP("TEST-4726800040665799-062120-ded63d44b1a16afea765b0aa332a83dc__LA_LD__-218055630");

	//mp.getAccessToken(function (err, accessToken){
		//if(err) res.send(500, err.message);

    	//console.log('GET /accessTk')
		//res.status(200).jsonp(accessToken);
		//res.status(200).send({ accessToken: accessToken });
		//res.end( data );
		//console.log (accessToken);
	/*var doPayment = mp.post ("/v1/payments", // aca habria que invocar al ws de la lep en realidad
	{
		"transaction_amount": 10,
		"token": req.body.token,
		"description": "Title of what you are paying for",
		"installments": 1,
		"payment_method_id": req.body.paymentMethodId,
		"payer": {
			"email": req.body.email
		}
	});

	doPayment.then (
		function (payment) {
			//console.log (payment);
			res.status(200);
			res.send('todo bien con el pago');
		},
		function (error){
			console.log (error);
			res.status(500);
			res.send('todo mal con el pago');
	});*/
	//});
};

exports.getPayments = function(req, res) {
	var MP = require ("mercadopago");

	var mp = new MP ("TEST-2904583563743935-061823-ad2318bd3a6ed4b74a39125feb2962c2__LB_LD__-154176979");

	var getPaymentMethods = mp.get ("/v1/payment_methods");

	getPaymentMethods.then (
	    function (paymentMethods) {
	        res.status(200).send(paymentMethods);
	    },
	    function (error) {
	        console.log (error);
	    });
	}