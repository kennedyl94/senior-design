var assert = require('assert');
var config = require('../config');
var realDbName = config.mongo;
var fakeDbName = 'mongodb://localhost/test';
config.mongo = fakeDbName;

var userDataServices = require('../src/userDataServices');
var database = require('../src/databaseServices');

describe('userDataServices', function () {

    describe('#createResetToken', function() {

      it('should find user with given username and password', function(done){
        //TODO
        assert.fail();
        done();
      });

      it('should add new reset token with expiration date if user is found', function(done){
        //TODO
        assert.fail();
        done();
      });

      it('should send error if user was not found', function(done){
        //TODO
        assert.fail();
        done();
      });
    });
});
