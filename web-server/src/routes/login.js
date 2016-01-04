var express = require('express')
    , router = express.Router();
var  _dataServices = require('../dataServices.js');
var mongoose = require('mongoose');
var config = require('../../config');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var admin = mongoose.model('users', mongoose.Schema(config.userSchema));

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log("in LocalStrategy");
        admin.findOne({Username:username, Password:password}, function(err,user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false, {message: 'Incorrect Username or Password'}); }
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
    passport.authenticate('local', function(req, res) {
        console.log("in authenticate. Res: " + res);
        if(res != false) {
            switch(res.Type) {
                case 'SL':
                    //todo allow access to create club pages, mass upload page, org specific pages
                    console.log("SL Admin");
                    break;
                case 'Org':
                    //todo allow access to org specific pages
                    console.log("Org Admin");
                    break;
            }
            response.sendStatus(200);
        } else {
            response.sendStatus(401);
        }
    })(request, response);
});

//router.get('/loginFailure/', function(req, res, next) {
//    console.log("in failure");
//    //res.sendStatus('Failed to authenticate');
//});
//
//router.get('/loginSuccess/', function(req, res, next) {
//    console.log("in success");
//    res.sendStatus(200);
//});

exports.addUser = function(user, success, error) {
    if(connected) {
        var newUser = new admin(user)
        newUser.save((function(err, savedUser){
            callback(err, savedUser._doc);
        }));
    } else {
        error(new Error('Not connected to database', null));
    }
}

module.exports = router;