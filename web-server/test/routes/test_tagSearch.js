var assert = require('assert');
var request = require('supertest');
var express = require('express');
var orgDataServices = require('../../src/orgDataServices');

var tagSearch = require('../../src/routes/tagSearch');


var fakeTags = [
	'tag1',
	'tag2',
	'tag3',
	'tag4'
];

var realGetAllTags = orgDataServices.getAllTags;

var fakeGetAllTags = function(success, error){
	success(fakeTags);
};

var fakeOrgs = [
	{
		name: 'name',
		description: 'description'
	}
];

var realSearchByTags = orgDataServices.searchByTags;

var fakeSearchByTags = function(tags, success, error){
	success(fakeOrgs);
};

var app = express()
app.use('/test/tagSearch', tagSearch);

describe('#routes/tagSearch', function(){
	
	describe('GET /', function(){
	
		it('should request all tags in use by active orgs from the database', function(done){
			var called = false;
			orgDataServices.getAllTags = function(success, error){
				called = true;
				success([]);
			}
			
			request(app)
			.get('/test/tagSearch')
			.expect({},function(){
					assert(called);
					orgDataServices.getAllTags = realGetAllTags;
					done();
				}
			);
		});
		
		it('should send all tags found', function(done) {
			orgDataServices.getAllTags = fakeGetAllTags;
			
			request(app)
			.get('/test/tagSearch')
			.expect({
					tags: fakeTags
				}, function(){
					orgDataServices.getAllTags = realGetAllTags;
					done();
				}
			);
		});
	});
	
	describe('POST /', function(){
		
		it('should request a list of active orgs that use the selected tags from the database', function(done){
			var called = false;
			orgDataServices.searchByTags = function(tags, success, error){
				called = true;
				console.log('hi');
				success([]);
			}
			
			request(app)
			.post('/test/tagSearch')
			.set('Content-Type', 'json')
			.send(JSON.stringify({tags: fakeTags}))
			.expect({}, function(){
					assert(called);
					orgDataServices.searchByTags = realSearchByTags;
					done();
				}
			);
		});
		
		it('should send all orgs found', function(done){
			orgDataServices.searchByTags = fakeSearchByTags;
			
			request(app)
			.post('/test/tagSearch')
			.expect({
					orgs: fakeOrgs
				}, function(){
					orgDataServices.searchByTags = realSearchByTags;
					done();
				}
			);
		});
	});
});
