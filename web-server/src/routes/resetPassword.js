var express = require('express')
    , router = express.Router();

var _dataServices = require('../userDataServices');

router.post('/', function(req, res, next) {
    console.log("Hi, there!");
    next();
});

module.exports = router;
