var express = require('express')
  , router = express.Router();
  var  _dataServices = require('../orgDataServices.js');
  var _surveyData = require('../surveyDataServices.js');
 


router.get('/', function (req, res) {
    
    
    _surveyData.getAllQuestions(null, function(questionMap){
        
        res.send(questionMap);
        
        if(!Object.keys(questionMap).length || questionMap.legnth <= 0)
        {
            console.log("should be adding");
            addMockData();
        }
        
    }, function(e){
        console.log("get in get"+e);
    });
    
});

router.post("/", function (req, res) {
   var x =[];
   for (var i =0; i< Object.keys(req.body).length; i++) {
       if (req.body[Object.keys(req.body)[i]]){
           x.push(Object.keys(req.body)[i])
       }
   }
   var orgs = matchOrgs(x, function(orgs) {
       res.send(orgs);
   });
});

function matchOrgs(ids, callback) {
   getQuestionsTagsByIds(ids, function (tags) {
       //console.log(tags);
       getOrgsMatchingTags(tags, function(orgs) {
           callback(orgs);
       });
   });
}

function getQuestionsTagsByIds(ids, callback) {
   _surveyData.getQuestionsTagsByIds(ids, function(tags){
       callback(tags);
   });
}

function getOrgsMatchingTags(tags, callback) {
   _dataServices.getOrgsMatchingTags(tags, function(orgs) {
       callback(orgs);
   });
}



function getOrgsFromAns(ans, success) {
	var qs = getQuestionsFromIDs(ans);
    // console.log(qs);
    var tags = [];
    for(var i = 0;i< qs.length; i++) {
        for(var j = 0;j< qs[i].tags.length; j++) {
            // if(Object.keys(tags).indexOf(qs[i].tags[j])<0) {
           
            tags.push(qs[i].tags[j]);
             
        }
    }
    //console.log(tags);
    var matchOrgs = [];
    _dataServices.getAllOrgs(null, function(orgmap){
        //console.log(Object.keys(orgmap).length);

        //var matchOrgs =[];
        for(var i = 0; i <tags.length; i++) {
            // console.log("num orgs: "+ Object.keys(orgmap).length);
            for(var j = 0; j < Object.keys(orgmap).length; j++){
                //console.log("object at j: "+ orgmap[Object.keys(orgmap)[j]]);
                if(orgmap[ Object.keys(orgmap)[j] ].tags.indexOf(tags[i])>=0){
                    // console.log("matches: "+tags[i]);
                    if(matchOrgs.indexOf( orgmap[ Object.keys(orgmap)[j]] ) < 0) {
                        matchOrgs.push( orgmap[ Object.keys(orgmap)[j] ]);
                    }
                }
            }
        }

        console.log("num orgs: "+Object.keys(matchOrgs).length);
        success(matchOrgs);
       

    }, /*function(e){
        console.log(e);
    }*/null);
    //var matchOrgs =syncOrgs(tags);
    // matchOrgs.push({"hullo":"hullo"});
    //return matchOrgs;
}
/*
function syncOrgs(tags) {
    var sync = true;
    var data =null;
    

    while(sync) {require('deasync').sleep(100);}
    return data;
    
}*/
//used as wrapper for get by id
function syncQuestions (id) {
    var sync = true;
    var data =null;
    _surveyData.getQuestionById(id, function(qmap, e){
       data = qmap;
       sync = false;
    });
    
    while(sync) {require('deasync').sleep(100);}
    return data;
}

function addMockData()
{
    _surveyData.addQuestion(
        {question: "do you like pie",
        tags: ["pie","cool"],
        category: "String"},function(e){
        console.log("add 1"+e);
    });

        
    _surveyData.addQuestion(
        {question: "do you like unicycles",
        tags: [
            "unicycle","cool","outdoors"],
        category: "String"}
        , function(e){
        console.log("add 2"+e);
    });
    
}


module.exports = router;
