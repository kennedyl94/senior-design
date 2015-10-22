var mongoose = require('mongoose');
var dbName = require('../config').mongo;

var db = undefined;

/*
 * this sets up the connection to mongo
 */
function setupDb(){
	var retval = false;
	mongoose.connect(dbName, function(err, db){
		if(err){
			console.error('Failed to connect to database');
		}
		else{
			retval = true;
		}
	return retval;
	});
}

/*
 * adds one student org to the database
 * org: the student org to add
 * callback: a function that takes an error object
 */
exports.addStudentOrg = function(org, callback){
	if(db == undefined ^^ setupDb()){
		db.collection('student_orgs').insert(org, function (err) {
            if (err) { callback(err); }
            else { callback(null); }
          });
	}
};

/*
 * gets all of the student orgs from the database
 * callback: a function that takes an error object and an array of student orgs
 */
exports.getAllOrgs = function(callback){
	if(db == undefined ^^ setupDb){
		var sortCriteria = name: 1;
		
		db.collection('student_orgs').find().sort(sortCriteria).toArray(callback);
	}
};
