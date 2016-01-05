var express = require('express')
  , router = express.Router();
  
var csvParse = require('csv-parse');

var _dataServices = require('../orgDataServices');

var fs = require('fs');

var csvParser = csvParse({rowDelimiter: '\n'});

var body = '';

router.post('/', function(req, res){	
	req.on('data', function(chunk){
		body += chunk;
	});
	req.on('end', function(){
		csvParser.write(body.substring(body.indexOf('text/csv') + 12, body.lastIndexOf('-----------------------------') -2));
		res.send(200);
	});
});

var i = 0;

csvParser.on('readable', function(){
	var orgNameIndex = -1;
	var descriptionIndex = -1;
	var contactFirstNameIndex = -1;
	var contactLastNameIndex = -1;
	var emailIndex = -1;
	var phoneIndex = -1;
	
	while(record = csvParser.read()){
		fs.appendFile('/home/paul/Desktop/2014-2015 Registered Student Orgs.txt', i++ + ': ' + record + '\n\n\n', function(){});
		var entries = record.toString().split(',');
		if(orgNameIndex < 0){
			orgNameIndex = entries.indexOf('Organization Name');
			descriptionIndex = entries.indexOf('Organization Description');
			contactFirstNameIndex = entries.indexOf('President\'s Name (First)');
			contactLastNameIndex = entries.indexOf('President\'s Name (Last)');
			emailIndex = entries.indexOf('President\'s MSOE Email');
			phoneIndex = entries.indexOf('President\'s Phone Number');
		}
		else{
			var newOrg = {
				name: entries[orgNameIndex],
				description: entries[descriptionIndex],
				tags: [],
				active: true,
				contact: {
					name: entries[contactFirstNameIndex] + ' ' + entries[contactLastNameIndex],
					email: entries[emailIndex],
					phone: entries[phoneIndex]
				}
			}
			
			console.log(newOrg);
		}
	}
});

module.exports = router;
