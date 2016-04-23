var assert = require('assert');
var request = require('supertest');
var express = require('express');
var bodyParser = require('body-parser');
var surveyDataServices = require('../../src/surveyDataServices.js');
var jsonfile = require('jsonfile');

var surveySettings = require('../../src/routes/surveySettings.js');

var app = express()
app.use(bodyParser.json());
app.use('/test/surveySettings', surveySettings);


var fakeQuestion = {
    question: 'Do you like cards?'
};

var fakeQuestion2 = {
    question: 'Do you like having fun?'
};

var fakeQuestions = [
    fakeQuestion,
    fakeQuestion2
];

var realGetAllQuestions = surveyDataServices.getAllQuestions

var fakeGetAllQuestions = function(sort, callback){
    callback(fakeQuestions);
};


var realDeletequestion = surveyDataServices.deletequestion;


var realAddQuestion = surveyDataServices.addQuestion;


var fakeSurveySet = {
    num: 2
};

var fakeSurveySet2 = {
    num: 5
};

var realReadFileSync = jsonfile.readFileSync;

var fakeReadFileSync = function(file) {
    return fakeSurveySet;
};

var realWriteFileSync = jsonfile.writeFileSync;

describe('#routes/surveySettings', function(){
    
    describe('GET /', function(){
        
        it('should request all questions from database', function(done){
            var called = false;
            surveyDataServices.getAllQuestions = function(sort, callback){
                called = true;
                callback({});
            };

            request(app)
            .get('/test/surveySettings')
            .expect({}, function(){
                assert(called);
                surveyDataServices.getAllQuestions = realGetAllQuestions;
                done();
            });
        });
        
        it('should send all questions found in database', function(done){
            surveyDataServices.getAllQuestions = fakeGetAllQuestions;
            request(app)
            .get('/test/surveySettings')
            .expect({}, function(req, res){
                assert.deepEqual(res.body, fakeQuestions);
                surveyDataServices.getAllQuestions = realGetAllQuestions;
                done();
            });  
        });
    });
    
    describe('GET /num', function(){
        
        it('should send the number of questions to be included in a survey', function(done){
            jsonfile.readFileSync = fakeReadFileSync;
            request(app)
            .get('/test/surveySettings/num')
            .expect({}, function(req, res){
                assert.equal(res.body.num, fakeSurveySet.num);
                jsonfile.readFileSync = realReadFileSync;
                done();
            });
        });
    });
    
    describe('DELETE /', function(){
        
        it('should request the question be removed from the database', function(done){
            var called = false;
            surveyDataServices.deletequestion = function(questionID, success, error){
                assert.deepEqual(questionID, {_id: 5});
                called = true;
                success();
            };

            request(app)
            .del('/test/surveySettings')
            .send({_id: 5})
            .expect({}, function(){
                assert(called);
                surveyDataServices.deletequestion = realDeletequestion;
                done();
            });         
        });
    });
    
    describe('POST /add', function(){
        
        it('should request the question be added to the database', function(done){
            var called = false;
            surveyDataServices.addQuestion = function(question, success, error){
                assert.equal(question._id, 5);
                called = true;
                success();
            };

            request(app)
            .post('/test/surveySettings/add')
            .send({
                _id: 5,
                tags: 'tag1, tag2, tag3, tag4, tag5'
                })
            .expect({}, function(){
                assert(called);
                surveyDataServices.addquestion = realAddQuestion;
                done();
            });          
        });
    });
    
    describe('POST /questionNum', function(){
        
        it('should set the number of questions to be included in a survey', function(done){
            var called = false;
            jsonfile.writeFileSync = function(file, content){
                assert.deepEqual(content, fakeSurveySet2);
                called = true;
            };
            jsonfile.readFileSync = fakeReadFileSync;
            request(app)
            .post('/test/surveySettings/questionNum')
            .send({num: 5})
            .expect({}, function(){
                assert(called);
                jsonfile.writeFileSync = realWriteFileSync;
                jsonfile.readFileSync = realReadFileSync;
                done(); 
            });    
        });
    });
});
