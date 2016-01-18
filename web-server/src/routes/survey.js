var express = require('express')
  , router = express.Router();
  var  _dataServices = require('../orgDataServices.js');
  var _surveyData = require('../surveyDataServices.js');
 
//mock data until database is done 
var questions = [
	{question: "do you like pie?",
	tags:["pie","cool","american"],
	id:0},
	{question: "do you like unicycling?",
	tags:["cool", "outdoors"],
	id:5},
	{question: "do you like dogs?",
	tags:["cool", "dogs"],
	id:6}
];

router.get('/', function (req, res) {
    // adding questions if there arnt any
    // this should be removed later
    console.log("test");
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
        
     
        
    var q;
    _surveyData.getAllQuestions("", function(questionMap){
        q = questionMap;
        
    }, function(e){
        console.log("get in get"+e);
    });
    res.send(q);
    console.log(q);
   
    // console.log("test");
	
});

router.post("/", function (req, res) {

	// console.log("wubalubadubdub ");
	// var x = getOrgsFromAns(req.body)
	var data = req.body;
	console.log(data)
	var yes = getIDFromPost(data)
    var questions =[];
    var i =0;
    for (i; i< yes.length; i++) {
        
        var q;
        _surveyData.getQuestionById(yes[i], function(questionMap){
            q = questionMap;
            questions.push(q);
        }, function(e){
            console.log(e);
        });
       
    }
    var tags =[];
    i =0;
    for(i; i<questions.length; i++) {
        var j= 0;
        for (j; j<questions[i].tags.length; j++) {
            var k=0;
            for(k; k< tags.length; k++) {
                if(tags[k] == questions[i].tags[j]) {
                    tags.splice(tags[k],1);
                }
            }
            tags.push(questions[i].tags[j]);
        }
    }
    console.log(tags);
    
	// console.log(yes);
// 	data.forEach(function (item) {
//        console.log(item.id);
//        console.log(item.Name);
//    });
	
	
});
function getIDFromPost(arr){
	var yes =[];
	var i =0;
	for(i; i<arr.length; i++){
		if(arr[i]!=null && arr[i]==true){
			yes.push(i)
		}
	}
	return yes;
	
}

function getOrgsFromAns(ans)
{
	
	
}

module.exports = router;
