var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	var db = req.db;
	var collection = db.get('users');
	var input = req.input;
	collection.insert(input,function(err,cb){
		console.log('IM in');
		if(err){
			console.log(err);
		}
		else{
			console.log('FINISHED INSERTING');
		}
	})
});

module.exports = router;
