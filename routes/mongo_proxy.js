var express = require('express');
var router = express.Router();

module.exports = function(){
	return router.post('/',function(req,res){
		var mongodbClient = require('mongodb').MongoClient;
		var url = "mongodb://localhost:27017/data";
		var data = req.body;
		console.log(req.body);
		mongodbClient.connect(url,function(err,db){
			console.log('im here2');
			if(err){
				console.log('im here1');
				console.log(err);
			}
			else{
				console.log('im here3');
				// db.find({user:'bob'},function(err,data){
				// 	if(err){
				// 		console.log(err);
				// 	}
				// 	else{
				// 		console.log(data);
				// 	}
				// })
				var collection = db.collection('Users');
				collection.insert(req.body,function(err,pass){
					if(err){
						console.log(err);
					}
					console.log('SUCEESS');
					db.close();
				})
			}
		})
	});
}