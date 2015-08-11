var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
	var db = req.db;
	var collection = db.get('users');
	for(i=0;i<20;i++){
		var input = {
			id:i,
			timesubmitted:String(Math.random()).split('0.')[1]
		}
		collection.insert(input,function(err,cb){
			console.log('IM in');
			if(err){
				console.log(err);
			}
			else{
				console.log('FINISHED INSERTING');
			}
		})
	}
});

module.exports = router;
