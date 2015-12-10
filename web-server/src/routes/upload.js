var express = require('express')
  , router = express.Router();
  
var _dataServices = require('../orgDataServices');

router.post('/', function(req, res){
	var payload =""
	req.on('data', function(chunk){
			payload += chunk;
	});
	req.on('end', function(){
		console.log(payload);
	});
});

module.exports = router;
