var assert = require('assert');
var request = require('supertest');
var express = require('express');

var logout = require('../../src/routes/logout.js');

var app = express();
app.use('/test/logout', logout);

describe('#routes/logout', function(){
    
    describe('GET /', function(){
        
        it('should call logout from request', function(done){
            var called = false;
            logout = function(){
                called = true;
            };

            var req = request(app)
            .get('/test/logout');
            req.use(logout);
            req.expect({},function(){
                assert(called);
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

