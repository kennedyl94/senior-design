var mongoose = require('mongoose');
var config = require('../config');

var User = mongoose.model('users', config.userSchema);

/*
 * adds one admin user to the database
 * user: the user to add
 * callback: a function that takes an error object and an object representing the saved user document
 */
exports.addUser = function(user, callback) {
    var newUser = new User(user);
    newUser.save(function(err, savedUser) {
        callback(err, savedUser._doc);
  });
};

/*
 * get all of the student orgs associated with a specific user
 * username: the username of the current logged in user
 * success: a function to call upon successful completion. it takes an object that contains the found user's orgs
 * error: a function to call if there is an error. it takes an error object
 */
exports.getOrgsForSpecificUser = function(username, success, error) {
    User.find({Username: username}, function(err, foundUser) {
        if(err) {
            error(new Error('Unable to find user with username: ' + username));
        }
        success(foundUser[0].Orgs);
    });
};

/*
 * gets all of the users from the database
 * success: a function to call upon successful completion. it takes an object that contains the users
 * error: a function to call if there is an error. it takes an error object
 */
exports.getAllUsers = function(success, error){
    User.find({}, function(err, users) {
        var userMap = {};
        users.forEach(function(user) {
            userMap[user._id] = user;
        });
        success(userMap);
    });
};


/*
 * gets a single user
 * username: the username of the current logged in user
 * success: a function to call upon successful completion. it takes an object that contains the found user's orgs
 * error: a function to call if there is an error. it takes an error object
 */
exports.getUserByName = function(username, success, error) {
    User.find({Username: username}, function(err, foundUser) {
        if(err) {
            error(new Error('Unable to find user with username: ' + username));
        }
        success(foundUser[0]);
    });
};
/*
 * removes a user from the database
 * id: the id of the user to remove from the database
 * error: a callback that takes an error object if the user cannot be found
 * success: a callback that is called upon successful removeal
 */
exports.deleteUser = function(id, success, error) {
    User.find({_id: id}).remove().exec(function(err) {
        if(err) {
            error(new Error('Unable to delete user with id: ' + id));
        }
        success();
    });
};

/*
 * updates a user with a given ID
 * user: the new instance of the user to update
 * id: the id of the user to update
 * success: a function to call upon successfuly updating
 * error: a function to call if there is an error during updating
 */
exports.editUser = function(user, id, success, error) {
    User.findOneAndUpdate({_id : id}, user, function(err) {
        if(err) {
            error(new Error('Unable to modify item with id:' + id));
        }
        success();
    });
};