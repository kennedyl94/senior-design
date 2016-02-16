var express = require('express')
  , router = express.Router()
var  _dataServices = require('../orgDataServices.js');

router.get('/:sortType', function (req, res) {
  var sortType = req.params.sortType;
  _dataServices.getAllOrgs(sortType,
    function(orgs) {
        res.send(orgs);
    }, function(err) {
       console.log(err);
    });
});

router.delete('/delete/:orgId', function(req, res) {
    var orgId = req.params.orgId;
    _dataServices.deleteOrg(orgId,
    function() {
        res.sendStatus(200);
    }, function(error) {
        //console.log(error);
  });
});

router.put('/modify/:orgId', function(req, res) {
    var orgId = req.params.orgId;
    var orgToUpdate = req.body;
    if (orgToUpdate.tags.indexOf(',') != -1) {	//Tags separated by commas? If no, only one tag
        orgToUpdate.tags = orgToUpdate.tags.split(',');
        for (var i = 0; i < orgToUpdate.tags.length; i++) {
            if (orgToUpdate.tags[i].indexOf(' ') == 0) {	//Tags likely begin with a single space after being split
                orgToUpdate.tags[i] = orgToUpdate.tags[i].substring(1);	// remove the space
            }
        }
    } else {
        orgToUpdate.tags = [orgToUpdate.tags];
    }
    _dataServices.modifyOrg(orgId, orgToUpdate,
    function() {
        res.sendStatus(200);
    }, function(error) {
        //console.log(error);
    });
});

router.put('/activation/:orgId', function(req, res) {
    var orgId = req.params.orgId;
    var isActive = req.body.isActive;
    _dataServices.activation(orgId, isActive, function() {
        res.sendStatus(200);
    }, function(error) {
        //console.log(error);
    });
});

module.exports = router;
