var express = require('express')
  , router = express.Router();
var  _dataServices = require('../orgDataServices.js');

router.post("/", function (req, res) {
	// console.log(req.body.club.meetings);
	var org = req.body.club;
	console.log(org.tags);
	//for (var i = 0; i < org.tags.length; i++) {
	//	org.tags[i] = {_id: org.tags[i]._id, text: org.tags[i].text};
	//}
	//console.log(org.tags);

	if (org.links!= null && org.links.length > 0) {
		if (org.links.indexOf(',') != -1) {
			org.links = org.links.split(',');
			for (var i = 0; i < org.links.length; i++) {

				org.links[i] = org.links[i].trim();
				// console.log("hello" +org.links[i]);
				if (org.links[i].indexOf("://") == -1) {
					org.links[i] = "http://" + org.links[i];
				}
				// if (org.links[i].indexOf(' ') == 0) {	//Tags likely begin with a single space after being split
				// 	org.links[i] = org.links[i].substring(1);	// remove the space
				// }
			}
		} else {
			if (typeof org.links == 'string') {
				org.links = [org.links];
			}

			org.tags = [org.tags];
			console.log("one tag" + org.tags[0]);
			if (org.links[0].indexOf("://") == -1) {
				org.links[0] = "http://" + org.links[0];
			}
		}
	}


	_dataServices.addStudentOrg(org, function(err) {
		console.log(err);
	});

	res.sendStatus(200);
});

module.exports = router;
