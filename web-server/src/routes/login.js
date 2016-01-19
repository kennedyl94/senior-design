var express = require('express')
    , router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var user = require('../models/model.user.js');

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log("in LocalStrategy");
        user.findOne({Username:username, Password:password}, function(err,user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: 'No User Found'});
            }
            //if(!user.validatePassword(password)) {
            //    return done(null, false, {message: 'Incorrect Password'});
            //}

            return done(null, user);
        })
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    done(null, user.id);
});

router.post('/', function (request, response) {
    console.log("trying to do stuff");
    passport.authenticate('local', { session : true}, function(req, res) {
        console.log("in authenticate. Res: " + res);
        if(res.status != false) {
            response.send({type: res.Type, code: 200});
        } else {
            response.sendStatus(401);
        }
    })(request, response);
});

router.get('/', function(request, response) {
    console.log("back end log out");
    request.logout();
    response.sendStatus(200);
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