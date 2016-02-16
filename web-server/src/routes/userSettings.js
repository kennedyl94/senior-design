var express = require('express')
    , router = express.Router();

var  _dataServices = require('../userDataServices.js');

router.get('/', function(request, response) {
    _dataServices.getAllUsers(
        function(users) {
            response.send(users);
        }, function(err) {
            console.log(err);
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

module.exports = router;
