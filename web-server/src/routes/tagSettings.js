var express = require('express')
    , router = express.Router()
    , _dataServices = require('../tagDataServices.js')
    , config = require('../../config');

router.get('/', function(request, response) {
    _dataServices.getAllTags(function(tags) {
        response.send(tags);
    }, function(err) {
        console.log(err);
    });
});

router.delete('/:id', function(request, response) {
    var id = request.params.id;
    _dataServices.deleteTag(id, function(err) {
        console.log(err);
    });
    response.send(200);
});

router.put('/', function (request, response) {
    var tag = {tag: request.body.tag};
    console.log(tag);
    _dataServices.addTag(tag, function() {
        response.sendStatus(200);
    }, function(error) {
        console.log(error);
    });
});

router.post('/:id', function(request, response) {
    var tagId = request.params.id;
    var tagEdit = {tag: request.body.tag.tag};
    //console.log(tagEdit);
    _dataServices.editTag(tagId, tagEdit, function() {
        response.sendStatus(200);
    }, function(err) {
        console.log(err);
    });
});

module.exports = router;