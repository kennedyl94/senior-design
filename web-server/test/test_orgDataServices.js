var assert = require('assert');
var sinon = require('sinon');
var mongoose = require('mongoose');
var async = require('async');


var config = require('../config');
var realDbName = config.mongo;
var fakeDbName = 'mongodb://localhost/test';
config.mongo = fakeDbName;

var orgDataServices = require('../src/orgDataServices');

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


describe('orgDataServices', function () {
	
	describe('#connect', function () {
		
		beforeEach(function() {
			sinon.spy(mongoose, "connect");
		});
		
		afterEach(function() {
			mongoose.connect.restore();
			orgDataServices.disconnect();
		});
		
		it('should call mongoose.connect()', function (done) {
			var connection = mongoose.connection;
			connection.once('open', function(){
				assert(mongoose.connect.calledOnce);
				done();
			}); 
			orgDataServices.connect();
		});
		
		it('should not call mongoose.connect() if connection already open', function (done) {
			var connection = mongoose.connection;
			connection.once('open', function(){
				process.nextTick(function(){
					orgDataServices.connect();
					assert(mongoose.connect.calledOnce);
					done();
				});
			});
			orgDataServices.connect();
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
					orgDataServices.disconnect();
				});
			});
			connection.once('disconnected', function(){
				assert(mongoose.disconnect.calledOnce);
				done();
			});
			orgDataServices.connect();
		});
		
		it('should not call mongoose.disconnect() if connection not open', function(done) {
			orgDataServices.disconnect();
			process.nextTick(function(){
				assert.equal(mongoose.disconnect.callCount, 0);
				done();
			});
		});
	});
	
	describe('#addStudentOrg', function() {
		
		afterEach(function(){
			orgDataServices.disconnect();
		});
		
		it('should send error to callback if not connected', function(done) {
			orgDataServices.disconnect();
			orgDataServices.addStudentOrg(fakeOrg, function(err){
				assert.notEqual(null, err);
			});
			done();
		});
		
		it('should not send error to callback if successful.', function(done){
			var connection = mongoose.connection;
			connection.once('open', function(){
				process.nextTick(function(){
					orgDataServices.addStudentOrg(fakeOrg, function(err, savedOrg){
						assert.equal(err, null);
						done();
					});
				});
			});
			orgDataServices.connect();
		});
		
		it('should save new org', function(done) {
			var connection = mongoose.connection;
			connection.once('open', function(){
				process.nextTick(function(){
					orgDataServices.addStudentOrg(fakeOrg, function(err, savedOrg){
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
			orgDataServices.connect();
		});
	});
	
	describe('#getAllOrgs', function() {
		
		after(function(){
			orgDataServices.disconnect();
		});
		
		it('should send error to callback if not connected', function(done){
			orgDataServices.disconnect();
			orgDataServices.getAllOrgs("name", function(){}, function(err){
				assert.notEqual(null, err);
			});
			done();
		});
		
		it('should find all documents', function(done){
			var connection = mongoose.connection;

			connection.once('open', function(){
				process.nextTick(function(){
					connection.db.dropDatabase();
					process.nextTick(function(){
						async.parallel([
							function(callback){
								orgDataServices.addStudentOrg(fakeOrg, function(err, savedOrg){
									console.log(err);
									callback();
								});
							},
							function(callback){
								orgDataServices.addStudentOrg(fakeOrg, function(err, savedOrg){
									console.log(err);
									callback();
								});
							},
							function(callback){
								orgDataServices.addStudentOrg(fakeOrg, function(err, savedOrg){
									console.log(err);
									callback();
								});
							}],
							function(){							
								orgDataServices.getAllOrgs('name', function(orgs){
									var size = 0;
									for( org in orgs){
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
			orgDataServices.connect();
		});
	});
});
