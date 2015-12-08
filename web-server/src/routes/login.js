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
            console.log(username);
            console.log(password);
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
})

router.post('/', function (req, res, next) {
    console.log("trying to do stuff");
    passport.authenticate('local', {
        successRedirect: 'login/loginSuccess/',
        failureRedirect: 'login/loginFailure/'
    })(req, res, next);
});

router.get('/loginFailure/', function(req, res, next) {
    console.log("in failure");
    res.send('Failed to authenticate');
});

router.get('/loginSuccess/', function(req, res, next) {
    console.log("in success");
    res.send('Successfully authenticated');
    //return res.redirect('/')
});

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