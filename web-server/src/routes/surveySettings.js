var express = require('express')
  , router = express.Router();
  var  _dataServices = require('../orgDataServices.js');
  var _surveyData = require('../surveyDataServices.js');
  var jsonfile = require('jsonfile')
  var surveyFile ="./surveySettings.json";
 


router.get('/', function (req, res) {

    _surveyData.getAllQuestions(null, function(questionMap){
        
        res.send(questionMap);
        
        if(!Object.keys(questionMap).length || questionMap.legnth <= 0)
        {
            console.log("should be adding");
           
        }
        
    }, function(e){
        console.log("get in get"+e);
    });
    
});
router.get('/num', function (req, res){
    var surveySet = jsonfile.readFileSync(surveyFile);
    console.log(surveySet.num);
    res.send({num: surveySet.num});
    
    
})
router.delete('/', function(req, res) {

    _surveyData.deletequestion(req.body, function(){
        res.sendStatus(200);
    }, function(e){
        console.log('error deleting: '+e);
        res.send(500);
    })
    
});
router.post('/add', function(req, res){

   var tags = req.body.tags.split(',');
   
   for (var i = 0; i<tags.length; i++) {
       tags[i] = tags[i].trim();
   }
   
   req.body.tags = tags;

   
   
   _surveyData.addQuestion(req.body, function(e){
       res.send(200);
   });
   
});

router.post('/addrule', function(req, res){
    console.log(req.body);
    var surveySet = jsonfile.readFileSync(surveyFile);
    console.log(surveySet.rules);
    surveySet.rules.push({
        'category':req.body.category,
        'num':req.body.num
    });
    jsonfile.writeFileSync(surveyFile, surveySet);
    res.send(200);
    
});
router.get('/getrules', function (req, res) {
    var surveySet = jsonfile.readFileSync(surveyFile);
    console.log(surveySet.rules);
    res.send(surveySet.rules);
    
});

router.post('/questionNum', function(req, res){
    var surveySet = jsonfile.readFileSync(surveyFile);
    surveySet.num = req.body.num;
    
    jsonfile.writeFileSync(surveyFile, surveySet)
    res.send(200);
   
   
});

module.exports = router;