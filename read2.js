var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.get('/',function(req,res){
	// res.status(200).send('connection success');
	res.send('HELLOW MUTHAFUCKA');
	console.log(req.body);
});
app.listen(3000,function(){
	console.log('im listening');
})