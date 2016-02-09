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
    _dataServices.deleteUser(username,
        function() {
            res.sendStatus(200);
        }, function(error) {
           console.log(error);
        });
})

router.post('/addNew', function (request, response) {
    response.sendStatus(200);
});

router.put('/editExisting/:id', function (request, response) {
    console.log("in edit Existing");
    var user = request.body.user;
    var id = request.params.id;
    console.log("username: " + user.Username);
    console.log("id: " + id);
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
