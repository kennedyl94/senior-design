var assert = require('assert');
var request = require('supertest');
var express = require('express');
var passport = require('passport');

var logout = require('../../src/routes/logout.js');

var app = express();
app.use('/test/logout', logout);

var realLogout = passport.logout;

describe('#routes/logout', function(){
    
    describe('GET /', function(){
        
        it('should call passport.logout', function(done){
            var called = false;
            passport.logout = function(){
                called = true;
            };

            request(app)
            .get('/test/logout')
            .expect({},function(){
                assert(called);
                passport.authenticate = realAuthenticate;
                done();
            });
        });
        
        it('should send send 200 after logging out', function(done){
            request(app)
            .get('/test/logout')
            .expect(200, done);
        });
    });
});

