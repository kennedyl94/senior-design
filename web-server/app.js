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
  var l =[
    { 
      id:0,
      name:"Hullo",
      tags:["hi","list"],
      description:"I enjoy pie",
      contact:{
          name:"me",
          email:"hullo@email.com",
          phone:"222-222-2222"
        }
      }
    
    
  ]
  
  
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});