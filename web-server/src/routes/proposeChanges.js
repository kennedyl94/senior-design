var express = require('express')
    , router = express.Router();

var  _dataServices = require('../orgDataServices.js');
var config = require('../../config');
var jsonfile = require('jsonfile');
var adminEmailFile =__dirname+"/../../adminEmailConfig.json";

router.get('/allChanges', function (req, res) {
    _dataServices.getAllChanges(function(changes) {
        res.send(changes);
    }, function(err) {
        console.log(err);
        res.sendStatus(404);
    });
});

router.delete('/delete/:id', function(request, response) {
    var id = request.params.id;
    _dataServices.deleteChange(id,
        function() {
            response.sendStatus(200);
        }, function(error) {
            console.log(error);
        });
});

router.getAdminEmail = function() {
    var adminEmail = jsonfile.readFileSync(adminEmailFile);
    return adminEmail.email;
};

router.put('/changeAdminEmail', function(req, res) {
    var adminEmail = jsonfile.readFileSync(adminEmailFile);
    adminEmail.email = req.body.adminEmail;
    jsonfile.writeFileSync(adminEmailFile, adminEmail);
    res.send(200);
});

module.exports = router;