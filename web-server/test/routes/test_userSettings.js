var assert = require('assert');
var request = require('supertest');
var express = require('express');

var userSettings = require('../../src/routes/userSettings.js');

var app = express()
app.use('/test/userSettings', userSettings);

describe('#routes/userSettings', function(){
	
	describe('GET /', function(){
		
		it('should request all users from database', function(done){
			//TODO
			assert.fail();
			done();			
		});
		
		it('should send all users found in database', function(done){
			//TODO
			assert.fail();
			done();			
		});
	});
	
	describe('DELETE /delete', function(){
		
		it('should request the user be removed from the database', function(done){
			//TODO
			assert.fail();
			done();			
		});
		
		it('should send 200 if the user is successfuly removed', function(done){
			//TODO
			assert.fail();
			done();			
		});
	});
	
	describe('PUT /addNew', function(){
		
		it('should create a hash of the password', function(done){
			//TODO
			assert.fail();
			done();			
		});
		
		it('should request the user be added to the database', function(done){
			//TODO
			assert.fail();
			done();			
		});
		
		it('should send 200 if the user is successfuly added', function(done){
			//TODO
			assert.fail();
			done();			
		});
	});
	
	describe('PUT /editExisting', function(){
		
		it('should request the user be updated in the database', function(done){
			//TODO
			assert.fail();
			done();			
		});
		
		it('should send 200 once the user is updated', function(done){
			//TODO
			assert.fail();
			done();			
		});
	});
});

