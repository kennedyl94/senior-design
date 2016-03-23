var express = require('express')
  , router = express.Router()
  
var  _dataServices = require('../orgDataServices.js');
var _surveyData = require('../surveyDataServices.js');
var jsonfile = require('jsonfile')
var surveyFile ="./surveySettings.json";
var surveyFile2 ="../surveySettings.json";
 
 


var orgs;

  _dataServices.getAllOrgs(null, function(orgsMap){
	  orgs =orgsMap;
  },
  function(e)
  {
	  console.log(e);
  });

router.get('/', function (req, res) {
    try {
        var surveySet = jsonfile.readFileSync(surveyFile);
    }
    catch(e) {
        var surveySet = jsonfile.readFileSync(surveyFile2);
    }
    _surveyData.getOrgsMatchingCategory('test', function (q) {
        console.log(q);
    })
    
    _surveyData.getAllQuestions(null, function(questionMap){
        if(Object.keys(questionMap).length <= surveySet.num) {
            res.send(questionMap);
        } else {
            var qmap2 =[];
            for(var i = 0; i< surveySet.num; i++) {
                qmap2.push(questionMap[Object.keys(questionMap)[i]]);
            }
            res.send(qmap2);
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
/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}



module.exports = router;
