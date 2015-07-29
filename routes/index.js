var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
	var db = req.db;
	var collection = db.get('users');
	var input = req.body;
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
