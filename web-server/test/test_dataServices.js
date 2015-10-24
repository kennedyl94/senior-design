var assert = require('assert');
var mongoose = require('mongoose');
var dataServices = require('../src/dataServices');

describe('dataServices', function () {
	
	describe('#connect', function () {

        it('should call mongoose.connection()', function (done) {
			assert.fail();
			done();
		});
		
		it('should call callback once connection open', function (done) {
			assert.fail();
			done();
		});
		
		it('should not call mongoose.connection() if connection already open', function (done) {
			assert.fail();
			done();
		});
	});
	
	describe('#disconnect', function(){
		
		it('should call mongoose.disconnect() if connection open', function(done) {
			assert.fail();
			done();
		});
		
		it('should not call mongoose.disconnect() if connection not open', function(done) {
			asset.fail();
			done();
		});
	});
	
	describe('#addStudentOrg', function() {
		
		it('should throw error if not connected', function(done) {
			assert.fail();
			done();
		});
		
		it('should save new org', function(done) {
			assert.fail();
			done();
		});
		
		it('should send any error to callback', function(done) {
			assert.fail();
			done();
		});
	});
	
	describe('#getAllOrgs', function() {
		
		it('should throw error if not connected', function(done){
			assert.fail();
			done();
		});
		
		it('should find all documents', function(done){
			assert.fail();
			done();
		});
		
		it('should send any error to callback', function(done){
			assert.fail();
			done();
		});
	});
});
