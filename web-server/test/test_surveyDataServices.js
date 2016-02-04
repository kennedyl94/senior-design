var assert = require('assert');
var sinon = require('sinon');
var mongoose = require('mongoose');
var async = require('async');


var config = require('../config');
var realDbName = config.mongo;
var fakeDbName = 'mongodb://localhost/test';
config.mongo = fakeDbName;

var surveyDataServices = require('../src/surveyDataServices');

var fakeQuestion = {
    question: "Do you like baseball?",
    tags: [
        "athletic",
        "outdoors",
        "team"
    ],
    category: "athletics"
};

describe('surveyDataServices', function () {
 
    describe('#addQuestion', function() {
   
        it('should not send error to callback if successful.', function(done){
            var connection = mongoose.connection;
            surveyDataServices.addQuestion(fakeQuestion, function(err, savedQuestion){
                assert.equal(err, null);
                done();
            });
        });
        
        it('should save new question', function(done) {
            var connection = mongoose.connection;
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
       
        it('should send null question if id does not exist', function(done){
            var connection = mongoose.connection;
            connection.db.dropDatabase();
            surveyDataServices.addQuestion(fakeQuestion, function(err, savedQuestion){
                surveyDataServices.getQuestionById('', function(err, question){
                    assert.equal(question, null);                           
                    done();
                });
            });
        });
        
        it('should send question if id does exist', function(done){
            var connection = mongoose.connection;
            connection.db.dropDatabase();
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
        
        it('should find all documents', function(done){
            var connection = mongoose.connection;
            connection.db.dropDatabase();
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
});
