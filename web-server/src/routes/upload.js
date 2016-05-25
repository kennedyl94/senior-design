var express = require('express')
, router = express.Router();

var multer = require('multer');
var csvParse = require('csv-parse');

var _dataServices = require('../orgDataServices');
var userDataServices = require('../userDataServices');

var fs = require('fs');

var uploader = multer({storage: multer.memoryStorage()});

// org fields
var orgNameColTitle = 'Organization Name';
var descriptionColTitle = 'Organization Description';
var contactFirstNameColTitle = 'President\'s Name (First)';
var contactLastNameColTitle = 'President\'s Name (Last)';
var emailColTitle = 'President\'s MSOE Email';
var phoneColTitle = 'President\'s Phone Number';
var tagsColTitle = 'Tags';
var LinksColTitle ='Social Media Links';
var MeetingsColTittle = 'Meeting Times';

// user fields
var userColTitle = 'Username';
var passwordColTitle = 'Password';
var userEmailColTitle = 'Email';
var adminRoleColTitle = 'Admin Role';
var orgsColTitle = 'Organizations';

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
        };

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

/*
 * this will take a file uploaded from the web and parse it to find users
 * If a user is missing required feilds, it will not be added with the rest of the users.
 * If the CSV is missing columns or is malformed, the server should return 422.
 */
router.post('/UserFile', uploader.single('file'), function(req, res){
            console.log('user upload');
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
        var userIndex = -1;
        var emailIndex = -1;
        var adminRoleIndex = -1;
        var orgsIndex = -1;
               
        var users = [];
                       
        for (rowIndex in output){
          var row = output[rowIndex];
          if(rowIndex == 0){
            userIndex = row.indexOf(userColTitle);
            passwordIndex = row.indexOf(passwordColTitle);
            emailIndex = row.indexOf(userEmailColTitle);
            adminRoleIndex = row.indexOf(adminRoleColTitle);
            orgsIndex = row.indexOf(orgsColTitle);
          }
          else{
            var newUser = {
              Username: row[userIndex],
              Password: row[passwordIndex],
              Email: row[emailIndex],
              Type: row[adminRoleIndex],
              Orgs: splitOrgs(row[orgsIndex]),
            };
                       
            var success =
            newUser.Username && newUser.Username.trim() != '' &&
            newUser.Password &&
            newUser.Email && newUser.Email.trim() != '' &&
            newUser.Orgs
                       
            if(success){
              users.push(newUser);
            }
          }
        }
        if(users.length > 0){
          userDataServices.saveAllUsers(users, function(err, savedUsers){
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

function splitOrgs(arg){
    if(!arg){
        return [];
    }
    var orgs = arg.split(',');
    for(var i = 0; i < orgs.length; i++){
        orgs[i] = orgs[i].trim();
    }
    return orgs;
}

function splitLinks(arg){
  if(!arg){
    return [];
  }
  var tagString = arg.replace('\s','');
  return arg.split('|');
}

module.exports = router;
