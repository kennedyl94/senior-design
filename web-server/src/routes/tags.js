var express = require('express')
  , router = express.Router()
var  _dataServices = require('../dataServices.js');
  
router.get('/', function (req, res) {
	_dataServices.getAllTags(function(tags){res.send(tags);},
		function(err){console.log(err);});
});

module.exports = router;