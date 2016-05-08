var express = require('express')
    , router = express.Router();

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

module.exports = router;
