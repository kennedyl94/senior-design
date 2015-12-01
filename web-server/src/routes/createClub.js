var express = require('express')
  , router = express.Router()
var  _dataServices = require('../orgDataServices.js');
  
router.get('/', function (req, res) {
	var data = { title: "Create a club entry" }
	res.send(data);
});
router.post("/", function (req, res) {
	var org = req.body.club;
	_dataServices.addStudentOrg(org, function(err) {
		console.log(err);
	});
	res.sendStatus(200);
});

module.exports = router;