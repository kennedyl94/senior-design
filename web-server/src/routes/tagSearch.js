var express = require('express')
  , router = express.Router();
var  _dataServices = require('../dataServices.js');
  
router.get('/', function(req, res) {
	_dataServices.getAllTags(function(tags){res.send(tags);},
		function(err){console.log(err);});
});

router.post('/', function(req, res) {
	var tags = req.body.tags;
	var tagList = [];
	tags.forEach(function(tag) {
		if (tag.checked) {
			tagList.push(tag.text);
		}
	});
	_dataServices.searchByTags(tagList,
		function(orgs) {
			res.send(orgs);
		},
		function(err) {
			console.log(err);
		});
})

module.exports = router;