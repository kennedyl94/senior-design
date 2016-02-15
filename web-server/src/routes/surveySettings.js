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
    _surveyData.deletequestion(req.body, function(){
        res.sendStatus(200);
    }, function(e){
        console.log('error deleting: '+e);
        res.send(500);
    })
    // res.sendStatus(200);
    
});
router.post('/add', function(req, res){
//    console.log(req.body);
   var tags = req.body.tags.split(',');
   
   for (var i = 0; i<tags.length; i++) {
       tags[i] = tags[i].trim();
   }
//    console.log(tags);
   
   req.body.tags = tags;
//    console.log(req.body);
   
   
   _surveyData.addQuestion(req.body, function(e){
       res.send(200);
        // console.log("add error: "+e);
   });
});

router.post('/questionNum', function(req, res){
//    console.log('num');
   console.log(req.body.num); 
});

module.exports = router;