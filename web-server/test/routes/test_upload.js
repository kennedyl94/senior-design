var request = require('supertest');
var express = require('express');
var upload = require('../../src/routes/upload.js');
var orgServices = require('../../src/orgDataServices.js');

var app = express();

var realSaveAllOrgs = orgServices.saveAllOrgs;
var fakeSaveAllOrgs = function(orgs, callback){
	callback(null, orgs);
};

app.use('/api/UploadFile', upload);

describe('#routes/upload', function(){
	
	describe('POST /', function(){
		
		it('should return 200 if the CSV is valid and the orgs were added', function(done){
			orgServices.saveAllOrgs = fakeSaveAllOrgs;
			request(app)
			.post('/api/UploadFile')
			.field('csv', 'the orgCSV')
			.attach('file', './csvTestFile.csv')
			.expect(200, function(){
				orgServices.saveAllOrgs = realSaveAllOrgs;
				done();
			});
		});
		
		it('Should send 422 if the CSV is malformed', function(done){
			//TODO
			assert.fail();
		});
		
		it('should not add to database if CSV is malformed', function(done){
			//TODO
			assert.fail();
		});
		
		it('should send 422 if parts of the CSV are missing', function(done){
			//TODO
			assert.fail();
		});
		
		it('should not add to database if parts of CSV are missing', function(done){
			//TODO
			assert.fail();
		});
		
		it('should send 400 if there is no file included', function(done){
			//TODO
			assert.fail();
		});
	});
});
