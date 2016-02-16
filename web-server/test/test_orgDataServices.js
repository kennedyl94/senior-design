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

var invalidOrg = {
	name: 'name',
	description: undefined,
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

var fakeOrgs = [
	fakeOrg,
	fakeOrg,
	fakeOrg
];

var invalidOrgs = [
	fakeOrg,
	invalidOrg,
	fakeOrg
];

describe('orgDataServices', function () {
	
	describe('#addStudentOrg', function() {
		
		it('should not send error to callback if successful.', function(done){
			var connection = mongoose.connection;
			orgDataServices.addStudentOrg(fakeOrg, function(err, savedOrg){
				assert.equal(err, null);
				done();
			});
		});
		
		it('should save new org', function(done) {
			var connection = mongoose.connection;
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
	
	describe('#getAllOrgs', function() {
		
		it('should find all documents', function(done){
			var connection = mongoose.connection;
			connection.db.dropDatabase();
			async.parallel([
				function(callback){
					orgDataServices.addStudentOrg(fakeOrg, function(err, savedOrg){
						callback();
					});
				},
				function(callback){
					orgDataServices.addStudentOrg(fakeOrg, function(err, savedOrg){
						callback();
					});
				},
				function(callback){
					orgDataServices.addStudentOrg(fakeOrg, function(err, savedOrg){
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
	
	describe('#saveAllOrgs', function(){
		
		//TODO add an after each function to clear the database
		it('should return error if entries are malformed', function(done){
			var connection = mongoose.connection;
			orgDataServices.saveAllOrgs(invalidOrgs, function(err, orgs){
				if(err){
					done();
				}
			});
			process.nextTick(function(){
				assert.fail();
			});
		});
		
		it('should return all orgs if they were successfuly saved', function(done){
			orgDataServices.saveAllOrgs(fakeOrgs, function(err, orgs){
				if(orgs.length == fakeOrgs.length){
					done();
				}
				else{
					assert.fail();
				}
			});
		});
	});
});
