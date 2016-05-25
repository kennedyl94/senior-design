var express = require('express')
  , router = express.Router();
  var _surveyData = require('../surveyDataServices.js');
  var jsonfile = require('jsonfile')
  var surveyFile =__dirname+"/../../surveySettings.json";

router.get('/', function (req, res) {
    _surveyData.getAllQuestions(null, function(questionMap) {
        res.send(questionMap);
        
        if(!Object.keys(questionMap).length || questionMap.legnth <= 0) {
            //console.log("should be adding");
        }
        
    }, function(e){
        if (e) {console.log("get in get"+e);}
    });
});

router.get('/num', function (req, res){
    var surveySet = jsonfile.readFileSync(surveyFile);
    res.send({num: surveySet.num});
});

router.delete('/', function(req, res) {
    _surveyData.deletequestion(req.body, function(){
        res.sendStatus(200);
    }, function(e){
        if (e) {console.log('error deleting: '+e);}
        res.send(500);
    })
});

router.post('/add', function(req, res){
    _surveyData.addQuestion(req.body, function(e){
       res.sendStatus(200);
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

    if (index != -1) {
        surveySet.rules.splice(index, 1);
        jsonfile.writeFileSync(surveyFile, surveySet);
    }

    surveySet.rules.push({
        'category':req.body.category,
        'num':req.body.num
    });
    jsonfile.writeFileSync(surveyFile, surveySet);
    res.send(200);
});

router.get('/getrules', function (req, res) {
    var surveySet = jsonfile.readFileSync(surveyFile);
    res.send(surveySet.rules);
});

router.delete('/delrule', function (req, res) {
    var r = req.body[0];
    var surveySet = jsonfile.readFileSync(surveyFile);
    var index = -1;
    var i =0;
    
    for (i = 0; i < Object.keys(surveySet.rules).length; i++) {
        if(surveySet.rules[i].category === r.category) {
                index = i;
            }
    }

    if (index != -1) {
        surveySet.rules.splice(index, 1);
        jsonfile.writeFileSync(surveyFile, surveySet);
        res.send(200);
    } else {
        res.send(410); 
        //410 gone. Indicates that the resource requested is no longer
        //available and will not be available again.
    }
});

router.post('/questionNum', function(req, res) {
    var surveySet = jsonfile.readFileSync(surveyFile);
    surveySet.num = req.body.num;

    jsonfile.writeFileSync(surveyFile, surveySet)
    res.send(200);
});

module.exports = router;