var database = require('./databaseServices');
var config = require('../config');

var bCrypt = require('bcrypt-nodejs');
var crypto = require('crypto');

var modelName = 'users';

//set up the model for the users collection
database.createModel(modelName, require('../config').userSchema);

var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.Password);
};

/*
 * adds one admin user to the database
 * user: the user to add
 * callback: a function that takes an error object and an object representing the saved user document
 */
exports.addUser = function(user, callback) {
  database.getModel(modelName, function(err, model){
    model.find({Username: user.Username}, function(err, foundUser){
      if (foundUser.length > 0){
        callback(new Error("ERR: Username taken"), null);
      }
      else{
        var newUser = new model(user);
        newUser.save(function(err, savedUser) {
          callback(err, savedUser._doc);
        });
      }
    });
  });
};

/*
 * get all of the student orgs associated with a specific user
 * username: the username of the current logged in user
 * success: a function to call upon successful completion. it takes an object that contains the found user's orgs
 * error: a function to call if there is an error. it takes an error object
 */
exports.getOrgsForSpecificUser = function(username, success, error) {
    database.getModel(modelName, function(err, model){
        model.find({Username: username}, function(err, foundUser) {
            if(err) {
                error(new Error('Unable to find user with username: ' + username));
            }
            success(foundUser[0].Orgs);
        });
    });
};

/*
 * gets all of the users from the database
 * success: a function to call upon successful completion. it takes an object that contains the users
 * error: a function to call if there is an error. it takes an error object
 */
exports.getAllUsers = function(success, error){
    database.getModel(modelName, function(err, model){
        model.find({}, function(err, users) {
            var userMap = {};
            users.forEach(function(user) {
                userMap[user._id] = user;
            });
            success(userMap);
        });
    });
};

/*
 * removes a user from the database
 * id: the id of the user to remove from the database
 * error: a callback that takes an error object if the user cannot be found
 * success: a callback that is called upon successful removeal
 */
exports.deleteUser = function(id, success, error) {
    database.getModel(modelName, function(err, model){
        model.find({_id: id}).remove().exec(function(err) {
            if(err) {
                error(new Error('Unable to delete user with id: ' + id));
            }
            success();
        });
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
    database.getModel(modelName, function(err, model){
        model.findOneAndUpdate({_id : id}, user, function(err) {
            if(err) {
                error(new Error('Unable to modify item with id:' + id));
            }
            success();
        });
    });
};

/*
 * used by passport to authenticate users
 * username: name of the user
 * password: hashed password of the user
 * done: function used by passport
 */
exports.authenticateUser = function(username, password, done) {
    database.getModel(modelName, function(err, model){
        console.log("username: " + username);
        model.findOne({ 'Username' :  username },
            function(err, user) {
                console.log(user);
                if (err)
                    return done(err);
                if (!user){
                    console.log('User Not Found with username '+username);
                    return done(null, false, {message: 'No User Found'});
                }
                if (!isValidPassword(user, password)){
                    console.log('Invalid Password');
                    return done(null, false, {message: 'Invalid Password'});
                }
                return done(null, user);
            }
        );
    });
};

/*
 * checks the database for a username and email combination, then sets a password reset token if a match is found
 * username: username to search for
 * email: email to search for
 * callback: function that takes an error object and the newly created reset token
 */
exports.createResetToken = function(username, email, callback){
  var token = crypto.randomBytes(18).toString('hex');
  database.getModel(modelName, function(err, model){
    model.findOneAndUpdate({Username: username, Email: email},
      {$set: {
        resetPasswordToken: token,
        resetPasswordExpiration: Date.now() + 1200000 // 20 minutes
      }}, function(err, document){
      if(document){
        callback(null, token);
      }
      else{
        callback(new Error("ERR:NOUSER"), null);
      }
    });
  });
};
