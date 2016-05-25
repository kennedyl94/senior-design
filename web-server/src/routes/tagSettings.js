var express = require('express')
    , router = express.Router()
    , _dataServices = require('../tagDataServices.js')
    , config = require('../../config');

router.get('/', function(request, response) {
    _dataServices.getAllTags(function(tags) {
        response.send(tags);
    }, function(err) {
        if (err) {console.log(err);}
    });
});

router.delete('/:id', function(request, response) {
    var id = request.params.id;
    _dataServices.deleteTag(id, function(err) {
        if (err) {console.log(err);}
    });
    response.send(200);
});

router.put('/', function (request, response) {
    var tag = {text: request.body.tag};
    _dataServices.addTag(tag, function() {
        response.sendStatus(200);
    }, function(error) {
        if (error) {console.log(error);}
    });
});

router.post('/:id', function(request, response) {
    var tagId = request.params.id;
    var tagEdit = {text: request.body.tag.text};
    //console.log(tagEdit);
    _dataServices.editTag(tagId, tagEdit, function() {
        response.sendStatus(200);
    }, function(err) {
        if (err) {console.log(err);}
    });
});

module.exports = router;