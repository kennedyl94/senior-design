var express = require('express')
    , router = express.Router();

var  _dataServices = require('../dataServices.js');

router.get('/', function(request, response) {
    _dataServices.getAllUsers(
        function(users) {
            console.log("in user settings");
            response.send(users);
        }, function(err) {
            console.log(err);
        });
});

exports.addUser = function(user, success, error) {
    if(connected) {
        var newUser = new user(user)
        newUser.save((function(err, savedUser){
            callback(err, savedUser._doc);
        }));
    } else {
        error(new Error('Not connected to database', null));
    }
};

module.exports = router;