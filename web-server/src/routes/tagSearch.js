var express = require('express')
  , router = express.Router();
var  _orgServices = require('../orgDataServices.js'),
	_tagServices = require('../tagDataServices.js');
  
router.get('/', function(req, res) {
	_tagServices.getAllTags(function(tags){res.send(tags);},
		function(err){
			if (err) {console.log(err);}
		});
});

router.post('/', function(req, res) {
	var tags = req.body.tags;
	var tagList = [];
	tags.forEach(function(tag) {
		if (tag.checked) {
			tagList.push(tag.tag);
		}
	});

	_orgServices.searchByTags(tagList,
		function(orgs) {
			res.send(orgs);
		},
		function(err) {
			if (err) {console.log(err);}
		});
})

module.exports = router;