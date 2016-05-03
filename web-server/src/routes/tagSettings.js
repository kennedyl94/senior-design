var express = require('express')
    , router = express.Router()
    , _dataServices = require('../tagDataServices.js')
    , config = require('../../config');

router.get('/', function(request, response) {
    _dataServices.getAllTags(
        function(tags) {
            response.send(tags);
        }, function(err) {
            console.log(err);
        });
});

router.delete('/:id', function(request, response) {
    var id = request.params.id;
    _dataServices.deleteTag(id,
        function() {
            response.sendStatus(200);
        }, function(error) {
            console.log(error);
        });
});

router.post('/', function (request, response) {
    var tag = request.body.tag;
    _dataServices.addTag(tag,
        function() {
            response.sendStatus(200);
        }, function(error) {
            console.log(error);
        });
});

module.exports = router;
