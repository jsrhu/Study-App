var express = require('express');
var router = express.Router();

router.get('/', function(req,res){
	console.log('Shutting down connection');
	var db = req.db	;
	db.close();
})

module.exports = router;