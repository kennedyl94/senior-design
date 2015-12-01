var express = require('express')
  , router = express.Router()
  
var  _dataServices = require('../dataServices.js');
 
//mock data until database is done 
var questions = [
	{question: "do you like pie?",
	tags:["pie","cool","american"],
	id:0},
	{question: "do you like unicycling?",
	tags:["cool", "outdoors"],
	id:1}
];
var tags = ["cool", "outdoors", "pie", "american"];
var orgs;

  _dataServices.getAllOrgs(null, function(orgsMap){
	  orgs =orgsMap;
  }),
  function(e)
  {
	  console.log(e);
  }
router.get('/', function (req, res) {

	// res.send("<html><body>		<form method = post>			<input type=\"checkbox\" name=\"_0\" value=\"true\"> do you like pie<br>			<button type = submit> submit</button> 		</form>	</body></html>")
	res.send(questions);
	console.log("test");
	
});
router.post("/", function (req, res) {

	console.log("wubalubadubdub "+req.body._0);
	var x = getOrgsFromAns(req.body)
	
	res.send("wubalubadubdub");
});

function getOrgsFromAns(body)
{
	
}

module.exports = router;