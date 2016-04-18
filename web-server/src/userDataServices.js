var mongoose = require('mongoose');
var config = require('../config');

var User = mongoose.model('users', config.userSchema);

exports.addUser = function(user, callback) {
    var newUser = new User(user);
    newUser.save(function(err, savedUser) {
        callback(err, savedUser._doc);
  });
};

exports.getOrgsForSpecificUser = function(username, success, error) {
    User.find({Username: username}, function(err, foundUser) {
        if(err) {
            error(new Error('Unable to find user with username: ' + username));
        }
        success(foundUser[0].Orgs);
    });
};

exports.getAllUsers = function(success, error){
    User.find({}, function(err, users) {
        var userMap = {};
        users.forEach(function(user) {
            userMap[user._id] = user;
        });
        success(userMap);
    });
};

exports.deleteUser = function(id, success, error) {
    User.find({_id: id}).remove().exec(function(err) {
        if(err) {
            error(new Error('Unable to delete user with id: ' + id));
        }
        success();
    });
};

exports.editUser = function(user, id, success, error) {
    User.findOneAndUpdate({_id : id}, user, function(err) {
        if(err) {
            error(new Error('Unable to modify item with id:' + id));
        }
        success();
    });
};