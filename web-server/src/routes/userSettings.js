var express = require('express')
    , router = express.Router();

var  _dataServices = require('../userDataServices.js');
var config = require('../../config');
var bCrypt = require('bcrypt-nodejs');

var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

router.get('/user/:user', function(request, response) {
    console.log("is it here?");
    console.log(request.params.user);
    currentUser = request.params.user;
    _dataServices.getUserByName(currentUser, function (usermap){
        if (usermap.Type == "SL"){
            _dataServices.getAllUsers( //if they are a sl admin return all users
                function(users) {
                    response.send(users);
                }, function(err) {
                    console.log(err);
                });

        } else {
            response.send([usermap]);
        }

    }, function (err) {
        console.log(err)

        });

});

router.delete('/delete/:id', function(request, response) {
    var id = request.params.id;
    _dataServices.deleteUser(id,
        function() {
            response.sendStatus(200);
        }, function(error) {
           console.log(error);
        });
});

router.put('/addNew', function (request, response) {
    console.log("in add new in userSettings");
    var user = request.body.user;
    user.Password = createHash(user.Password);
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

module.exports = router;
