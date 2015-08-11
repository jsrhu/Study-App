var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
MongoClient.connect('mongodb://localhost:27017/database1',function())
	db.users.find(function(err,results){
		if(err){
			console.log('Works but error: '+err);
		}
		else{
			console.log(results);
		}
	})