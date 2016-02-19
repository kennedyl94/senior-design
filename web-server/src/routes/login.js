var express = require('express')
    , router = express.Router();

var  _dataServices = require('../orgDataServices.js');
var mongoose = require('mongoose');
var config = require('../../config');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var user = require('../models/model.user.js');

passport.use(new LocalStrategy(
    function(username, password, done) {
        user.findOne({Username:username, Password:password}, function(err,user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: 'No User Found'});
            }
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
    passport.authenticate('local', { session : true}, function(req, res) {
        if(res != false) {
            response.send({type: res.Type, code: 200});
        } else {
            response.sendStatus(401);
        }
    })(request, response);
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
