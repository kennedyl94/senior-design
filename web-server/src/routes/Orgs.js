var express = require('express')
  , router = express.Router()
var  _dataServices = require('../dataServices.js');

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
        console.log(error);
    });
  });

module.exports = router;