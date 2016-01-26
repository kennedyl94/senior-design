var express = require('express')
    , router = express.Router();

router.get('/', function(request, response) {
    console.log("back end log out");
    request.logout();
    response.sendStatus(200);
});

module.exports = router;