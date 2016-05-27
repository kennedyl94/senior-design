var database = require('./databaseServices');

var modelName = 'tags';

//set up the model for the student_orgs collection
database.createModel(modelName, require('../config').tagSchema);

/*
 * adds one tag to the database
 * tag: the tag to add to the database
 * callback: a function that takes an error object and an object representing the saved tag document
 */
exports.addTag = function(tag, callback) {
    database.getModel(modelName, function(err, model) {
        var newTag = new model(tag);
        newTag.save(function(saveErr, savedTag) {
            callback(saveErr, savedTag._doc);
        });
    });
};

exports.editTag = function(tagId, tagEdit, success, error) {
    database.getModel(modelName, function(err, model) {
       model.findOneAndUpdate({_id: tagId}, tagEdit, function(findErr) {
          if(findErr) {
              error(new Error('Unable to modify item with id:' + tagId));
          } else {
              success();
          }
       });
    });
};

exports.getTag = function(tagId, success, error) {
    database.getModel(modelName, function(err, model) {
        model.find({_id: tagId}).exec(function(findErr, tag) {
            if (findErr) {
                error(findErr);
            } else {
                //console.log(tag);
                success(tag);
            }
        });
    });
};

/*
 * gets all of the tags from the database
 * success: a function to call upon successful completion. it takes an object that contains the student orgs
 * error: a function to call if there is an error. it takes an error object
 */
exports.getAllTags = function(success, error) {
    database.getModel(modelName, function(err, model) {
        model.find({}).sort({text: 1}).lean().exec(function(findErr, tags) {
            if(findErr) {
                error(findErr);
            } else {
                success(tags);
            }
        });
    });
};

/*
 * removes a tag from the database
 * tag: the tag to remove from the database
 * error: a callback that takes an error object if the tag cannot be found
 * success: a callback that is called upon successful removal
 */
exports.deleteTag = function(tagId, success, error) {
    database.getModel(modelName, function(err, model){
        model.find({ _id: tagId}).remove().exec(function(findErr) {
            if(findErr) {
                error(new Error('Unable to delete item with id: ' + tagId));
            } else{
                success();
            }
        });
    });
};