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
 */
router.post('/', uploader.single('file'), function(req, res){
    csvParse(req.file.buffer.toString(), function(err, output){
        
        var orgNameIndex = -1;
        var descriptionIndex = -1;
        var contactFirstNameIndex = -1;
        var contactLastNameIndex = -1;
        var emailIndex = -1;
        var phoneIndex = -1;
        
        var success = true;
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
                success = success && 
               newOrg.name != undefined &&
               newOrg.description != undefined &&
               newOrg.contact.name != undefined &&
               newOrg.contact.email != undefined &&
               newOrg.contact.phone != undefined;
                if(success){
                    orgs.push(newOrg);
                }
            }
        }
        if(success){
            _dataServices.addAllOrgs(orgs, function(err, savedOrgs){
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
