var express = require('express')
    , router = express.Router();

var  _dataServices = require('../dataServices.js');

router.get('/', function(request, response) {
    _dataServices.getAllUsers(
        function(users) {
            response.send(users);
        }, function(err) {
            console.log(err);
        });
});

router.delete('/delete/:username', function(req, res) {
    var username = req.params.username;
    console.log("username to be deleted: " + username);
    _dataServices.deleteUser(username,
        function() {
            res.sendStatus(200);
        }, function(error) {
           console.log(error);
        });
})

router.put('/addNew', function (request, response) {
    var user = request.body.user;
    _dataServices.addUser(user,
        function() {
            response.sendStatus(200);
        }, function(error) {
            console.log(error);
        });
});

router.put('/editExisting/:id', function (request, response) {
    var user = request.body.user;
    var id = request.params.id;
    _dataServices.editUser(user, id,
        function() {
            response.sendStatus(200);
        }, function(error) {
           console.log(error);
        });
});



//exports.addUser = function(user, success, error) {
//    if(connected) {
//        var newUser = new user(user)
//        newUser.save((function(err, savedUser){
//            callback(err, savedUser._doc);
//        }));
//    } else {
//        error(new Error('Not connected to database', null));
//    }
//};

module.exports = router;
