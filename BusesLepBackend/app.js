var express         = require("express"),
    app             = express(),
 	bodyParser      = require("body-parser"),
    methodOverride  = require("method-override");

var mpCtrl = require('./controllers/mercadopagoController');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Example Route
var router = express.Router();
router.post('/', function(req, res) {
  res.send("Hello world!");
});
app.use(router);

// API routes
var accessTkRoute = express.Router();

/*app.post('/myaction', function(req, res) {
	console.log(req.body);
  res.send('You sent the name "' + req.body + '".');
});*/

accessTkRoute.route('/mercadopago')
  .post(mpCtrl.addPay)

app.use('/api', accessTkRoute);

// Start server
app.listen(8081, function() {
  console.log("Node server running on http://localhost:8081");
});