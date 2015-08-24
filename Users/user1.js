var express = require('express');
var app = express();
var path = require('path');
app.get('/interface',function(req,res){
	res.sendFile(path.join(__dirname,'/index.html'));
})
app.listen(8081,function(){
	console.log('listening...');
})