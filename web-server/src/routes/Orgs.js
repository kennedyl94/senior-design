var express = require('express')
  , router = express.Router();
var  _dataServices = require('../orgDataServices.js');
var _userDataServices = require('../userDataServices.js');

router.get('/:sortType', function (req, res) {
  var sortType = req.params.sortType;
  _dataServices.getAllOrgs(sortType,
    function(orgs) {
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

router.put('/modifyOrgByName', function(req, res) {
    var orgToUpdate = req.body.org;
    orgToUpdate = styleOrgToUpdate(orgToUpdate);

    _dataServices.modifyOrgByName(orgToUpdate,
        function() {
            res.sendStatus(200);
        }, function(error) {
            console.log(error);
        });
});

router.put('/modify/:orgId', function(req, res) {
    var orgId = req.params.orgId;
    var orgToUpdate = req.body;

    orgToUpdate = styleOrgToUpdate(orgToUpdate);

    _dataServices.modifyOrg(orgId, orgToUpdate,
    function() {
        res.sendStatus(200);
    }, function(error) {
        console.log(error);
    });
});

function styleOrgToUpdate(orgToUpdate) {
    for (var i = 0; i < orgToUpdate.tags.length; i++) {
        orgToUpdate.tags[i] = {_id: orgToUpdate.tags[i]._id, text: orgToUpdate.tags[i].text};
    }

    if(orgToUpdate.links != null && orgToUpdate.links.length > 0) {
        if (orgToUpdate.links.indexOf(',') != -1) {
            orgToUpdate.links = orgToUpdate.links.split(',');
            for (var i = 0; i < orgToUpdate.links.length; i++) {
                orgToUpdate.links[i] = orgToUpdate.links[i].trim();

                if (orgToUpdate.links[i].indexOf("://") == -1) {
                    orgToUpdate.links[i] = "http://" + orgToUpdate.links[i];
                }
            }
        } else {
            if (typeof orgToUpdate.links == 'string') {
                orgToUpdate.links = [orgToUpdate.links];
            }
            if (orgToUpdate.links[0].indexOf("://") == -1) {
                orgToUpdate.links[0] = "http://" + orgToUpdate.links[0];
            }
        }
    }
    return orgToUpdate;
}

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