var express = require('express')
  , router = express.Router()
var  _dataServices = require('../dataServices.js');
  
router.get('/', function (req, res) {
	var data = {};
	_dataServices.getAllTags(function(tags){
		data.tags = tags;
	},
		function(err){console.log(err);});
	_dataServices.getAllOrgs(function(orgs){data.orgs = orgs;},
		function(err){console.log(err);});
	res.send(data);
});

module.exports = router;