var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser());


app.get('/', function (req, res) {
  // res.send('Hello World!');
  res.sendfile('test.html');
});

app.post('/', function(req, res)
{
  console.log(req.body.hi);
  
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});