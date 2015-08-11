var query = function(db, collection, callback){
	var aggr_count = require('./mongo-scripts/aggregate-count.js');
	var match = require('./mongo-scripts/match.js');
	//define query to find two values that have the longest time spent in the database
	//first execute query to find the earliest date
	var arrayobj = [];
	var returnjson = {
		id1:null,
		id2:null
	};
	aggr_count(db,function(results){
		console.log('sending callback');
		var data = results[0];
		console.log(data.earliest);
		var submitted = data.earliest;
		match(db,submitted,0,arrayobj,function(results){
			console.log("final array: ");
			console.log(results);
			for(i=0;i<2;i++){
				if(i==0){
					returnjson.id1 = results[i];
				}
				if(i==1){
					returnjson.id2 = results[i];
				}
			}
			console.log(returnjson);
			callback(returnjson);

		})
	});
	
}
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
MongoClient.connect('mongodb://localhost:27017/database1',function(err,db){
	if(err){
		console.log(err);
	}
	else{
		console.log('connection success');
		query(db,'test',function(results){
			console.log('aggregation success');
			console.log(results);
			// db.close();
		});
	}
});
module.exports = query;