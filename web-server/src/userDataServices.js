var mongoose = require('mongoose');
var config = require('../config');

var admins = mongoose.model('users', config.userSchema);

exports.addUser = function(user, callback) {
    var newUser = new admins(user);
    newUser.save(function(err, savedUser) {
        callback(err, savedUser._doc);
    });
};

exports.getAllUsers = function(success, error){
    admins.find({}, function(err, users) {
        var userMap = {};
        users.forEach(function(user) {
            userMap[user._id] = user;
        });
        success(userMap);
    });
};

exports.deleteUser = function(id, success, error) {
    admins.find({_id: id}).remove().exec(function(err) {
        if(err) {
            error(new Error('Unable to delete user with username: ' + username));
        }
        success();
    });
};

exports.editUser = function(user, id, success, error) {
    admins.findOneAndUpdate({_id : id}, user, function(err) {
        if(err) {
            error(new Error('Unable to modify item with id:' + id));
        }
        success();
    });
};