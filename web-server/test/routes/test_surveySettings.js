var assert = require('assert');
var request = require('supertest');
var express = require('express');

var tagSearch = require('../../src/routes/surveySettings.js');

var app = express()
app.use('/test/surveySettings', surveySettings);

describe('#routes/email', function(){
	
	describe('GET /', function(){
		
		it('should request all questions from database', function(done){
			
		});
		
		it('should send all questions found in database', function(done){
			
		});
	});
	
	describe('GET /num', function(){
		
		it('should send the number of questions to be included in a survey');
	});
	
	describe('DELETE /', function(){
		
		it('should request the question be removed from the database', function(done){
			
		});
	});
	
	describe('POST /add', function(){
		
		it('should request the question be added to the database', function(done){
			
		});
	});
	
	describe('POST /questionNum', function(){
		
		it('should set the number of questions to be included in a survey', function(done){
		
		});
	});
	
	describe('POST /addrule', function(){
		
		it('should add the rule to the current rules', function(done){
			
		});
	});
});
