/** Module Dependencies **/
var express = require('express')
	, bodyParser = require('body-parser')
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
var tags = require('./routes/tagSearch.js');
var email = require('./routes/email.js');

var test = require("./routes/test.js");
var login = require("./routes/login.js");
var logout = require("./routes/logout.js");
var surveySet = require("./routes/surveySettings.js");
var userSettings = require("./routes/userSettings.js");
var tagSettings = require('./routes/tagSettings.js');

var router = express.Router();

/** Connect the Database Through Data Services **/
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/login', login);

app.use('/api/logout', logout);

app.use('/api/userSettings', userSettings);

app.use('/api/Organizations/', Orgs);

app.use('/api/tagSearch/', tags);

app.use('/api/tagSettings', tagSettings);

app.use('/api/createClub', createClub);

app.use('/api/survey', survey);

app.use('/api/surveySet', surveySet);

app.use('/api/UploadFile', upload);

app.use('/api/email', email);

app.use('/api/test/', test);

app.use('/api/', router);

/** Start the Express Sever **/
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Org Finder App listening at http://%s:%s', host, port);
});
