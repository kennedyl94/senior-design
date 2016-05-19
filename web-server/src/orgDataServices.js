var database = require('./databaseServices');

var orgModelName = 'student_orgs';
var proposeChangesModelName = 'propose_changes';

//set up the model for the student_orgs collection
database.createModel(orgModelName, require('../config').orgSchema);

//set up the model for the propose_changes collection
database.createModel(proposeChangesModelName, require('../config').proposeChangesSchema);

/*
 * Adds one student org to the database
 * org: the student org to add
 * callback: a function that takes an error object and an object representing the saved org document
 */
exports.addStudentOrg = function(org, callback){
	database.getModel(orgModelName, function(err, model){
		var newOrg = new model(org);
		newOrg.save(function(saveErr, savedOrg){
			callback(saveErr, savedOrg._doc);
		});
	});
};

/*
 * Gets all of the student orgs matching the given tags
 * tags: the tags to match
 * callback: a function that takes an error object and an object that contains the student orgs
 */
exports.getOrgsMatchingTags = function(tags, callback) {	//Deprecated, use searchByTags instead for now
  database.getModel(orgModelName, function(err, model){
	  model.find({
		 'tags': { $in: tags }
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
 * Gets all of the student orgs from the database
 * sortType: the attribute to sort by
 * success: a function to call upon successful completion. it takes an object that contains the student orgs
 * error: a function to call if there is an error. it takes an error object
 */
exports.getAllOrgs = function(sortType, success, error){
	database.getModel(orgModelName, function(err, model){
		var sort_order = {};
		sort_order[sortType] = 1;
		model.find({}).sort(sort_order).lean().exec(function(findErr, orgs) {
			if(findErr){
				error(findErr);
			}
			else{
				success(orgs);
			}
		});
	});
};

/*
 * Gets all of the student org information based on the collection of org Names
 * orgNameCollection: collection of organization names
 * callback: a function that takes an error object and an object that contains the student orgs to return
 */
exports.getOrgsInfoByName = function(orgNameCollection, callback){
	database.getModel(orgModelName, function(err, model) {
		model.find({name: {$in:orgNameCollection}}, function(err, orgs) {
			callback(err, orgs);
		});
	});
};

/*
 * Save a collection of orgs to the database
 * this will check for duplicated names and replace them instead of adding the duplicates
 * orgs: the collection of orgs to save to the database
 * callback: a function that takes an error object and the orgs that were saved to the database
 */
exports.saveAllOrgs = function(orgs, callback){
    database.getModel(orgModelName, function(err, model){
		var names = [];
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
			names[i] = currentOrg.name;
		}
		if(valid){
			model.remove({name: {$in:names}}, function(err, product){
				model.create(orgs, function(saveErr, savedOrgs){
					callback(saveErr, savedOrgs);
				});
			});
		}		
		else{
			callback(new Error('Invalid org'), null);
		}
    });
};

/*
 * Removes an org from the database
 * orgId: the id of the org to remove from the database
 * error: a callback that takes an error object if the org cannot be found
 * success: a callback that is called upon successful removeal
 */
exports.deleteOrg = function(orgId, success, error) {
	database.getModel(orgModelName, function(err, model){
		model.find({ _id: orgId}).remove().exec(function(findErr) {
			if(findErr) {
				error(new Error('Unable to delete item with id: ' + orgId));
			}
			else{
				success();
			}
		});
	});
};

/*
 * Updates an org with a given ID
 * orgID: the id of the org to update
 * orgToUpdate: the contents to update the org with
 * success: a function to call upon successfuly updating
 * error: a function to call if there is an error during updating
 */
exports.modifyOrg = function(orgId, orgToUpdate, success, error) {
	database.getModel(orgModelName, function(err, model){
		model.findOneAndUpdate({_id: orgId}, orgToUpdate, function(findErr) {
			if(findErr) {
				error(new Error('Unable to modify item with id:' + orgId));
			}
			else{
				success();
			}
		});
	});
};

exports.modifyOrgByName = function(orgToUpdate, success, error) {
	console.log("in modifyOrgByName in orgDataServices: " + orgToUpdate.name);
	database.getModel(orgModelName, function(err, model){
		model.findOneAndUpdate({name: orgToUpdate.name}, orgToUpdate, function(findErr) {
			if(findErr) {
				error(new Error('Unable to modify item with name:' + orgToUpdate.name));
			}
			else{
				success();
			}
		});
	});
};

/*
 * Sets the active state of an org
 * orgId: The id of the org to activate/deactivate.
 * isActive: If false, the org will be active. If true, the org will be set inactive.
 * success: A function to call if the update is successful.
 * error: A function to call if there is an error during updating.
 */
exports.activation = function(orgId, isActive, success, error) {
	database.getModel(orgModelName, function(err, model){
		if(isActive == true) {
			model.findOneAndUpdate({_id: orgId}, {$push: {tags: {text: 'inactive'}}}, function(findErr) {
				if(findErr) { 
					error(findErr); 
				}
				else{
					success();
				}
			});
		} else if(isActive == false) {
			model.findOneAndUpdate({_id: orgId}, {$pull: {tags: {text: 'inactive'}}}, function(findErr) {
				if(findErr) { 
					error(findErr); 
				}
				else{
					success();
				}
			});
		}
	});
};

/*
 * Gets all tags currently being used by active clubs as well as the inactive tag.
 * success: A function to call upon successful completion. Takes an object that contains all tags.
 * error: A function to call if there is an error.
 */
exports.getAllTags = function(success, error) {		//Deprecated
	database.getModel(orgModelName, function(err, model){
		model.find({}, function (findErr, orgs) {
			if(findErr){
				error(findErr);
			}
			else{
				var tagMap = [];
				var tempTags = [];
				orgs.forEach(function (org) {
					tempTags = [];
					for (var i = 0; i < org.tags.length; i++) {
						tempTags.push(org.tags[i].text);
					}
					if (tempTags.indexOf('inactive') == -1) {
						org.tags.forEach(function (tag) {
							if (tagMap.indexOf(tag) == -1 && tag != '') {
								tagMap.push(tag);
							}
						});
					//} else if (tagMap.indexOf('inactive') == -1) {
					//	tagMap.push('inactive');
					}
				});
				tagMap.sort();
				success(tagMap);
			}
		});
	});
};

/*
 * Searches The list of orgs by tags and returns the orgs found in the order of most tags to least.
 * success: A function to call upon successful completion.
 * 			Takes an object that contains the found orgs and their priority ranking.
 * error: A function to call if there is an error.
 */
exports.searchByTags = function(tagList, success, error) {
	database.getModel(orgModelName, function(err, model){
		model.find({}, function(findErr, orgs) {
			if (findErr) {
				error(findErr);
			} else {
				var tempOrgList = [];
				var orgList = [];
				var tempTags = [];
				orgs.forEach(function(org) {
					tempTags = [];
					org.tags.forEach(function(tag) {
						tempTags.push(tag.text);
					});
					if (tempTags.indexOf('inactive') == -1) {
						var rating = 0;
						tagList.forEach(function(tag) {
							if (tempTags.indexOf(tag.text) != -1) {
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

				tempOrgList.forEach(function(org) {
					orgList.push(org.organization);
				});
				success(orgList);
			}
		});
	});
};

/**
 * Adds a proposed change to the database
 * changes: The changes that are to be made to an organization
 * callback: a function that takes an error object and an object representing the saved changes document
 */
exports.proposeChange = function(changes, callback) {
   database.getModel(proposeChangesModelName, function(err, model){
		var proposedChange = new model(changes);
        proposedChange.save(function(saveErr, savedChanges){
   		    callback(saveErr, savedChanges._doc);
		});
	});
};

exports.getAllChanges = function(success, error) {
	database.getModel(proposeChangesModelName, function(err, model){
		model.find({}).exec(function(findErr, changes) {
			if(findErr){
				error(findErr);
			}
			else{
				success(changes);
			}
		});
	});
};

exports.deleteChange = function(changeId, success, error) {
	database.getModel(proposeChangesModelName, function(err, model){
		model.find({ _id: changeId}).remove().exec(function(findErr) {
			if(findErr) {
				error(new Error('Unable to delete item with id: ' + changeId));
			}
			else{
				success();
			}
		});
	});
};