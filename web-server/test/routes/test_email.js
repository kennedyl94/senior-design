var assert = require('assert');
var request = require('supertest');
var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');


var email = require('../../src/routes/email.js');

var app = express();
app.use(bodyParser.json());
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
			var req = request(app)
			.post('/test/email')
			.send({
				address: 'address@email.com',
				result: []
				})
			.expect(200, function(){
				nodemailer.createTransport = realCreateTransport;
				done();
			});
			console.log(req.body);
		});
	});
});
