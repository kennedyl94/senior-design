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

/** Connect the Database Through Data Services **/
_dataServices.connect();

/** Start the Express Sever **/
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Org Finder App listening at http://%s:%s', host, port);
});

app.get('/Organizations', function (req, res) {
  _dataServices.getAllOrgs(function(orgs) {
	  res.send(orgs);
  }, function(err) {
	 console.log(err);
  });
});

app.get('/createClub', function (req, res) {
	var data = { title: "Create a club entry" }
	res.send(data);
});

app.post('/createClub', function (req, res) {
	var org = req.body.club;
	_dataServices.addStudentOrg(org, function(err) {
		console.log(err);
	});
	res.sendStatus(200);
});

