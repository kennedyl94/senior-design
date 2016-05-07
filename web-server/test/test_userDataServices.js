var assert = require('assert');
var config = require('../config');
var crypto = require('crypto');
var realDbName = config.mongo;
var fakeDbName = 'mongodb://localhost/test';
config.mongo = fakeDbName;

var userDataServices = require('../src/userDataServices');
var database = require('../src/databaseServices');

var fakeToken = "FakeToken";

var realRandomBytes = crypto.randomBytes;
var fakeRandomBytes = function(bytes, callback){
  callback(null, fakeToken);
};
var fakeRandomBytes2 = function(bytes, callback){
  callback(new Error("ERRFAKEERR"), null);
};

var fakeUsername = "username";
var invalidUsername = "invalid";
var fakeEmail = "me@me.me";

describe('userDataServices', function () {

  describe('#createResetToken', function() {

    it('should find user if username and email is valid', function(done){
      userDataServices.createResetToken(fakeUsername, fakeEmail, function(err, resetToken){
        assert.equal(err, null);
        done();
      });
    });

    it('should send error if username and email is invalid', function(done){
      userDataServices.createResetToken(invalidUsername, fakeEmail, function(err, resetToken){
        assert.notEqual(err, null);
        done();
      });
    });

    it('should send new reset token if valid user is found', function(done){
      crypto.randomBytes = fakeRandomBytes;
      userDataServices.createResetToken(fakeUsername, fakeEmail, function(err, resetToken){
        crypto.randomBytes = realRandomBytes;
        assert.equal(resetToken, fakeToken);
        done();
      });
    });
  });
});
