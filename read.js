var db = require('./testconnection.js');
db.users.find(function(err,results){
	if(err){
		console.log('Works but error: '+err);
	}
	else{
		console.log(results);
	}
})