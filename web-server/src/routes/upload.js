var express = require('express')
  , router = express.Router();

var multer = require('multer');
var csvParse = require('csv-parse');

var _dataServices = require('../orgDataServices');

var fs = require('fs');

//var body = '';

var uploader = multer({storage: multer.memoryStorage()});

var orgNameColTitle = 'Organization Name';
var descriptionColTitle = 'Organization Description';
var contactFirstNameColTitle = 'President\'s Name (First)';
var contactLastNameColTitle = 'President\'s Name (Last)';
var emailColTitle = 'President\'s MSOE Email';
var phoneColTitle = 'President\'s Phone Number';
var tagsColTitle = 'Tags';

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
        var tagIndex = -1;
        
        var orgs = [];
        
        for (rowIndex in output){
            var row = output[rowIndex];
            if(rowIndex == 0){
                orgNameIndex = row.indexOf(orgNameColTitle);
                descriptionIndex = row.indexOf(descriptionColTitle);
                contactFirstNameIndex = row.indexOf(contactFirstNameColTitle);
                contactLastNameIndex = row.indexOf(contactLastNameColTitle);
                emailIndex = row.indexOf(emailColTitle);
                phoneIndex = row.indexOf(phoneColTitle);
                tagIndex = row.indexOf(tagsColTitle);
            }
            else{
                var newOrg = {
                    name: row[orgNameIndex],
                    description: row[descriptionIndex],
                    tags: splitTags(row[tagIndex]),
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

function splitTags(arg){
	if(!arg){
		return [];
	}
	var tagString = arg.replace('\s','');
	return tagString.split(',');
}

module.exports = router;
