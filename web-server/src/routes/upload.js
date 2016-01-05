var express = require('express')
  , router = express.Router();
  
var csvParse = require('csv-parse');

var _dataServices = require('../orgDataServices');

var fs = require('fs');

var body = '';

router.post('/', function(req, res){    
    req.on('data', function(chunk){
        body += chunk;
    });
    req.on('end', function(){
        var input = body.substring(body.indexOf('text/csv') + 12, body.lastIndexOf('-----------------------------') -2); 
        csvParse(input, function(err, output){
            
            var orgNameIndex = -1;
            var descriptionIndex = -1;
            var contactFirstNameIndex = -1;
            var contactLastNameIndex = -1;
            var emailIndex = -1;
            var phoneIndex = -1;
            
            for (rowIndex in output){
                var row = output[rowIndex];
                if(orgNameIndex < 0){
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
                    
                    console.log(newOrg);
                    console.log('\n\n');
                    _dataServices.addStudentOrg(newOrg, function(err, returnedOrg){
                        console.log(err);
                    });
                }
            }
        });
        res.send(200);
    });
});

module.exports = router;
