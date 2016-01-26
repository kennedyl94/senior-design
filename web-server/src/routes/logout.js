var express = require('express')
    , router = express.Router();

router.get('/', function(request, response) {
    request.logout();
    response.sendStatus(200);
});

module.exports = router;