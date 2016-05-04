var express = require('express')
    , router = express.Router();

var  _dataServices = require('../orgDataServices.js');
var config = require('../../config');

router.get('/allChanges', function (req, res) {
    console.log("in all changes on web server side");
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

module.exports = router;