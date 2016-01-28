var mongoose = require('mongoose');
var config = require('../config');

var dbName = config.mongo;

//set up the model for the student_orgs collection
var studentOrg = mongoose.model('student_orgs', mongoose.Schema(config.orgSchema));

var connected = false;

/*
 * setup the connection to the database
 */
exports.connect = function(){
    if(!connected){
        mongoose.connect(dbName);
        var db = mongoose.connection;
        db.on('error', function(){
            console.error.bind(console, 'connection error:');
            mongoose.disconnect();
        });
        db.once('open', function() {
            console.log('Connected to database');
            connected = true;
        });
    }
};

/*
 * disconnects from the mongo server
 */
 exports.disconnect = function(){
     if(connected){
        mongoose.disconnect(function(){
            connected = false;
            console.log('Disconnected from database');
        });
    }
 }

/*
 * adds one student org to the database
 * org: the student org to add
 * callback: a function that takes an error object and an object representing the saved org document
 */
exports.addStudentOrg = function(org, callback){
    if(connected){
        var newOrg = new studentOrg(org);
        newOrg.save(function(err, savedOrg){
            callback(err, savedOrg._doc);
        });
    }
    else{
        callback('ERR: Not connected to database', null);
    }
};

/*
 * gets all of the student orgs from the database
 * sortType: the attribute to sort by
 * success: a function to call upon successful completion. it takes an object that contains the student orgs
 * error: a function to call if there is an error. it takes an error object
 */
exports.getAllOrgs = function(sortType, success, error){
    if(connected){
        var sort_order = {};
        sort_order[sortType] = 1;
        studentOrg.find({}, function(err, orgs) {
            var orgsMap = {}; 
            orgs.forEach(function(org) {
                orgsMap[org._id] = org;
            });
            success(orgsMap);
        }).sort( sort_order );
    }
    else{
        error('ERR: Not connected to database', null);
    }
};

exports.saveAllOrgs = function(orgs, callback){
    var valid = true;
    for(var i = 0; i < orgs.length; i++){
        var currentOrg = orgs[i];
        valid = valid && currentOrg.name != undefined
                      && currentOrg.description != undefined
                      && currentOrg.tags != undefined
                      && currentOrg.contact != undefined
                      && currentOrg.contact.name != undefined
                      && currentOrg.contact.email != undefined
                      && currentOrg.contact.phone != undefined;
    }
    if(valid){
        studentOrg.create(orgs, function(err, savedOrgs){
            callback(err, savedOrgs);
        });
    }
    else{
        callback(new Error('Invalid org'), null);
    }
};

//
//exports.userExists = function(user, success, error){
//  if(connected){
//      admin.find({}, function(err, orgs) {
//          var orgsMap = {};
//          orgs.forEach(function(org) {
//              orgsMap[org._id] = org;
//          });
//          success(orgsMap);
//      }).sort( sort_order );
//  }
//  else{
//      error(new Error('Not connected to database'), null);
//  }
//};
//
//exports.addUser = function(user, success, error) {
//  if(connected) {
//      var newUser = new admin(user)
//      newUser.save((function(err, savedUser){
//          callback(err, savedUser._doc);
//      }));
//  } else {
//      error(new Error('Not connected to database', null));
//  }
//}}
