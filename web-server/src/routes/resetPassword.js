var express = require('express')
    , router = express.Router();

var bcrypt = require('bcrypt-nodejs');

var _dataServices = require('../userDataServices');

router.post('/sendReset', function(req, res, next) {
  _dataServices.createResetToken(req.body.username, req.body.email, function(err, token){
    if(err){
      req.body.token = null;
      next();
    }
    else{
      req.body.token = token;
      next();
    }
  });
});

router.get('/checkValidToken/:token', function(req, res){
  //TODO
  var token = req.params.token
  _dataServices.checkValidToken(token, function(err, found){
    if(found){
      res.send(200);
    }
    else{
      res.send(404);
    }
  });
});

router.post('/', function(req, res){
  bcrypt.hash(req.body.password, bcrypt.genSaltSync(10), null, function(err, hashedPassword){
    _dataServices.setPasswordByToken(req.body.token, hashedPassword, function(err, savedUser){
      res.send(200);
    });
  });
});

module.exports = router;
