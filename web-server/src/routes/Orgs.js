var express = require('express')
  , router = express.Router()
var  _dataServices = require('../dataServices.js');

router.get('/:sortType', function (req, res) {
  var sortType = req.params.sortType;
  console.log(sortType);
  _dataServices.getAllOrgs(sortType,
  function(orgs) {
	  res.send(orgs);
  }, function(err) {
	 console.log(err);
  });
});

router.get('/', function(req, res) {
  console.log("in orgs");
});

module.exports = router;