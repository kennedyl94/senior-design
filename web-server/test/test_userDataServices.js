var assert = require('assert');
var mongoose = require('mongoose');
var config = require('../config');
var crypto = require('crypto');
var realDbName = config.mongo;
var fakeDbName = 'mongodb://localhost/test';
config.mongo = fakeDbName;

var userDataServices = require('../src/userDataServices');
var database = require('../src/databaseServices');

var fakeErr = 'ERRFAKEERR';
var fakeFindOne = function(query, callback){
  callback(fakeErr, null);
};
var fakeFindOneAndUpdate = function(qurey, select, options, callback){
  callback(fakeErr, null);
};

var fakeToken = "FakeToken";

var realRandomBytes = crypto.randomBytes;
var fakeRandomBytes = function(bytes){
  return fakeToken;
};

var fakeUsername = "username";
var fakePassword = "password";
var invalidUsername = "invalid";
var fakeEmail = "me@me.me";

var fakeUser = {
  Username: fakeUsername,
  Email: fakeEmail
};

describe('userDataServices', function () {

  afterEach(function(){
    var connection = mongoose.connection;
    connection.db.dropDatabase();
  });

  describe('#addUser', function() {

    it('should return error if a user with the same username was already found', function(done){
      userDataServices.addUser(fakeUser, function(err, savedUser){
        assert.equal(null, err);
          userDataServices.addUser(fakeUser, function(err2, savedUser2){
            assert.notEqual(null, err2);
            done();
        });
      });
    });
  });

  describe('#createResetToken', function() {

    it('should find user if username and email is valid', function(done){
      userDataServices.addUser(fakeUser, function(err, savedUser){
        userDataServices.createResetToken(fakeUsername, fakeEmail, function(err, resetToken){
          assert.equal(err, null);
          done();
        });
      });
    });

    it('should send error if username and email is invalid', function(done){
      userDataServices.createResetToken(fakeUsername, fakeEmail, function(err, resetToken){
        assert.notEqual(err, null);
        done();
      });
    });

    it('should send new reset token if valid user is found', function(done){
      crypto.randomBytes = fakeRandomBytes;
      userDataServices.addUser(fakeUser, function(err, savedUser){
        userDataServices.createResetToken(fakeUsername, fakeEmail, function(err, resetToken){
          crypto.randomBytes = realRandomBytes;
          assert.equal(resetToken, fakeToken);
          done();
        });
      });
    });
  });

  describe('#checkValidToken', function(){

    it('should return true if the token is found in the database', function(done){
      userDataServices.addUser(fakeUser, function(err, savedUser){
        userDataServices.createResetToken(fakeUsername, fakeEmail, function(err, token){
          userDataServices.checkValidToken(token, function(err, found){
            assert(found);
            done();
          });
        });
      });
    });

    it('should return false if the token is not found in the database', function(done){
      userDataServices.checkValidToken(fakeToken, function(err, found){
        assert(!found);
        done();
      });
    });

    it('should send error if there is an error checking the token', function(done){
      database.getModel('users', function(err, model){
        var realFindOne = model.findOne;
        model.findOne = fakeFindOne;
        userDataServices.checkValidToken(fakeToken, function(err, found){
          assert.equal(err, fakeErr);
          model.findOne = realFindOne;
          done();
        });
      });
    });
  });

  describe('#setPasswordByToken', function(){

    it('should set the password for the user if token exists', function(done){
      userDataServices.addUser(fakeUser, function(err, savedUser){
        userDataServices.createResetToken(fakeUsername, fakeEmail, function(err, token){
          userDataServices.setPasswordByToken(token, fakePassword, function(err, savedUser){
            assert.equal(savedUser.Password, fakePassword);
            done();
          });
        });
      });
    });

    it('should send error to callback if there was a problem setting the password', function(done){
      database.getModel('users', function(err, model){
        var realFindOneAndUpdate = model.findOneAndUpdate;
        model.findOneAndUpdate = fakeFindOneAndUpdate;
        userDataServices.setPasswordByToken(fakeToken, fakePassword, function(err, savedUser){
          assert.notEqual(err, null);
          model.findOneAndUpdate = realFindOneAndUpdate;
          done();
        });
      });
    });

    it('should invalidate reset token when pasword reset is successful', function(done){
      userDataServices.addUser(fakeUser, function(err, savedUser){
        userDataServices.createResetToken(fakeUsername, fakeEmail, function(err, token){
          userDataServices.setPasswordByToken(token, fakePassword, function(err, savedUser){
            userDataServices.checkValidToken(token, function(err, found){
              assert(!found);
              done();
            });
          });
        });
      });
    });
  });
});
