// var mongodb = require('mongodb');
// var MongoClient = mongodb.MongoClient;
var aggr_count = function(db, callback){
	db.collection('test').aggregate(
		[
			{
				$match:{status:"unmatched"}
			},
			{
				$group:{
				_id:"$type",
				earliest: {$min:"$timesubmitted"}
				}
			}
		],
		function(err,results){
			callback(results);
		}
	);
}
// var MongoClient = require('mongodb').MongoClient;
// var ObjectId = require('mongodb').ObjectID;
// var MongoUrl = 'mongodb://localhost:27017/database1';

// MongoClient.connect(MongoUrl,function(err,db){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		//console.log('connection success');
// 		//var results = 
// 		db.collection('test').find({status:"matched"},function(err,res){
// 			res.forEach(function(result){
// 				console.log(result);
// 				db.close();
// 			});
// 		});
// 	}
// });
module.exports = aggr_count;
