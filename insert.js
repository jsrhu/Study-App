module.exports = function(db, input, collection, cb){
	collection.insert(input, function(err,result){
		if(err){
			console.log('error inserting: ' + err);
		}
		else{
			console.log(input + " successfully inserted into collection "+ collection);
			cb(result);
		}
	})
}