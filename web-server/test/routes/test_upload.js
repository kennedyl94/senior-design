var assert = require('assert');
var request = require('supertest');
var express = require('express');
var upload = require('../../src/routes/upload.js');
var orgServices = require('../../src/orgDataServices.js');

var app = express();

var realSaveAllOrgs = orgServices.saveAllOrgs;
var fakeSaveAllOrgs = function(orgs, callback){
	callback(null, orgs);
};
var fakeSaveAllOrgs2 = function(orgs, callback){
	assert.fail();
	callback(new Error('FAKEERR'), null);
};
var fakeSaveAllOrgs3 = function(orgs, callback){
	assert.equal(orgs.length, 1);
	assert.equal(orgs[0].name, 'Organization2');
	callback(null, orgs);
};

app.use('/api/UploadFile', upload);

describe('#routes/upload', function(){
	
	describe('POST /', function(){
		
		afterEach(function(){
			orgServices.saveAllOrgs = realSaveAllOrgs;
		});
		
		it('should return 200 if at least one org was added', function(done){
			orgServices.saveAllOrgs = fakeSaveAllOrgs;
			request(app)
			.post('/api/UploadFile')
			.field('csv', 'the orgCSV')
			.attach('file', './csvTestFile.csv')
			.expect(200, done);
		});
		
		it('should not add to database if CSV is malformed', function(done){
			orgServices.saveAllOrgs = fakeSaveAllOrgs2;
			request(app)
			.post('/api/UploadFile')
			.field('csv', 'the orgCSV')
			.attach('file', './csvTestFileMalformed.csv')
			.expect(422, done);
		});
		
		it('should not add org to database if parts of the org are missing', function(done){
			orgServices.saveAllOrgs = fakeSaveAllOrgs3;
			request(app)
			.post('/api/UploadFile')
			.field('csv', 'the orgCSV')
			.attach('file', './csvTestFileMissing.csv')
			.expect(200, done);
		});
		
		it('Should send 422 if no orgs were added', function(done){
			orgServices.saveAllOrgs = fakeSaveAllOrgs2;
			request(app)
			.post('/api/UploadFile')
			.field('csv', 'the orgCSV')
			.attach('file', './csvTestFileMalformed.csv')
			.expect(422, done);
		});
		
		it('Should update orgs that already exist in database', function(done){
			//TODO
			assert.fail();
		});
	});
});
