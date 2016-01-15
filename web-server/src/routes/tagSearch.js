var express = require('express')
  , router = express.Router();
var  _dataServices = require('../dataServices.js');
  
router.get('/', function(req, res) {
	_dataServices.getAllTags(function(tags){res.send(tags);},
		function(err){console.log(err);});
});

router.post('/', function(req, res) {
	_dataServices.searchByTags(req.body.tags,
		function(orgs) {
			res.send(orgs);
		},
		function(err) {
			console.log(err);
		});
})

module.exports = router;