var express = require('express')
  , router = express.Router();
var  _dataServices = require('../orgDataServices.js');
var _userDataServices = require('../userDataServices.js');

router.post("/", function (req, res) {
	var org = req.body.club;

	if (org.links!= null && org.links.length > 0) {
		if (org.links.indexOf(',') != -1) {
			org.links = org.links.split(',');
			for (var i = 0; i < org.links.length; i++) {

				org.links[i] = org.links[i].trim();
				if (org.links[i].indexOf("://") == -1) {
					org.links[i] = "http://" + org.links[i];
				}
			}
		} else {
			if (typeof org.links == 'string') {
				org.links = [org.links];
			}

			if (org.links[0].indexOf("://") == -1) {
				org.links[0] = "http://" + org.links[0];
			}
		}
	}

	_dataServices.addStudentOrg(org, function(err) {
		if(err) {res.sendStatus(500)}
		_userDataServices.addOrganizationToSLAdmin(org.name, function() {
			res.sendStatus(200);
		});
	});
});

module.exports = router;
