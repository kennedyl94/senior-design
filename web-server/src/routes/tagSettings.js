var express = require('express')
    , router = express.Router()
    , _dataServices = require('../tagDataServices.js')
    , _orgServices = require('../orgDataServices.js')
    , _surveyServices = require('../surveyDataServices.js')
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
    var tag = {text: request.body.tag};
    _dataServices.addTag(tag, function() {
        response.sendStatus(200);
    }, function(error) {
        console.log(error);
    });
});

router.post('/:id', function(request, response) {
    var tagId = request.params.id;
    var tagEdit = {text: request.body.tag.text};
    _dataServices.getTag(tagId, function(tag) {
        //console.log(tagId);
        _orgServices.searchByTags(tag, function(orgs) {
            //console.log(orgs);
            for (var i = 0; i < orgs.length; i++) {
                //console.log(orgs[i]);
                for (var j = 0; j < orgs[i].tags.length; j++) {
                    //console.log(orgs[i].tags[j]._id);
                    if (orgs[i].tags[j]._id == tagId) {
                        orgs[i].tags[j] = {_id: tagId, text: tagEdit.text};
                    }
                }
                //console.log(orgs[i]);
                _orgServices.modifyOrgByName(orgs[i], function() {
                    //console.log(orgs[i]);
                }, function(error) {
                    //console.log(error);
                });
            }
        });

        _surveyServices.getAllQuestions({}, function(questions) {
            //console.log(questions);
            for (var i = 0; i < questions.length; i++) {
                //console.log(questions[i]);
                var modified = false;
                for (var j = 0; j < questions[i].tags.length; j++) {
                    //console.log(questions[i].tags._id);
                    //console.log(tagId);
                    if (questions[i].tags[j]._id == tagId) {
                        questions[i].tags[j] = {_id: tagId, text: tagEdit.text};
                        modified = true;
                        //console.log(modified);
                    }
                }

                if (modified) {
                    _surveyServices.modifyQuestion(questions[i], function () {
                        //do nothing
                    }, function (error) {
                        console.log(error);
                    });
                }
            }
        }, function(error) {
           //console.log(error);
        });
    }, function(error) {
        //console.log(error);
    });

    _dataServices.editTag(tagId, tagEdit, function() {
        response.sendStatus(200);
    }, function(err) {
        console.log(err);
    });
});

module.exports = router;