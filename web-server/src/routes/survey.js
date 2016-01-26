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
	console.log("posted: "+ req.body);
    
	// var yes = getIDFromPost(data);
    // var questions =[];
    // var i =0;
    // for (i; i< yes.length; i++) {
        
        
    //     _surveyData.getQuestionById(yes[i], function(questionMap){
           
    //         questions.push(questionMap);
    //         if(i == yes.length) {
    //             questions = questions.sort();
    //         }
    //     }, function(e){
    //         console.log(e);
    //     });
       
    // }
    // console.log("questions: "+questions);
    // var tags =[];
    // i =0;
    // for(i; i<questions.length; i++) {
    //     var j= 0;
    //     for (j; j<questions[i].tags.length; j++) {
    //         var k=0;
    //         for(k; k< tags.length; k++) {
    //             if(tags[k] == questions[i].tags[j]) {
    //                 tags.splice(tags[k],1);
    //             }
    //         }
    //         tags.push(questions[i].tags[j]);
    //     }
    // }
    // console.log(tags);
    
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
function hexToInt(arr){
    var i =0;
    console.log("hti length:"+Object.keys(arr).length);
    for(i; i < Object.keys(arr).length; i++){
        console.log(Object.keys(arr)[i]);
        Object.keys(arr)[i]._id = parseInt(Object.keys(arr)[i]._id, 16);
        
    }
    // console.log(arr);
    return arr;
}
function intToHex(arr){
    var i =0;
    console.log("hti length:"+arr.length);
    for(i; i < arr.length; i++){
        // hexString = yourNumber.toString(16)
        arr[i]._id = arr[i]._id.toString(16);
    }
    return arr;
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
