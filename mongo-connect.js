//server
var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//routes
var insert_routes = require('./routes/index.js');
var generate_random = require('./routes/randomdata.js');
var port = process.env.PORT || 8080
var bodyParser = require('body-parser');
// var shutdown = require('./routes/close-connection.js');
// var remove = require('./routes/delete.js');
// var query = require('./query.js');
// //express middleware parses incoming post requests and parses the json body; 
//returned output is stored in req.body, and is sent off to the next middleware
var Users = [];
app.use('/views',express.static(path.join(__dirname, 'html')));

app.get('/interface',function(req,res){
  res.render(path.join(__dirname,'html','index.html'));
})
app.get('/',function(req,res){
	res.send('HELLO THERE');
	console.log('I HIT HEROKU');
})
app.get('/print',function(req,res){
	res.send('im in here2');
	console.log('User list: ');
	for(i=0;i<Users.length;i++){
		console.log(Users[i]);
	}
})
//socket.io application
io.on('connection',function(socket){
  console.log('user has connected');
  socket.on('disconnect',function(){
    console.log('client disconnected..');
  })
  socket.on('chatter',function(msg){
    console.log('message: '+msg);
  })
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/insert',insert_routes(Users));
app.use('/random',generate_random(Users));


// app.use('/shutdown',shutdown);
// app.use('/delete',remove)
//you can test the bodyParser output with this endpoint
//type this command in terminal: curl -d '{"kyle":"short"}' -H "content-type:application/json" localhost:8080/recieve

app.post('/recieve',function(req,res){
	console.log(req.body);
	res.send(req.body);
})
http.listen(port,function(){
	console.log('im listening on port: '+port);
})
