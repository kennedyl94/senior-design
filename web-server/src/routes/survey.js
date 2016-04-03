var express = require('express')
  , router = express.Router()
  
var  _dataServices = require('../orgDataServices.js');
var _surveyData = require('../surveyDataServices.js');
var jsonfile = require('jsonfile')
var surveyFile =__dirname+"/../../surveySettings.json";
// var surveyFile2 ="../surveySettings.json";
 
 


var orgs;

  _dataServices.getAllOrgs(null, function(orgsMap){
	  orgs =orgsMap;
  },
  function(e)
  {
	  console.log(e);
  });
function getQbyCat(i, rules, qret,num, res) {
    
    
    // console.log('i: '+i);
    // console.log('i num: '+rules[i].num);
    
    _surveyData.getOrgsMatchingCategory(rules[i].category, function (q) {
        // console.log("unshuffled");
        // console.log(q);
        shuffle(q);
        // console.log("shuffled!");
        // console.log(q);
        
        
        for(var j = 0; j< rules[i].num; j++) {
            qret.push(q[Object.keys(q)[j]]);
            // console.log(q[Object.keys(q)[j]]);
        }
        i++;
        if(i<rules.length) {
            getQbyCat(i,rules, qret, num, res);
        } else {
           if(qret.length >= num){
            //    console.log(qret);
                res.send(qret);
           } else {
               console.log("num: "+num);
               console.log('qret len: '+qret.length);
               console.log(qret.legnth < num);// WHY THE FUCK IS THIS ALWAYS FALSE!!!!
               
               _surveyData.getAllQuestions(null, function(questionMap){
                   shuffle(questionMap);
                   for(var j = 0; qret.legnth < num; j++) {
                       console.log("pushing");
                        qret.push(questionMap[Object.keys(questionMap)[j]]);
                    }
                    // console.log(qret);
                   res.send(qret);
               });
           }
           
        }
        // console.log(qret);
        
            
        
    });
    
    

}
router.get('/', function (req, res) {
    var surveySet = jsonfile.readFileSync(surveyFile);
    
    console.log('num: '+surveySet.num);
    
    qSet = getQbyCat(0, surveySet.rules,[],surveySet.num, res);
    
    
    
    
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
