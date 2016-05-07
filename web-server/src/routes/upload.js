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
var LinksColTitle ='Social Media Links';
var MeetingsColTittle = 'Meeting Times';

/*
* this will take a file uploaded from the web and parse it to find student orgs
* If an org is missing required feilds, it will not be added with the rest of the orgs.
* If the CSV is missing columns or is malformed, the server should return 422.
*/
router.post('/', uploader.single('file'), function(req, res){
  var parser = csvParse();
  var notSent = true;
  var output = [];
  parser.on('readable', function(){
    while(record = parser.read()){
      output.push(record);
    }
  });

  parser.on('error', function(err) {
      sendStatus(422);
  });

  var sendStatus = function(status){
    if(notSent){
      res.sendStatus(status);
      notSent = false;
    }
  };

  parser.end(req.file.buffer.toString(), function() {
    var orgNameIndex = -1;
    var descriptionIndex = -1;
    var contactFirstNameIndex = -1;
    var contactLastNameIndex = -1;
    var emailIndex = -1;
    var phoneIndex = -1;
    var tagIndex = -1;
    var linksIndex = -1;
    var meetingIndex = -1;

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
        linksIndex = row.indexOf(LinksColTitle);
        meetingIndex = row.indexOf(MeetingsColTittle);
      }
      else{
        var newOrg = {
          name: row[orgNameIndex],
          description: row[descriptionIndex],
          tags: splitTags(row[tagIndex]),
          links: splitLinks(row[linksIndex]),
          meetings: row[meetingIndex],
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
        sendStatus(200);
      });
    }
    else{
      sendStatus(422);
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
function splitLinks(arg){
  if(!arg){
    return [];
  }
  var tagString = arg.replace('\s','');
  return arg.split('|');
}

module.exports = router;
