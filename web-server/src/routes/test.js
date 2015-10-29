var express = require('express')
  , router = express.Router()
  
router.get('/', function (req, res) {

	res.send("<html><body>		<form method = post>			<textarea name = 'hi'>hullo</textarea>			<button type = submit> submit</button> 		</form>	</body></html>")
	console.log("test");
	
});
router.post("/", function (req, res) {

	console.log("wubalubadubdub "+req.body.hi);
	
	res.send("wubalubadubdub");
});

module.exports = router;