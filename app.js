var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	//console.log('socket',socket);
  socket.on('chat message', function(msg){
  	socket.broadcast.emit('this is for all');
    console.log('message: ' + msg);
    if(msg === 'hi'){
    	socket.emit('server message', 'hello');
    }
    if(msg === 'how are you?'){
    	io.emit('server message', 'i am fine.. how about you');
    }
    if(msg === 'i am fine too..'){
    	io.emit('server message', 'good.. have a nice Day!');
    }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
