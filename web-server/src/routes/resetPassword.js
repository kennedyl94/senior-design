var express = require('express')
    , router = express.Router();

var _dataServices = require('../userDataServices');

router.post('/', function(req, res, next) {

    next();
});

module.exports = router;
