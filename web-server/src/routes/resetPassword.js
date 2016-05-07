var express = require('express')
    , router = express.Router();

var _dataServices = require('../userDataServices');

router.post('/', function(req, res, next) {
  _dataServices.createResetToken(req.body.Username, req.body.email, function(err, token){
    if(err){
      next(null);
    }
    else{
      next(token);
    }
  });
});

module.exports = router;
