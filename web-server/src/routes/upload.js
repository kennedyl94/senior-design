var express = require('express')
  , router = express.Router();

var multer = require('multer');
var csvParse = require('csv-parse');

var _dataServices = require('../orgDataServices');

var fs = require('fs');

var body = '';

var uploader = multer({storage: multer.memoryStorage()});

router.post('/', uploader.single('file'), function(req, res){
	console.log(req.file.buffer.toString());    
	csvParse(req.file.buffer.toString(), function(err, output){
		
		var orgNameIndex = -1;
		var descriptionIndex = -1;
		var contactFirstNameIndex = -1;
		var contactLastNameIndex = -1;
		var emailIndex = -1;
		var phoneIndex = -1;
		
		for (rowIndex in output){
			var row = output[rowIndex];
			if(rowIndex == 0){
				orgNameIndex = row.indexOf('Organization Name');
				descriptionIndex = row.indexOf('Organization Description');
				contactFirstNameIndex = row.indexOf('President\'s Name (First)');
				contactLastNameIndex = row.indexOf('President\'s Name (Last)');
				emailIndex = row.indexOf('President\'s MSOE Email');
				phoneIndex = row.indexOf('President\'s Phone Number');
			}
			else{
				var newOrg = {
					name: row[orgNameIndex],
					description: row[descriptionIndex],
					tags: [],
					active: true,
					contact: {
						name: row[contactFirstNameIndex] + ' ' + row[contactLastNameIndex],
						email: row[emailIndex],
						phone: row[phoneIndex]
					}
				}
				_dataServices.addStudentOrg(newOrg, function(err, returnedOrg){
					if(err){
						res.send(422);
					}
				});
			}
        };
        res.send(200);
    });
});

module.exports = router;
