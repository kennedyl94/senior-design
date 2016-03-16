var express = require('express')
  , router = express.Router();
  var  _dataServices = require('../orgDataServices.js');
  var _surveyData = require('../surveyDataServices.js');
  var jsonfile = require('jsonfile')
  var surveyFile ="./surveySettings.json";
  var surveyFile2 ="../surveySettings.json";
 


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
    try {
        var surveySet = jsonfile.readFileSync(surveyFile);
    }
    catch(e) {
        var surveySet = jsonfile.readFileSync(surveyFile2);
    }
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
    try {
        var surveySet = jsonfile.readFileSync(surveyFile);
    }
    catch(e) {
        var surveySet = jsonfile.readFileSync(surveyFile2);
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
    try {
        var surveySet = jsonfile.readFileSync(surveyFile);
    }
    catch(e) {
        var surveySet = jsonfile.readFileSync(surveyFile2);
    }
    console.log(surveySet.rules);
    res.send(surveySet.rules);
    
});
router.delete('/delrule', function (req, res) {
    // console.log('delete');
    // console.log(req.body[0]);
    var r = req.body[0];
    try {
        var surveySet = jsonfile.readFileSync(surveyFile);
    }
    catch(e) {
        var surveySet = jsonfile.readFileSync(surveyFile2);
    }
    console.log(r);
    console.log(Object.keys(surveySet.rules).length);
    console.log(surveySet.rules.indexOf(r));
    
    var index = -1;
    var i =0;
    
    for(i = 0; i < Object.keys(surveySet.rules).length; i++) {
        if(surveyFile.rules[i].category == r.category &&
            surveyFile.rules[i].num ==r.num) {
                index = i;
            }
    }//TODO: fix this shit!!!!! fuck javascript arrays!!!
    console.log(index);
    
    
    res.send(200);
    
})

router.post('/questionNum', function(req, res){
   try {
        var surveySet = jsonfile.readFileSync(surveyFile);
    }
    catch(e) {
        var surveySet = jsonfile.readFileSync(surveyFile2);
    }
    surveySet.num = req.body.num;
    
    jsonfile.writeFileSync(surveyFile, surveySet)
    res.send(200);
   
   
});

module.exports = router;