var database;

var assert = require('assert');
var sinon = require('sinon');
var mongoose = require('mongoose');

sinon.spy(mongoose, 'connect');

var fakeSchema = {
    "name": "string",
    "description": "string"
};

var fakeName = "name";

describe('databaseServices', function () {
    
    it('should connect to mongo when first required', function(done){
        process.nextTick(function(){
            database = require('../src/databaseServices');
            assert(mongoose.connect.calledOnce);
            mongoose.connect.restore();
            done();
        });
    });
    
    describe('#createModel', function() {
        
        it('should add the created model to collection of models', function(done){
            database.createModel(fakeName, fakeSchema);
            database.getModel(fakeName, function(err, model){
				database.removeModel(fakeName);
				assert.equal(model.modelName, fakeName);
				done();
			});
        });
    });
    
    describe('#getModel', function() {
		
		it('should send an error if the model does not exist', function(done){
			database.getModel(fakeName, function(err, model){
				assert.notEqual(null, err);
				done();
			});
		});
	});
});
