var MP = require ("mercadopago");


//GET - 
exports.getAccessToken = function(req, res) {
	var mp = new MP ("2904583563743935", "iq8B0tsLT2GcemjWE4j72TSFbzuMg7vn");

	mp.getAccessToken(function (err, accessToken){
		if(err) res.send(500, err.message);

    	console.log('GET /accessTk')
		//res.status(200).jsonp(accessToken);
		res.status(200).send({ accessToken: accessToken });
		//res.end( data );
		//console.log (accessToken);
	});
};