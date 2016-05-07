var assert = require('assert');
var request = require('supertest');
var express = require('express');
var bodyParser = require('body-parser');
var userDataServices = require('../../src/userDataServices')

var resetPassword = require('../../src/routes/resetPassword.js');

var fakeToken = "FakeToken";
var fakeUsername = "user";
var fakeEmail = "me@me.me";

var realCreateResetToken = userDataServices.createResetToken;
var fakeCreateResetToken = function(username, email, callback){
  callback(null, fakeToken);
};

var fakeCreateResetToken2 = function(username,email, callback){
  callback(new Error("ERRFAKEERR"), null);
};


var nextFunc = function(token, callback){
  //Placeholder for mock function
  callback();
};

var nextRoute = express.Router();
nextRoute.post('/', function(req, res){
  nextFunc(req.body.token, function(){
    res.send(200);
  });
});



var app = express();
app.use(bodyParser.json());
app.use('/test/resetPassword', resetPassword, nextRoute);

var realCreateResetToken = userDataServices.createResetToken;

describe('#routes/resetPassword', function(){

	describe(' POST /', function(){

    it('should request reset token be added for user in database', function(done){
      var called = false;
      userDataServices.createResetToken = function(username, email, callback){
        called = true;
        callback(null, fakeToken);
      };

      request(app)
			.post('/test/resetPassword')
      .send({
        username: fakeUsername,
        email: fakeEmail
      })
      .expect(200, function(){
        assert(called);
        userDataServices.createResetToken = realCreateResetToken;
        done();
      });
    });

    it('should pass reset token to next route if a token is added successfuly', function(done){
      var pass = true;
      nextFunc = function(token, callback){
        try{
          assert.deepEqual(token, fakeToken);
        }
        catch(err){
          pass = false;
        }
        callback();
      };
      userDataServices.createResetToken = fakeCreateResetToken;

      request(app)
      .post('/test/resetPassword')
      .send({
        username: fakeUsername,
        email: fakeEmail
      })
      .expect(200, function(){
        userDataServices.createResetToken = realCreateResetToken;
        assert(pass);
        done();
      })
    });

    it('should pass null to next route if an error occured', function(done){
      var pass = true;
      nextFunc = function(token, callback){
        try{
          assert.equal(null, fakeToken);
        }
        catch(err){
          pass = false;
        }
        callback();
      };
      userDataServices.createResetToken = fakeCreateResetToken2;

      request(app)
      .post('/test/resetPassword')
      .send({
        username: fakeUsername,
        email: fakeEmail
      })
      .expect(200, function(){
        userDataServices.createResetToken = realCreateResetToken;
        assert(pass);
        done();
      })
    })
  });
});
