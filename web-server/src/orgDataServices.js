var database = require('./databaseServices');

var modelName = 'student_orgs';

//set up the model for the student_orgs collection
database.createModel(modelName, require('../config').orgSchema);

/*
 * adds one student org to the database
 * org: the student org to add
 * callback: a function that takes an error object and an object representing the saved org document
 */
exports.addStudentOrg = function(org, callback){
	database.getModel(modelName, function(err, model){
		var newOrg = new model(org);
		newOrg.save(function(saveErr, savedOrg){
			callback(saveErr, savedOrg._doc);
		});
	});
};

/*
 * gets all of the student orgs that have the given tags
 * tags: an array of tags to look for
 * callback: a function taking an array of the orgs that match the given tags
 */
exports.getOrgsMatchingTags = function(tags, callback) {
  database.getModel(modelName, function(err, model){
	  model.find({
		 'tags': { $in: tags },
	  }).lean().exec(function(findErr, docs){
		 if(!findErr) {
			callback(docs);
		 }
		 else{
			 callback([]);
		 }
	  });
  });
};

/*
 * gets all of the student orgs from the database
 * sortType: the attribute to sort by
 * success: a function to call upon successful completion. it takes an object that contains the student orgs
 * error: a function to call if there is an error. it takes an error object
 */
exports.getAllOrgs = function(sortType, success, error){
	database.getModel(modelName, function(err, model){
		var sort_order = {};
		sort_order[sortType] = 1;
		model.find({}, function(findErr, orgs) {
			if(findErr){
				error(findErr);
			}
			else{
				var orgsMap = {}; 
				orgs.forEach(function(org) {
					orgsMap[org._id] = org;
				});
				success(orgsMap);
			}
		}).sort( sort_order );
	});
};

/*
 * removes the given org from the database
 * orgId: the id of the org to remove
 * success: a function to call upon successful removal
 * error: a function that takes an error object if removal is not successful
 */
exports.deleteOrg = function(orgId, success, error) {
	database.getModel(modelName, function(err, model){
		model.find({ _id: orgId}).remove().exec(function(findErr) {
			if(findErr) {
				error(new Error('Unable to delete item with id: ' + orgId));
			}
			success();
		});
	});
};

/*
 * Gets all tags currently being used by active clubs.
 * success: A function to call upon successful completion. Takes an object that contains all tags.
 * error: A function to call if there is an error.
 */
exports.getAllTags = function(success, error) {
	database.getModel(modelName, function(err, model){
		model.find({}, function (findErr, orgs) {
			if(findErr){
				error(findErr);
			}
			else{
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
			}
		});
	});
}

/*
 * Searches The list of orgs by tags and returns the orgs found in the order of most tags to least.
 * success: A function to call upon successful completion.
 * 			Takes an object that contains the found orgs and their priority ranking.
 * error: A function to call if there is an error.
 */
exports.searchByTags = function(tagList, success, error) {
	database.getModel(modelName, function(err, model){
		model.find({}, function(findErr, orgs) {
			if(findErr){
				error(findErr);
			}
			else{
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
			}
		});
	});
}
