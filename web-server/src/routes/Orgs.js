var express = require('express')
  , router = express.Router()
var  _dataServices = require('../orgDataServices.js');

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

module.exports = router;