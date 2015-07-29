var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var insert = require('./insert.js');
var url = 'mongodb://localhost:27017/database1';
var monk = require('monk');
var db = monk('localhost:27017/database1');	
var insert_routes = require('./routes/index.js');
var shutdown = require('./routes/close-connection.js');
//express middleware parses incoming post requests and parses the json body; 
//returned output is stored in req.body, and is sent off to the next middleware
app.use(bodyParser());
app.use(function(req,res,next){
	req.db = db;
	next();
})
app.use('/',insert_routes);
app.use('/shutdown',shutdown);
//you can test the bodyParser output with this endpoint
//type this command in terminal: curl -d '{"kyle":"short"}' -H "content-type:application/json" localhost:8080/recieve

app.post('/recieve',function(req,res){
	console.log(req.body);
	res.send(req.body);
})
app.listen(8080,function(){
	console.log('im listening');
})
