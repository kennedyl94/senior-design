var assert = require('assert');
var request = require('supertest');
var express = require('express');
var userDataServices = require('../../src/userDataServices')

var resetPassword = require('../../src/routes/resetPassword.js');

var nextFunc = function(token){

};

var nextRoute = express.Router();
nextRoute.post('/', function(req, res){
  console.log('here');
});



var app = express();
app.use('/test/resetPassword', resetPassword, nextRoute);

var realCreateResetToken = userDataServices.createResetToken;

describe('#routes/resetPassword', function(){

	describe(' POST /', function(){

    it('should request reset token be added for user in database', function(done){
      //TODO
      assert.fail();
      done();
    });

    it('should pass reset token to next route if a token is added successfuly', function(done){
      //TODO
      assert.fail();
      done();
    });

    it('should pass null to next route if an error occured', function(done){
      //TODO
      assert.fail();
      done();
    });
  });
});
