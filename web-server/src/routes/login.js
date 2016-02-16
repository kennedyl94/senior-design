var express = require('express')
    , router = express.Router();

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

module.exports = router;