var assert = require('assert');
var request = require('supertest');
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');

var login = require('../../src/routes/login.js');

var app = express();
app.use(bodyParser.json());
app.use('/test/login', login);

var fakeUserType = 'Admin';

var realAuthenticate = passport.authenticate;

var fakeAuthenticate = function(name, options, callback){
    return function(req, res){
        callback(null, {
            Type: fakeUserType
        });
    };
};

var fakeAuthenticate2 = function(name, options, callback){
    return function(req, res){
        callback(null, false);
    };
};

describe('#routes/login', function(){
    
    describe('POST /', function(){
        
        it('should send 200 and current user type if correct credentials are used', function(done){

            passport.authenticate = fakeAuthenticate;
            
            request(app)
            .post('/test/login')
            .send({
                username: 'user',
                password: 'password'
            })
            .expect({type: fakeUserType}, 200, function(){
                passport.authenticate = realAuthenticate;
                done();
            });
        });
        
        it('should send 401 if incorrect credentials are used', function(done){

            passport.authenticate = fakeAuthenticate2;

            request(app)
            .post('/test/login')
            .send({
                username: 'user',
                password: 'password'
            })
            .expect(401, function(){
                passport.authenticate = realAuthenticate;
                done();
            });
        });
    });
});


