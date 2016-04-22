var assert = require('assert');
var request = require('supertest');
var express = require('express');

var surveySettings = require('../../src/routes/surveySettings.js');

var app = express()
app.use('/test/surveySettings', surveySettings);

describe('#routes/surveySettings', function(){
	
	describe('GET /', function(){
		
		it('should request all questions from database', function(done){
			//TODO
			assert.fail();
			done();
		});
		
		it('should send all questions found in database', function(done){
			//TODO
			assert.fail();
			done();			
		});
	});
	
	describe('GET /num', function(){
		
		it('should send the number of questions to be included in a survey', function(done){
			//TODO
			assert.fail();
			done();			
		});
	});
	
	describe('DELETE /', function(){
		
		it('should request the question be removed from the database', function(done){
			//TODO
			assert.fail();
			done();			
		});
	});
	
	describe('POST /add', function(){
		
		it('should request the question be added to the database', function(done){
			//TODO
			assert.fail();
			done();			
		});
	});
	
	describe('POST /questionNum', function(){
		
		it('should set the number of questions to be included in a survey', function(done){
			//TODO
			assert.fail();
			done();		
		});
	});
	
	describe('POST /addrule', function(){
		
		it('should add the rule to the current rules', function(done){
			//TODO
			assert.fail();
			done();			
		});
	});
});
