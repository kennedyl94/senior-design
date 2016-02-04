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
            require('../src/databaseServices');
            assert(mongoose.connect.calledOnce);
            mongoose.connect.restore();
            done();
        });
    });
    
    describe('#createModel', function() {
        
        it('should return the created model', function(done){
            var database = require('../src/databaseServices');
            var model = database.createModel(fakeName, fakeSchema);
            assert.equal(model.modelName, fakeName);
            done();
        });
    });
});
