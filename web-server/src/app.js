/** Module Dependencies **/
var express = require('express')
	, bodyParser = require('body-parser')
	, _dataServices = require('./dataServices.js')
  

	
/** CORS Middleware (Allows Client to Talk to This) **/
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
	
/** Set Express Settings **/
var app = express();

app.use(bodyParser());
app.use(allowCrossDomain);

/**routes! */
var Orgs  = require('./routes/Orgs.js');
var createClub = require('./routes/createClub.js');
var test = require("./routes/test.js");


var router = express.Router();

/** Connect the Database Through Data Services **/
_dataServices.connect();


app.use('/Organizations/', Orgs);



app.use('/createClub', createClub);

app.use('/test/', test);

app.use('/', router);

/** Start the Express Sever **/
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Org Finder App listening at http://%s:%s', host, port);
});





