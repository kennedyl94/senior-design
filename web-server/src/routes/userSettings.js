var express = require('express')
    , router = express.Router();

var  _dataServices = require('../userDataServices.js');
var config = require('../../config');
var bCrypt = require('bcrypt-nodejs');

var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

router.get('/user/:user', function(request, response) {

    var currentUser = request.params.user;
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
    // console.log("in add new in userSettings");
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
router.get('/userType/user/:user', function(request, response) {
    var currentUser = request.params.user;
    _dataServices.getUserByName(currentUser, function (usermap) {
        response.send(usermap.Type);

    }, function (err) {
        console.log(err);

    });
});
router.post("/updatePass", function (req, res) {
    // console.log(req.body.user);

    _dataServices.getUserByName(req.body.user, function (usermap){
        // console.log(usermap);
        // var pass  = createHash(req.body.old);
        // console.log(pass);
        if(req.body.newPass == req.body.repeat) {
            if(bCrypt.compareSync(req.body.old,usermap.Password))
            {
                usermap.Password = createHash(req.body.newPass);
                _dataServices.editUser(usermap,usermap._id,function () {
                    res.send(200);

                }, function (err) {
                    console.log(err)

                })
                console.log("woohoo correct");
            }
        }


    }, function (err) {
        console.log(err)

    });

    
});

module.exports = router;
