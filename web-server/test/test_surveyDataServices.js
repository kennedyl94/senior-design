var assert = require('assert');
var sinon = require('sinon');
var mongoose = require('mongoose');
var async = require('async');


var config = require('../config');
var realDbName = config.mongo;
var fakeDbName = 'mongodb://localhost/test';
config.mongo = fakeDbName;

var surveyDataServices = require('../src/surveyDataServices');

var fakeQuestion = {
	question: "Do you like baseball?",
	tags: [
		"athletic",
		"outdoors",
		"team"
	],
	category"athletics"
};

describe('surveyDataServices', function () {
	
	describe('#connect', function () {
		
		beforeEach(function() {
			sinon.spy(mongoose, "connect");
		});
		
		afterEach(function() {
			mongoose.connect.restore();
			surveyDataServices.disconnect();
		});
		
	it('should call mongoose.connect()', function (done) {
			var connection = mongoose.connection;
			connection.once('open', function(){
				assert(mongoose.connect.calledOnce);
				done();
			}); 
			surveyDataServices.connect();
		});
		
		it('should not call mongoose.connect() if connection already open', function (done) {
			var connection = mongoose.connection;
			connection.once('open', function(){
				process.nextTick(function(){
					surveyDataServices.connect();
					assert(mongoose.connect.calledOnce);
					done();
				});
			});
			surveyDataServices.connect();
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
					surveyDataServices.disconnect();
				});
			});
			connection.once('disconnected', function(){
				assert(mongoose.disconnect.calledOnce);
				done();
			});
			surveyDataServices.connect();
		});
		
		it('should not call mongoose.disconnect() if connection not open', function(done) {
			surveyDataServices.disconnect();
			process.nextTick(function(){
				assert.equal(mongoose.disconnect.callCount, 0);
				done();
			});
		});
	});
	
	describe('#addQuestion', function() {
	
		afterEach(function(){
			surveyDataServices.disconnect();
		});
		
		it('should send error to callback if not connected', function(done) {
			surveyDataServices.disconnect();
			assert.throws(function(){
				surveyDataServices.addQuestion(fakeQuestion, function(err){
					assert.notEqual(null, err);
				});
			});
			done();
		});
		
		it('should not send error to callback if successful.', function(done){
			var connection = mongoose.connection;
			connection.once('open', function(){
				process.nextTick(function(){
					surveyDataServices.addQuestion(fakeQuestion function(err, savedQuestion){
						assert.equal(err, null);
						done();
					});
				});
			});
			surveyDataServices.connect();
		});
		
		it('should save new question', function(done) {
			var connection = mongoose.connection;
			connection.once('open', function(){
				process.nextTick(function(){
					surveyDataServices.addQuestion(fakeQuestion, function(err, savedQuestion){
						assert.deepEqual({
							question: SavedQuestion.question,
							tags: savedQuestion.tags.toObject(),
							category: savedQuestion.Category
						}, fakeQuestion);
						done();
					});
				});
			});
			surveyDataServices.connect();
		});
	});
	
	describe('#getAllQuestions', function() {
		
		after(function(){
			surveyDataServices.disconnect();
		});
		
		it('should throw error if not connected', function(done){
			surveyDataServices.disconnect();
			assert.throws(function(){
				surveyDataServices.getAllQuestions(function(){}, function(err){
					assert.notEqual(null, err);
				});
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
								surveyDataServices.addQuestion(fakeQuestion, function(err, savedQuestion){
									console.log(err);
									callback();
								});
							},
							function(callback){
								surveyDataServices.addQuestion(fakeQuestion, function(err, savedQuestion){
									console.log(err);
									callback();
								});
							},
							function(callback){
								surveyDataServices.addQuestion(fakeQuestion, function(err, savedQuestion){
									console.log(err);
									callback();
								});
							}],
							function(){							
								surveyDataServices.getAllQuestions('name', function(questions){
									var size = 0;
									for( question in questions){
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
			surveyDataServices.connect();
		});
	});
});
