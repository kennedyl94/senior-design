var express = require('express')
  , router = express.Router();
var  _dataServices = require('../orgDataServices.js');
var _userDataServices = require('../userDataServices.js');

router.get('/:sortType', function (req, res) {
  var sortType = req.params.sortType;
  _dataServices.getAllOrgs(sortType,
    function(orgs) {
        // var i = 0;
        // for (i; i < Object.keys(orgs).length; i++) {
        //     orgs[Object.keys(orgs)[i]] = splitOnNewLine(orgs[Object.keys(orgs)[i]]);
        // }
        // console.log(orgs);
        res.send(orgs);
    }, function(err) {
       console.log(err);
    });
});

router.get('/user/:currentUser', function (req, res) {
    var currentUser = req.params.currentUser;
    var userOrgs = {};
    _userDataServices.getOrgsForSpecificUser(currentUser,
        function(orgs) {
            console.log("specific orgs");
            userOrgs = orgs;
            _dataServices.getOrgsInfoByName(userOrgs,
                function (error, orgsWithInfo) {
                    res.send(orgsWithInfo);
                }
            );
        }, function(err) {
            console.log(err);
        }
    );
});

router.delete('/delete/:orgId', function(req, res) {
    var orgId = req.params.orgId;
    _dataServices.deleteOrg(orgId,
    function() {
        res.sendStatus(200);
    }, function(error) {
        console.log(error);
  });
});

router.put('/modify/:orgId', function(req, res) {
    var orgId = req.params.orgId;
    var orgToUpdate = req.body;
    // console.log(req.body.meetings);

    for (var i = 0; i < orgToUpdate.tags.length; i++) {
        orgToUpdate.tags[i] = {_id: orgToUpdate.tags[i]._id, tag: orgToUpdate.tags[i].text};
    }
    console.log(orgToUpdate.tags);

    if(orgToUpdate.links != null && orgToUpdate.links.length > 0) {
        if (orgToUpdate.links.indexOf(',') != -1) {
            orgToUpdate.links = orgToUpdate.links.split(',');
            for (var i = 0; i < orgToUpdate.links.length; i++) {

                orgToUpdate.links[i] = orgToUpdate.links[i].trim();

                if (orgToUpdate.links[i].indexOf("://") == -1) {
                    // console.log(orgToUpdate.links[i]);
                    orgToUpdate.links[i] = "http://" + orgToUpdate.links[i];
                }
                // if (org.links[i].indexOf(' ') == 0) {	//Tags likely begin with a single space after being split
                // 	org.links[i] = org.links[i].substring(1);	// remove the space
                // }
            }
        } else {
            // console.log(typeof orgToUpdate.links)
            if (typeof orgToUpdate.links == 'string') {

                orgToUpdate.links = [orgToUpdate.links];
            }
            if (orgToUpdate.links[0].indexOf("://") == -1) {
                // console.log(orgToUpdate.links[0]);
                orgToUpdate.links[0] = "http://" + orgToUpdate.links[0];
            }
        }
    }

    _dataServices.modifyOrg(orgId, orgToUpdate,
    function() {
        res.sendStatus(200);
    }, function(error) {
        console.log(error);
    });
});

router.put('/activation/:orgId', function(req, res) {
    var orgId = req.params.orgId;
    var isActive = req.body.isActive;
    _dataServices.activation(orgId, isActive, function() {
        res.sendStatus(200);
    }, function(error) {
        console.log(error);
    });
});

router.put('/proposeChange', function(req, res) {
    var change = req.body.change;
    _dataServices.proposeChange(change, function() {
        res.sendStatus(200);
    }, function(error) {
        console.log(error);
    });
});

module.exports = router;