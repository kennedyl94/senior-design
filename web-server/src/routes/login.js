var express = require('express')
    , router = express.Router();

var _dataServices = require('../userDataServices');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(_dataServices.authenticateUser));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    done(null, id);
});

router.post('/', function(request, response) {
    passport.authenticate('local', { session : true}, function(req, res) {
        if(res != false) {
            var user = {
                Username: res.Username,
                Orgs: res.Orgs,
                Type: res.Type
            };
            response.send({currentUser: user, code: 200});
        } else {
            response.sendStatus(401);
        }
    })(request, response);
});

module.exports = router;
