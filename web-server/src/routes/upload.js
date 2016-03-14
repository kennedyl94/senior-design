var express = require('express')
  , router = express.Router();

var multer = require('multer');
var csvParse = require('csv-parse');

var _dataServices = require('../orgDataServices');

var fs = require('fs');

var body = '';

var uploader = multer({storage: multer.memoryStorage()});

/*
 * this will take a file uploaded from the web and parse it to find student orgs
 * If an org is missing required feilds, it will not be added with the rest of the orgs.
 * If the CSV is missing columns or is malformed, the server should return 422.
 */
router.post('/', uploader.single('file'), function(req, res){
    csvParse(req.file.buffer.toString(), function(err, output){
        
        var orgNameIndex = -1;
        var descriptionIndex = -1;
        var contactFirstNameIndex = -1;
        var contactLastNameIndex = -1;
        var emailIndex = -1;
        var phoneIndex = -1;
        
        var orgs = [];
        
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
                
				var success =  
				newOrg.name && newOrg.name.trim() != '' &&
				newOrg.description && newOrg.description.trim() != '' &&
				newOrg.contact.name &&
				newOrg.contact.email &&
				newOrg.contact.phone;
				
				if(success){
					orgs.push(newOrg);
				}
			}
		}
		if(orgs.length > 0){
			_dataServices.saveAllOrgs(orgs, function(err, savedOrgs){
				if(err){
					res.send(422);
				}
				else{
					res.send(200);
				}
			});
		}
		else{
			res.send(422);
		}
	});
});

module.exports = router;
