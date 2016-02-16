var database = require('./databaseServices');

var dbName = require('../config').mongo;

//set up the model for the student_orgs collection
var studentOrg = database.createModel('student_orgs', require('../config').orgSchema);


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

/*
 * gets all of the student orgs matching the given tags
 * tags: the tags to match
 * callback: a function that takes an error object and an object that contains the student orgs
 */
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
	studentOrg.find({}).sort(sort_order).lean().exec(function(err, orgs) {
		success(orgs);
	});
};

/*
 * save a collection of orgs to the database
 * orgs: the collection of orgs to save to the database
 * callback: a function that takes an error object and the orgs that were saved to the database
 */
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

/*
 * removes an org from the database
 * orgId: the id of the org to remove from the database
 * error: a callback that takes an error object if the org cannot be found
 * success: a callback that is called upon successful removeal
 */
exports.deleteOrg = function(orgId, success, error) {
	studentOrg.find({ _id: orgId}).remove().exec(function(err) {
		if(err) {
			error(new Error('Unable to delete item with id: ' + orgId));
		}
		success();
	});
};

/*
 * Gets all tags currently being used by active clubs.
 * success: A function to call upon successful completion. Takes an object that contains all tags.
 * error: A function to call if there is an error.
 */
exports.getAllTags = function(success, error) {
	studentOrg.find({}, function (err, orgs) {
		var tagMap = [];
		orgs.forEach(function (org) {
			if (org.tags.indexOf('inactive') == -1) {
				org.tags.forEach(function (tag) {
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

/*
 * Searches The list of orgs by tags and returns the orgs found in the order of most tags to least.
 * success: A function to call upon successful completion.
 * 			Takes an object that contains the found orgs and their priority ranking.
 * error: A function to call if there is an error.
 */
exports.searchByTags = function(tagList, success, error) {
	studentOrg.find({}, function(err, orgs) {
		var tempOrgList = [];
		var orgList = [];
		orgs.forEach(function(org) {
			if (org.tags.indexOf('inactive') == -1) {
				var rating = 0;
				tagList.forEach(function(tag) {
					if (org.tags.indexOf(tag) != -1) {
						rating++;
					}
				});

				if (rating > 0) {
					tempOrgList.push({organization: org, priority: rating});
				}
			}
		});

		tempOrgList.sort(function(a, b) {
			return -(a.priority - b.priority);
		});

		tempOrgList.forEach(function(org){
			orgList.push(org.organization);
		});



		success(orgList);
	});
}
