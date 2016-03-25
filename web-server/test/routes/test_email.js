var assert = require('assert');
var request = require('supertest');
var express = require('express');
var nodemailer = require('nodemailer');

var email = require('../../src/routes/email.js');

var app = express()
app.use('/test/email', email);

realCreateTransport = nodemailer.createTransport;
fakeCreateTransport = function(arg){
	return {
		sendMail: function(options, callback){
			callback(null, {response: 200});
		}
	};
};

describe('#routes/email', function(){
	
	describe(' POST /', function(){
		
		it('should send 200 if email was sent', function(done){
			nodemailer.createTransport = fakeCreateTransport;
			request(app)
			.post('/test/email')
			.set(function(req){
				req.body.address = 'address@email.com';
			})
			.expect(200, function(){
				nodemailer.createTransport = realCreateTransport;
				done();
			});
		});
	});
});
