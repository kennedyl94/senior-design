var assert = require('assert');
var sinon = require('sinon');
var mongoose = require('mongoose');


var config = require('../config');
var realDbName = config.mongo;
var fakeDbName = 'mongodb://localhost/test';
config.mongo = fakeDbName;

var dataServices = require('../src/dataServices');

var fakeOrg = {
	name: 'name',
	description: 'description',
	tags: [
		'tag1',
		'tag2',
		'tag3'
	],
	contact: {
		name: 'name',
		email: 'name@email.com',
		phone: '(123)456-7890'
	}
};


describe('dataServices', function () {
	
	describe('#connect', function () {
		
		beforeEach(function() {
			sinon.spy(mongoose, "connect");
		});
		
		afterEach(function() {
			mongoose.connect.restore();
			dataServices.disconnect();
		});
		
		it('should call mongoose.connect()', function (done) {
			var connection = mongoose.connection;
			connection.once('open', function(){
				assert(mongoose.connect.calledOnce);
				done();
			}); 
			dataServices.connect();
		});
		
		it('should not call mongoose.connect() if connection already open', function (done) {
			var connection = mongoose.connection;
			connection.once('open', function(){
				process.nextTick(function(){
					dataServices.connect();
					assert(mongoose.connect.calledOnce);
					done();
				});
			});
			dataServices.connect();
		});
	});
	
	describe('#disconnect', function(){
		
		beforeEach(function() {
			sinon.spy(mongoose, "disconnect");
		});
		
		afterEach(function() {
			mongoose.disconnect.restore();
		});
		
		it('should call mongoose.disconnect() if connection open', function(done) {
			var connection = mongoose.connection;
			connection.once('open', function(){
				process.nextTick(function(){
					dataServices.disconnect();
				});
			});
			connection.once('disconnected', function(){
				assert(mongoose.disconnect.calledOnce);
				done();
			});
			dataServices.connect();
		});
		
		it('should not call mongoose.disconnect() if connection not open', function(done) {
			dataServices.disconnect();
			process.nextTick(function(){
				assert.equal(mongoose.disconnect.callCount, 0);
				done();
			});
		});
	});
	
	describe('#addStudentOrg', function() {
		
		afterEach(function(){
			dataServices.disconnect();
		});
		
		it('should send error to callback if not connected', function(done) {
			dataServices.disconnect();
			assert.throws(function(){
				dataServices.addStudentOrg(fakeOrg, function(err){
					assert.ifError(err);
				});
			});
			done();
		});
		
		it('should not send error to callback if successful.', function(done){
			var connection = mongoose.connection;
			connection.once('open', function(){
				process.nextTick(function(){
					dataServices.addStudentOrg(fakeOrg, function(err, savedOrg){
						assert.equal(err, null);
						done();
					});
				});
			});
			dataServices.connect();
		});
		
		it('should save new org', function(done) {
			var connection = mongoose.connection;
			connection.once('open', function(){
				process.nextTick(function(){
					dataServices.addStudentOrg(fakeOrg, function(err, savedOrg){
						// I don't know why tags.toObject is needed just to test for deepEquals, but it is. I do know that other values not needed for the org are returned in the savedOrg object though. Mongoose is weird.
						assert.deepEqual({
							name: savedOrg.name,
							description: savedOrg.description,
							tags: savedOrg.tags.toObject(),
							contact: savedOrg.contact
						}, fakeOrg);
						done();
					});
				});
			});
			dataServices.connect();
		});
	});
	
	describe('#getAllOrgs', function() {
		
		after(function(){
			dataServices.disconnect();
		});
		
		it('should throw error if not connected', function(done){
			dataServices.disconnect();
			assert.throws(function(){
				dataServices.getAllOrgs(function(){}, function(err){
					assert.ifError(err);
				});
			});
			done();
		});
		
		//TODO this test currently works depending on the timing of the various components.
		it('should find all documents', function(done){
			var connection = mongoose.connection;
			var fakeOrgs = [
				fakeOrg,
				fakeOrg,
				fakeOrg
			];
			connection.once('open', function(){
				connection.db.dropDatabase();
				process.nextTick(function(){
					fakeOrgs.forEach(function(fakeOrg){
						dataServices.addStudentOrg(fakeOrg, function(err, savedOrg){});
					});
					dataServices.getAllOrgs('name', function(orgs){
						var size = 0;
						for(org in orgs){
							size++;
						};
						assert.equal(size, 3);
						done();
					}, function(){});
				});
			});
			dataServices.connect();
		});
	});
});
