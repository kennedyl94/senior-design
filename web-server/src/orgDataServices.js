var mongoose = require('mongoose');
var config = require('../config');

var dbName = config.mongo;

//set up the model for the student_orgs collection
var studentOrg = mongoose.model('student_orgs', mongoose.Schema(config.orgSchema));

/*
/*
 * setup the connection to the database
 * /
exports.connect = function(){
	if(!connected
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
 * /
 exports.disconnect = function(){
	 if(connected){
		mongoose.disconnect(function(){
			connected = false;
			console.log('Disconnected from database');
		});
	}
 };
*/

/*
 * adds one student org to the database
 * org: the student org to add
 * callback: a function that takes an error object and an object representing the saved org document
 */
exports.addStudentOrg = function(org, callback){
	var newOrg = new studentOrg(org);
	newOrg.save(function(err, savedOrg){
		callback(err, savedOrg._doc);
	});
};

exports.getOrgsMatchingTags = function(tags, callback) {
  studentOrg.find({
     'tags': { $in: tags }
  }, function(err, docs){
     if(!err) {
        callback(docs);
     }
  });
};


/*
 * gets all of the student orgs from the database
 * sortType: the attribute to sort by
 * success: a function to call upon successful completion. it takes an object that contains the student orgs
 * error: a function to call if there is an error. it takes an error object
 */
exports.getAllOrgs = function(sortType, success, error){
	var sort_order = {};
	sort_order[sortType] = 1;
	studentOrg.find({}, function(err, orgs) {
		var orgsMap = {}; 
		orgs.forEach(function(org) {
			orgsMap[org._id] = org;
		});
		success(orgsMap);
	}).sort( sort_order );
};

exports.deleteOrg = function(orgId, success, error) {
	if(connected) {
		studentOrg.find({ _id: orgId}).remove().exec(function(err) {
			if(err) {
				error(new Error('Unable to delete item with id: ' + orgId));
			}
			success();
		});
	}
	else {
		//error(new Error('Not connected to database'), null);
	}
};
//
//exports.userExists = function(user, success, error){
//	if(connected){
//		user.find({}, function(err, orgs) {
//			var orgsMap = {};
//			orgs.forEach(function(org) {
//				orgsMap[org._id] = org;
//			});
//			success(orgsMap);
//		}).sort( sort_order );
//	}
//	else{
//		error(new Error('Not connected to database'), null);
//	}
//};
//
//exports.addUser = function(user, success, error) {
//	if(connected) {
//		var newUser = new user(user)
//		newUser.save((function(err, savedUser){
//			callback(err, savedUser._doc);
//		}));
//	} else {
//		error(new Error('Not connected to database', null));
//	}
//}}
