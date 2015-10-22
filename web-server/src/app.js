var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser());

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);


app.get('/', function (req, res) {
  // res.send('Hello World!');
  res.sendfile('test.html');
});

app.post('/', function(req, res)
{
	
  console.log(req.body.hi);
});

app.get('/test', function (req, res) {
	res.send("test");
});
app.get('/Organizations', function (req, res) {
	//TODO: get stuff from db
	var orgs = [
    { 
      id:0,
      name:"Hullo",
      tags:["hi","list"],
      description:"I enjoy pie",
      contact: 
	  {
          name:"me",
          email:"hullo@email.com",
          phone:"222-222-2222"
	  }
    },
	{
	  id:1,
      name:"Hullo2",
      tags:["hi2","list2"],
      description:"I enjoy pie too much",
      contact: 
	  {
          name:"not me",
          email:"hullo2@email.com",
          phone:"333-333-3333"
      }
    }
  ]
  res.send(orgs);
});

app.get('/createClub', function (req, res) {
	var data = {
		title:"Create a club entry"
	}
	res.send(data);
});

app.post('/createClub', function (req, res) {
	var data = req.body.club;
	console.log(data);
	res.sendStatus(200);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});