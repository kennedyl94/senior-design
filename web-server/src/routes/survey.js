var express = require('express')
  , router = express.Router()
  
var  _dataServices = require('../orgDataServices.js');
 
//mock data until database is done 
var questions = [
	{text: "do you like pie?",
	tags:["pie","cool","american"],
	id:0},
	{text: "do you like unicycling?",
	tags:["cool", "outdoors"],
	id:5}
];
var tags = ["cool", "outdoors", "pie", "american"];
var orgs;

  _dataServices.getAllOrgs(null, function(orgsMap){
	  orgs =orgsMap;
  },
  function(e)
  {
	  console.log(e);
  });
router.get('/', function (req, res) {

	// res.send("<html><body>		<form method = post>			<input type=\"checkbox\" name=\"_0\" value=\"true\"> do you like pie<br>			<button type = submit> submit</button> 		</form>	</body></html>")
	res.send(questions);
	// console.log("test");
	
});
router.post("/", function (req, res) {

	// console.log("wubalubadubdub ");
	// var x = getOrgsFromAns(req.body)
	var data = req.body;
	console.log(req.body)
// 	data.forEach(function (item) {
//        console.log(item.id);
//        console.log(item.Name);
//    });
	
	

});

function getOrgsFromAns(body)
{
	
	
}

module.exports = router;
