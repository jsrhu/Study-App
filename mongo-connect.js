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
var User = null;
var matched = [];
var room_number = 0;
//functions...
//checks if socket is in disconnect array and reconnects to its original room
///
app.use('/views',express.static(path.join(__dirname, 'html')));

app.get('/rooms',function(req,res){
	console.log(io.sockets.adapter.rooms);
	res.end();
})

app.get('/print',function(req,res){
	res.send(matched);
	res.end();
})
//socket.io application
io.on('connection',function(socket){
	socket.on('check-in',function(ident){
		console.log(ident);
		//should execute on connections after first time
		if(ident!=null){
			console.log('ident recieved');
			console.log(ident);
			for(i=0;i<matched.length;i++){
				if(ident==matched[i].id1){
					socket.join(matched[i].room);
					matched[i].id1 = socket.id;
					socket.emit('cache_client',socket.id);
					console.log('client reconnected');
				}
				if(ident==matched[i].id2){
					socket.join(matched[i].room);
					matched[i].id2 = socket.id;
					socket.emit('cache_client',socket.id);
					console.log('client reconnected');
				}
			}
		}
		//should only execute on first time connections
		else{
			console.log('user '+socket.id+' has connected');
			if(User!=null){
				var room = 'room'+room_number;
				//puts current socket id in localstorage on client side
				socket.emit('cache_client',socket.id);
				socket.join(room);
				User.join(room);
				var input = {
					id1:User.id,
					id2:socket.id,
					room: room
				}
				matched.push(input);
				console.log('user '+socket.id+' and user '+User.id+' has joined the room');
				User=null;
			}
			else{
				socket.emit('cache_client',socket.id);
				User=socket;
			}
		}
	})
	socket.on('chatter',function(msg){
		console.log('chatter has been recieved');
		for(i=0;i<matched.length;i++){
			if((socket.id==matched[i].id1)||(socket.id==matched[i].id2)){
				console.log('chat msg sent out');
				io.to(matched[i].room).emit('chatmsg',msg);
			}
		}
	})
	socket.on('disconnect',function(){
		console.log('client '+socket.id+" has disconnected");
		// for(i=0;i<matched.length;i++){
		// 	if(matched[i].id1==socket.id){
		// 		socket.emit('cache_client',matched[i].id1);
		// 		console.log('socket id '+matched[i].id1+' has been sent to client');
		// 	}
		// 	if(matched[i].id2==socket.id){
		// 		socket.emit('cache_client',matched[i].id2);
		// 		console.log('socket id '+matched[i].id2+' has been sent to client');
		// 	}
		// }
	})
	socket.on('checking',function(id){
		console.log('i am :');
		console.log(id);
	})
	app.get('/clear',function(req,res){
		io.sockets.emit('clear-storage');
		res.end();
	})
	app.get('/getUserID',function(req,res){
		io.sockets.emit('print-storage');
		res.end();
	})
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use('/query',query(Users));
// app.use('/insert',insert_routes(Users));
// app.use('/random',generate_random(Users));
// app.use('/query',query(Users));


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
