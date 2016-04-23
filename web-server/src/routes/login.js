var express = require('express')
    , router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/model.user.js');
var bCrypt = require('bcrypt-nodejs');

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log("username: " + username);
        User.findOne({ 'Username' :  username },
            function(err, user) {
                console.log(user);
                if (err)
                    return done(err);
                if (!user){
                    console.log('User Not Found with username '+username);
                    return done(null, false, {message: 'No User Found'});
                }
                if (!isValidPassword(user, password)){
                    console.log('Invalid Password');
                    return done(null, false, {message: 'Invalid Password'});
                }
                return done(null, user);
            }
        );
    })
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    done(null, id);
});

var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.Password);
};

router.post('/', function(request, response) {
    passport.authenticate('local', { session : true}, function(req, res) {
        if(res != false) {
            var user = new User({
                Username: res.Username,
                Orgs: res.Orgs,
                Type: res.Type
            });
            response.send({currentUser: user, code: 200});
        } else {
            response.sendStatus(401);
        }
    })(request, response);
});

module.exports = router;
