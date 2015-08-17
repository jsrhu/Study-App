var express = require('express');
var router = express.Router();
module.exports = function(Users){
	return router.get('/',function(req,res){
		res.send('im in here1');
		console.log('im in');
		for(i=0;i<20;i++){
			console.log('im in 20');
			var input = {
				id:i,
				timesubmitted:String(Math.random()).split('0.')[1]
			}
			Users.push(input);
		}
	});
}