/** Module Dependencies **/
var express = require('express')
	, bodyParser = require('body-parser')
	, _dataServices = require('./orgDataServices.js')
    , _surveyData = require('./surveyDataServices.js');
 
  

	
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
var survey = require("./routes/survey.js");
// var upload = require("./routes/upload.js");

var test = require("./routes/test.js");


var router = express.Router();

/** Connect the Database Through Data Services **/
// _dataServices.connect();
_surveyData.connect();


app.use('/Organizations/', Orgs);



app.use('/createClub', createClub);

app.use('/survey', survey);

// app.use('/UploadFile', upload);

app.use('/test/', test);

app.use('/', router);

/** Start the Express Sever **/
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Org Finder App listening at http://%s:%s', host, port);
});





