var express = require('express')
  , router = express.Router();
  var  _dataServices = require('../orgDataServices.js');
  var _surveyData = require('../surveyDataServices.js');
 
//mock data until database is done 
// var questions = [
// 	{question: "do you like pie?",
// 	tags:["pie","cool","american"],
// 	id:0},
// 	{question: "do you like unicycling?",
// 	tags:["cool", "outdoors"],
// 	id:5},
// 	{question: "do you like dogs?",
// 	tags:["cool", "dogs"],
// 	id:6}
// ];

router.get('/', function (req, res) {
    // adding questions if there arnt any
    // this should be removed later
    // console.log("test");
    
    
    _surveyData.getAllQuestions(null, function(questionMap){
        // q = questionMap;
        // questionMap = hexToInt(questionMap);
        res.send(questionMap);
        // console.log(questionMap);
        // console.log(questionMap.length);
        
        if(!Object.keys(questionMap).length || questionMap.legnth <= 0)
        {
            console.log("should be adding");
            addMockData();
        }
        
    }, function(e){
        console.log("get in get"+e);
    });
    
    
   
    // console.log("test");
	
});

router.post("/", function (req, res) {

	// console.log("wubalubadubdub ");
	// var x = getOrgsFromAns(req.body)
	// var data = req.body;
	// console.log("posted: "+ JSON.stringify(req.body));
    
    //x will contain all ids of questions checked true
    var x =[];
    for (var i =0; i< Object.keys(req.body).length; i++) {
        if (req.body[Object.keys(req.body)[i]]){
            x.push(Object.keys(req.body)[i])
        }
    }
    // console.log(x);
    getOrgsFromAns(x);
	
	
});
function getQuestionsFromIDs(ids) {
    // console.log(Object.keys(ids).length);
    // var flag = false;
    var qs = [];
    var i =0;
    for (i; i < Object.keys(ids).length; i++) {
        // console.log(i+" : "+ids[Object.keys(ids)[i]]);
        qs.push(sync(ids[Object.keys(ids)[i]]));
        
    }
    
    // while(i-1>qs.length);
    // console.log("\n\nhullo");
    // console.log("\n\nget qs: "+qs[0]);
    return qs;
}


function getOrgsFromAns(ans) {
	var qs = getQuestionsFromIDs(ans);
    // console.log(qs);
    var tags = [];
    for(var i = 0;i< qs.length; i++) {
        for(var j = 0;j< qs[i].tags.length; j++) {
            // if(Object.keys(tags).indexOf(qs[i].tags[j])<0) {
           
            tags.push(qs[i].tags[j]);
                // tags[tags.indexOf(qs[i].tags[j])].value = 1;
            // } else {
            //     tags[tags.indexOf(qs[i].tags[j])].value += 1;
                
            // }
        }
    }
    console.log(tags);
    
    _dataServices.getAllOrgs(null, function(orgmap){
        console.log(Object.keys(orgmap).length);
        var matchOrgs =[];
        for(var i = 0; i <tags.length; i++)
        {
            for(var j = 0; j < Object.keys(orgmap).length; j++){
                if(orgmap[Object.keys(orgmap)[j]].keys[j].indexOf(tags[i])){
                    matchOrgs.push(orgmap[Object.keys(orgmap)[j]].keys[j])
                }
            }
        }
        console.log("num orgs: "+Object.keys(matchOrgs).length);
       
        
    }, function(e){
        console.log(e);
    });
	
}
//used as wrapper for get by id
function sync (id) {
    var sync = true;
    var data =null;
    _surveyData.getQuestionById(id, function(qmap, e){
       data = qmap;
       sync = false;
    });
    
    while(sync) {require('deasync').sleep(100);}
    return data;
    

    // if(i == ids.length) {
    //     flag = true;
    // }
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
