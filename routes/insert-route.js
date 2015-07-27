var express = require('express');
var router = express.Router();

router.get('/insert',function(req,res,next){
	res.send('inserting...');
})

module.exports = router;
