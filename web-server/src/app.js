/** Module Dependencies **/
var express = require('express')
	, bodyParser = require('body-parser')
	, _dataServices = require('./dataServices.js')
	, _surveyData = require('./surveyDataServices.js')
	, passport = require('passport');


/** CORS Middleware (Allows Client to Talk to This) **/
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
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
var survey = require("./routes/survey.js");
var upload = require("./routes/upload.js");

var test = require("./routes/test.js");
var login = require("./routes/login.js");
var logout = require("./routes/logout.js");

var router = express.Router();

/** Connect the Database Through Data Services **/
// _dataServices.connect();
// _surveyData.connect();
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/login', login);

app.use('/api/logout', logout);

app.use('/api/Organizations/', Orgs);

app.use('/api/createClub', createClub);

app.use('/api/survey', survey);

app.use('/api//UploadFile', upload);

app.use('/api/test/', test);

app.use('/api/', router);

/** Start the Express Sever **/
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Org Finder App listening at http://%s:%s', host, port);
});