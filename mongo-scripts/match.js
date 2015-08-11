// var mongodb = require('mongodb');
// var MongoClient = mongodb.MongoClient;
var match = function(db,time,count,arrayobj,callback){
	var aggr_count = require('./aggregate-count.js');
	if(count==2){
		var results = arrayobj;
		console.log("completed match jsons");
		console.log(results);
		callback(results);
	}
	else{
		db.collection('test').update({timesubmitted:time},{$set:{status:"matched"}},function(error){
			if(error){
				console.log(error);			
			}
			db.collection('test').find({timesubmitted:time}).forEach(function(results){
				arrayobj.push(results.id);
				count++;
				aggr_count(db,function(results){
					var data = results[0];
					var submitted = data.earliest;
					match(db,submitted,count,arrayobj,callback);	
				})
			});
		});
	}
}
module.exports = match;
