var mongoose = require('mongoose');
var dbName = require('../config').mongo;

//set up the model for the student_orgs collection
var studentOrg = mongoose.model('student_orgs', mongoose.Schema(require('../config').orgSchema));

var connected = false;

/*
 * setup the connection to the database
 * callback: a function to call upon completion
 */
exports.connect = function(){
	if(!connected){
		mongoose.connect(dbName);
		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
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
		mongoose.disconnect();
		connected = false;
	}
 }

/*
 * adds one student org to the database
 * org: the student org to add
 *callback: a function that takes an error object
 */
exports.addStudentOrg = function(org, callback){
	if(connected){
		var newOrg = new studentOrg(org);
		newOrg.save(function(err){
			callback(err);
		});
	}
	else{
		callback(new Error('Not connected to database'));
	}
};

/*
 * gets all of the student orgs from the database
 * callback: a function that takes an error object and an array of student orgs
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
