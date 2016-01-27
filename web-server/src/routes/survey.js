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
    console.log(x);
    getOrgsFromAns(x);
	
	
});
function getQuestionsFromIDs(ids) {
    console.log(Object.keys(ids).length);
    // var flag = false;
    var qs = [];
    for (var i = 0; i < Object.keys(ids).length; i++) {
        console.log(i+" : "+ids[Object.keys(ids)[i]]);
        _surveyData.getQuestionById(ids[Object.keys(ids)[i]].toString(), function(qmap, e) {
            console.log("get qs:"+ qmap);
            qs.push(qmap);
            
            // if(i == ids.length) {
            //     flag = true;
            // }
        });
        
    }
    // while(!flag);
    console.log(qs);
    return qs;
}
function getOrgsFromAns(ans) {
	var qs = getQuestionsFromIDs(ans);
    console.log(qs);
	
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
