var express = require('express');
var app = express();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var insert = require('./insert.js');
var url = 'mongodb://localhost:27017/database1';
var monk = require('monk');
var db = monk('localhost:27017/database1');	
var insert_routes = require('./routes/index.js');
var shutdown = require('./routes/close-connection.js');
//sample input for express
var input = {
	rapper: 'notorious'
}

app.use(function(req,res,next){
	req.db = db;
	next();
})
app.use(function(req,res,next){
	req.input = input;
	next();
})
app.use('/',insert_routes);
// app.get('/',function(req,res){
// 	res.send('bang bang');
// })
app.listen(8080,function(){
	console.log('im listening');
})
