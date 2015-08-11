var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var monk = require('monk');
// var db = monk('localhost:27017/database1');	
var insert_routes = require('./routes/index.js');
var shutdown = require('./routes/close-connection.js');
var remove = require('./routes/delete.js');
var query = require('./query.js');
//express middleware parses incoming post requests and parses the json body; 
//returned output is stored in req.body, and is sent off to the next middleware

MongoClient.connect('mongodb://localhost:27017/database1',function(err,db){
	if(err){
		console.log(err);
	}
	setInterval(function(){
		query(db,'test',function(results){
			console.log('query results: ');
			console.log(results);
		})
	},3000);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function(req,res,next){
	req.db = db;
	next();
});
app.use('/',insert_routes);
app.use('/shutdown',shutdown);
// app.use('/delete',remove)
//you can test the bodyParser output with this endpoint
//type this command in terminal: curl -d '{"kyle":"short"}' -H "content-type:application/json" localhost:8080/recieve

app.post('/recieve',function(req,res){
	console.log(req.body);
	res.send(req.body);
})
app.listen(8080,function(){
	console.log('im listening');
})
