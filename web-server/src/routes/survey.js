var express = require('express')
  , router = express.Router();
  
var  _dataServices = require('../orgDataServices.js');
var _surveyData = require('../surveyDataServices.js');
var jsonfile = require('jsonfile');
var surveyFile =__dirname+"/../../surveySettings.json";

var orgs;

_dataServices.getAllOrgs(null, function(orgsMap){
	  orgs = orgsMap;
  },
  function(e)
  {
	  console.log(e);
  }
);

function getQbyCat(i, rules, qret,num, res) {

    _surveyData.getOrgsMatchingCategory(rules[i].category, function (q) {
        shuffle(q);

        for(var j = 0; j< rules[i].num && j < Object.keys(q).length; j++) {
            qret.push(q[Object.keys(q)[j]]);
        }
        i++;
        if(i<rules.length) {
            getQbyCat(i,rules, qret, num, res);
        } else {
           if(qret.length >= num){
                res.send(qret);
           } else {
               _surveyData.getAllQuestions(null, function(questionMap){
                   shuffle(questionMap);
                   for(var j = 0; parseInt(qret.length) < num && j< Object.keys(questionMap).length; j++) {
                       if(!arrContains(qret, questionMap[Object.keys(questionMap)[j]] ) ){
                        qret.push(questionMap[Object.keys(questionMap)[j]]);
                        }
                    }
                   shuffle(qret);
                   res.send(qret);
               });
           }
           
        } 
    });
}
function arrContains(arr, x){
    for(var i = 0; i<arr.length; i++){
        if (arr[i]._id.equals(x._id)){
            return true;
        }
    }
    return false;
}
router.get('/', function (req, res) {
    var surveySet = jsonfile.readFileSync(surveyFile);

    if(surveySet.rules.length >0) {
        getQbyCat(0, surveySet.rules, [], surveySet.num, res);
    } else {
        _surveyData.getAllQuestions(null, function(questionMap){
           var qret = [];
            for(var j = 0; parseInt(qret.length) < surveySet.num && j < Object.keys(questionMap).length; j++) {
                if(!arrContains(qret, questionMap[Object.keys(questionMap)[j]] ) ){
                    qret.push(questionMap[Object.keys(questionMap)[j]]);
                }
            }
            shuffle(qret);
            res.send(qret);
        });
    }
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
   _dataServices.searchByTags(tags, function(orgs) {
       callback(orgs);
   });
}
/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = Object.keys(a).length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[Object.keys(a)[i - 1]];
        a[Object.keys(a)[i - 1]] = a[Object.keys(a)[j]];
         a[Object.keys(a)[j]] = x;
    }
}

module.exports = router;