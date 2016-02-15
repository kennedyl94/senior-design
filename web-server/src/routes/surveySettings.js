var express = require('express')
  , router = express.Router();
  var  _dataServices = require('../orgDataServices.js');
  var _surveyData = require('../surveyDataServices.js');
 


router.get('/', function (req, res) {
    
    // console.log("surveySet");
    _surveyData.getAllQuestions(null, function(questionMap){
        
        res.send(questionMap);
        // console.log(questionMap);
        
        if(!Object.keys(questionMap).length || questionMap.legnth <= 0)
        {
            console.log("should be adding");
           
        }
        
    }, function(e){
        console.log("get in get"+e);
    });
    
});
router.delete('/', function(req, res) {
    console.log("delete");
    console.log(req.body);
    res.sendStatus(200);
    
});

module.exports = router;