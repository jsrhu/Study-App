//server
var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var insert_routes = require('./routes/index.js');
var generate_random = require('./routes/randomdata.js');
var port = process.env.PORT || 3000
var bodyParser = require('body-parser');
// var shutdown = require('./routes/close-connection.js');
// var remove = require('./routes/delete.js');
var query = require('./query.js');
var Users = [];
var matched = [];
var room_number = 0;
//query function
// for(i=0;i<10;i++){
// 	console.log('im in 20');
// 	var input = {
// 		id:i,
// 		timesubmitted:String(Math.random()).split('0.')[1]
// 	}
// 	Users.push(input);
// }
// setInterval(function(){
// 	console.log('hello');
// 	if(Users.length<=1){
// 		console.log('empty array');
// 	}
// 	else{
// 		var room = [Users[0],Users[1]];
// 		Users.shift();
// 		Users.shift();
// 		console.log("Users: ");
// 		console.log(Users);
// 		console.log("Room: ");
// 		console.log(room);
// 	}
// },1000);


// //express middleware parses incoming post requests and parses the json body; 
//returned output is stored in req.body, and is sent off to the next middleware

app.use('/views',express.static(path.join(__dirname, 'html')));

app.get('/rooms',function(req,res){
	console.log(io.sockets.adapter.rooms);
	res.end();
})

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
		res.send(Users[i]);
	}
})
//socket.io application
io.on('connection',function(socket){
	console.log('user '+socket.id+' has connected');
	var user = {
  		socketid:socket.id,
  		timesubmitted:new Date().getTime()
	}
	Users.push(user);
	if(Users.length%2==0){
		console.log('emitting rooms....');
		var roomnumber = room_number+1;
		var index1 = Users.length-1;
		var index2 = Users.length-2;
		console.log(Users);
		var socketids ={
			socket1:Users[index1].socketid,
			socket2:Users[index2].socketid,
			room:String('room'+roomnumber)
		}
		io.sockets.emit('establish connection',socketids);
		room_number++;
	}
	socket.on('disconnect',function(){
	    console.log('client disconnected..');
	})
 	//demo testing messaging
	// socket.on('chatter',function(msg){
	//     console.log('message: '+msg);
	//     socket.emit('chat message',msg);
	// })
	//echo messages to all private rooms
	socket.on('connectme',function(room){
		console.log(socket.id+" has joined room: "+room);
		socket.join(room);
		socket.on('chatter',function(msg){
			console.log(socket.id+": "+msg);
			io.to(room).emit('chatmsg',msg);
		})

	})
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use('/query',query(Users));
app.use('/insert',insert_routes(Users));
app.use('/random',generate_random(Users));
app.use('/query',query(Users));


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
