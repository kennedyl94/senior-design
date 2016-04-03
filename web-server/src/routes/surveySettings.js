var express = require('express')
  , router = express.Router();
  var  _dataServices = require('../orgDataServices.js');
  var _surveyData = require('../surveyDataServices.js');
  var jsonfile = require('jsonfile')
  var surveyFile =__dirname+"/../../surveySettings.json";
//   var surveyFile2 ="../surveySettings.json";
 


router.get('/', function (req, res) {
    console.log(__filename);
    console.log(__dirname);
    

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
   var surveySet = jsonfile.readFileSync(surveyFile);
    
    var index = -1;
    var i =0;
    
    for(i = 0; i < Object.keys(surveySet.rules).length; i++) {
        
        if(surveySet.rules[i].category === req.body.category) {
                index = i;
            }
    }
    // console.log('index' + index);
    
    
    if(index != -1) {
        surveySet.rules.splice(index, 1);
        jsonfile.writeFileSync(surveyFile, surveySet);
        
    } 
    
    
    
    
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
    
    // console.log(surveySet.rules);
    res.send(surveySet.rules);
    
});
router.delete('/delrule', function (req, res) {
    // console.log('delete');
    // console.log(req.body[0]);
    var r = req.body[0];
    
    var surveySet = jsonfile.readFileSync(surveyFile);
    
    // console.log(r);
    // console.log(Object.keys(surveySet.rules).length);
    // console.log(typeof(surveySet.rules));
    // console.log(surveySet.rules[0]);
    
    
    var index = -1;
    var i =0;
    
    for(i = 0; i < Object.keys(surveySet.rules).length; i++) {
        // console.log(surveySet.rules[i]);
        if(surveySet.rules[i].category === r.category) {
                index = i;
            }
    }
    console.log('index' + index);
    
    
    if(index != -1) {
        surveySet.rules.splice(index, 1);
        jsonfile.writeFileSync(surveyFile, surveySet);
        res.send(200);
    } else {
        res.send(410); 
        //410 gone. Indicates that the resource requested is no longer
        //available and will not be available again.
    }
    
    
    
})

router.post('/questionNum', function(req, res){
   var surveySet = jsonfile.readFileSync(surveyFile);
   
    console.log(req.body.num);
    surveySet.num = req.body.num;
    
    jsonfile.writeFileSync(surveyFile, surveySet)
    res.send(200);
   
   
});

module.exports = router;