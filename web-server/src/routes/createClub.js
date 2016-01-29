var express = require('express')
  , router = express.Router();
var  _dataServices = require('../dataServices.js');

router.post("/", function (req, res) {
	var org = req.body.club;
	if (org.tags.indexOf(',') != -1) {
		org.tags = org.tags.split(',');
	} else {
		org.tags = [org.tags];
	}
	_dataServices.addStudentOrg(org, function(err) {
		console.log(err);
	});
	res.sendStatus(200);
});

module.exports = router;