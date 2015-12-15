var mongoose = require('mongoose');

var config = require('../config');

var dbName = config.mongo;

//set up the model for the student_orgs collection
var studentOrg = mongoose.model('student_orgs', mongoose.Schema(config.orgSchema));
var orgTag = mongoose.model('org_tags', mongoose.Schema(config.tagSchema));

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
		exports.updateTags(callback);
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

/*
 * Gets all tags currently being used by active clubs.
 * success: a function to call upon successful completion. Takes an object that contains all tags.
 * error: a function to call if there is an error.
 */
exports.getAllTags = function(success, error) {
	if (connected) {
		orgTag.find({}, function(err, tags) {
			var tagMap = {};
			tags.forEach(function(tag) {
				tagMap[tag._id] = tag;
			});
			success(tagMap);
		});
	}
}

/*
 * Whenever a club is added or modified, this method is called in order to update the tags list.
 * This function is only called internally. It adds all unique tags being used by active clubs 
 * and removes all tags not being used by active clubs.
 * callback: function from the parameter of a function that will update the clubs information.
 */
exports.updateTags = function(callback) {
	if (connected) {
		var tempTags[] = {};
		exports.getAllOrgs('name', function(orgs) {
			orgs.forEach(function(org) {
				if (!org.tags.contains('inactive')) {
					org.tags.forEach(function(tag) {
						if (!tempTags.contains(tag)) {
							tempTags.push(tag);
						}
					});
				} else if (!tempTags.contains('inactive')) {
					tempTags.push('inactive');
				}
			});
			tempTags.forEach(function(tag) {
				var newTag = new orgTag(tag);
				newTag.save(function(err, savedTag) {
					callback(err, savedTag._doc);
				});
			});
		}, function(err) {
			//do nothing yet
		});
		
		exports.getAllTags(function(tags) {
			tags.forEach(function(tag) {
				if (!tempTags.contains(tag)) {
					orgTag.remove(tag);
				}
			});
		}, function(err) {
			//do nothing yet
		});
	}
}
