var mongoose = require('mongoose');
var config = require('../config');

var dbName = config.mongo;

//set up the model for the student_orgs collection
var studentOrg = mongoose.model('student_orgs', mongoose.Schema(config.orgSchema));
var admins = mongoose.model('users', config.userSchema);

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
 };

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
		//callback(new Error('Not connected to database'), null);
	}
};

exports.addUser = function(user, callback) {
	if(connected) {
		var newUser = new admins(user);
		newUser.save(function(err, savedUser) {
			callback(err, savedUser._doc);
		});
	} else {
		//callback (new Error('Not connected to database'), null);
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

exports.getAllUsers = function(success, error){
	if(connected){
		admins.find({}, function(err, users) {
			var userMap = {};
			users.forEach(function(user) {
				userMap[user._id] = user;
			});
			success(userMap);
		});
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

exports.deleteUser = function(id, success, error) {
	if(connected) {
		admins.find({_id: id}).remove().exec(function(err) {
			if(err) {
				error(new Error('Unable to delete user with username: ' + username));
			}
			success();
		});
	}
	else {
		//error(new Error('Not connected to database'), null);
	}
};


exports.modifyOrg = function(orgId, orgToUpdate, success, error) {
	if(connected) {
		studentOrg.findOneAndUpdate( {_id: orgId}, orgToUpdate, function(err) {
			if(err) {
				error(new Error('Unable to modify item with id:' + orgId));
			}
			success();
		});
	}
	else {
		//error(new Error('Not connected to database'), null);
	}
};

exports.editUser = function(user, id, success, error) {
	if(connected) {
		admins.findOneAndUpdate({_id : id}, user, function(err) {
			if(err) {
				error(new Error('Unable to modify item with id:' + id));
			}
			success();
		});
	} else {
		error(new Error('Not connected to database'), null);
	}
}