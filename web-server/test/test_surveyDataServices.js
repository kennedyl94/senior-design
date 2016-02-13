var assert = require('assert');
var sinon = require('sinon');
var mongoose = require('mongoose');
var async = require('async');


var config = require('../config');
var realDbName = config.mongo;
var fakeDbName = 'mongodb://localhost/test';
config.mongo = fakeDbName;

var surveyDataServices = require('../src/surveyDataServices');

var fakeTags = [
    "athletic",
    "outdoors",
    "team"
];

var fakeTags2 = [
    "questions",
    "answers",
    "forms"
];

var fakeQuestion = {
    question: "Do you like baseball?",
    tags: fakeTags,
    category: "athletics"
};

var fakeQuestion2 = {
    question: "Do you like questions?",
    tags: fakeTags2,
    category: "surveys"
};

var fakeIds = [];

describe('surveyDataServices', function () {
 
    describe('#addQuestion', function() {
    
        afterEach(function(){
            var connection = mongoose.connection;
            connection.db.dropDatabase();
        });
    
        it('should not send error to callback if successful.', function(done){
            surveyDataServices.addQuestion(fakeQuestion, function(err, savedQuestion){
                assert.equal(err, null);
                done();
            });
        });
        
        it('should save new question', function(done) {
            surveyDataServices.addQuestion(fakeQuestion, function(err, savedQuestion){
                assert.deepEqual({
                    question: savedQuestion.question,
                    tags: savedQuestion.tags.toObject(),
                    category: savedQuestion.category
                }, fakeQuestion);
                done();
            });
        });
    });
    
    describe('#getQuestionById', function(){
       
       
        afterEach(function(){
            var connection = mongoose.connection;
            connection.db.dropDatabase();
        });
        
        it('should send null question if id does not exist', function(done){
            surveyDataServices.addQuestion(fakeQuestion, function(err, savedQuestion){
                surveyDataServices.getQuestionById('', function(err, question){
                    assert.equal(question, null);                           
                    done();
                });
            });
        });
        
        it('should send question if id does exist', function(done){
            surveyDataServices.addQuestion(fakeQuestion, function(err, savedQuestion){
                surveyDataServices.getQuestionById(savedQuestion._id, function(err, question){
                    assert.deepEqual({
                        question: savedQuestion.question,
                        tags: savedQuestion.tags.toObject(),
                        category: savedQuestion.category
                    }, fakeQuestion);                           
                    done();
                });
            });
        });
    });
    
    describe('#getAllQuestions', function() {

        afterEach(function(){
            var connection = mongoose.connection;
            connection.db.dropDatabase();
        });

        it('should find all documents', function(done){
            async.parallel([
                function(callback){
                    surveyDataServices.addQuestion(fakeQuestion, function(err, savedQuestion){
                        callback();
                    });
                },
                function(callback){
                    surveyDataServices.addQuestion(fakeQuestion, function(err, savedQuestion){
                        callback();
                    });
                },
                function(callback){
                    surveyDataServices.addQuestion(fakeQuestion, function(err, savedQuestion){
                        callback();
                    });
                }],
                function(){                         
                    surveyDataServices.getAllQuestions('category', function(questions){
                        var size = 0;
                        for( question in questions){
                            size++;
                        }
                        assert.equal(size, 3);
                        done();
                    }, function(){});
                }
            );
        });
    });
    
    describe('#getQuestionsTagsByIds', function(){
        
        afterEach(function(){
            var connection = mongoose.connection;
            connection.db.dropDatabase();
        });
        
        it('should send an empty array if no questions exist', function(done){
            surveyDataServices.getQuestionsTagsByIds(fakeIds, function(tags){
                assert.deepEqual(tags, []);
                done();
            });
        });
        
        it('should send an empty array if there is an error', function(done){
            //TODO
            assert.fail();
        });
        
        it('should send all tags associated with the question ids', function(done){
            surveyDataServices.addQuestion(fakeQuestion, function(err, savedQuestion){
                surveyDataServices.addQuestion(fakeQuestion2, function(err, savedQuestion2){
                    surveyDataServices.getQuestionsTagsByIds(
                    [savedQuestion._id, 
                    savedQuestion2._id
                    ], function(tags){
                        assert.deepEqual(tags, fakeTags.concat(fakeTags2));
                        done();
                    });
                });
            });
        });
    });
});
