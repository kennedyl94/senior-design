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
		callback(new Error('Not connected to database'), null);
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
		//error(new Error('Not connected to database'), null);
	}
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
//		admin.find({}, function(err, orgs) {
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
//		var newUser = new admin(user)
//		newUser.save((function(err, savedUser){
//			callback(err, savedUser._doc);
//		}));
//	} else {
//		error(new Error('Not connected to database', null));
//	}
//}}

/*
 * Gets all tags currently being used by active clubs.
 * success: A function to call upon successful completion. Takes an object that contains all tags.
 * error: A function to call if there is an error.
 */
exports.getAllTags = function(success, error) {
	if (connected) {
		studentOrg.find({}, function(err, orgs) {
			var tagMap = [];
			orgs.forEach(function(org) {
				if (org.tags.indexOf('inactive') == -1) {
					org.tags.forEach(function(tag) {
						if (tagMap.indexOf(tag) == -1 && tag != '') {
							tagMap.push(tag);
						}
					});
				} else if (tagMap.indexOf('inactive') == -1) {
					tagMap.push('inactive');
				}
			});

			tagMap.sort();
			success(tagMap);
		});
	}
}

/*
 * Searches The list of orgs by tags and returns the orgs found in the order of most tags to least.
 * success: A function to call upon successful completion.
 * 			Takes an object that contains the found orgs and their priority ranking.
 * error: A function to call if there is an error.
 */
exports.searchByTags = function(tagList, success, error) {
	studentOrg.find({}, function(err, orgs) {
		var orgList = [];
		orgs.forEach(function(org) {
			if (org.tags.indexOf('invalid') == -1) {
				var rating = 0;
				tagList.forEach(function(tag) {
					if (org.tags.indexOf(tag) != -1) {
						rating++;
					}
				});

				if (rating > 0) {
					orgList.push({organization: org, priority: rating});
				}
			}
		});

		orgList.sort(function (a, b) {
			return -(a.priority - b.priority);
		});

		success(orgList);
	});
}