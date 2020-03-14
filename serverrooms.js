

var static = require('node-static');
var http = require('http');
var file = new(static.Server)();
const PORT = process.env.PORT || 5000;

var app = http.createServer(function (req, res) {
	file.serve(req, res);
}).listen(PORT);

var io = require('socket.io').listen(app);
var numClients;

console.log('begin');
console.log('listening on port: ' + PORT );

io.sockets.on('connection', function (socket){
	console.log('an user connected ');
	socket.emit('success');

	socket.on('disconnect', function () {
		console.log('an user disconnected ' + socket.id + ' ' + socket.room);
		socket.broadcast.to(socket.room).emit('message', {type: 'room', value: 'disconnected', room: socket.room});
		});

	socket.on('message', function (message) {
		console.log(message);
		//socket.broadcast.emit('message', message);
		socket.broadcast.to(socket.room).emit('message', message);
		});
	
	socket.on('room', function (room) {
		if (room){
		
			console.log('Request to create or join room', room);
	
			if (io.sockets.adapter.rooms[room]){
				numClients = io.sockets.adapter.rooms[room].length
				} else {numClients = 0;}
		
			console.log('Room ' + room + ' has ' + numClients + ' client(s)');
	
			if(numClients == 0) {
				socket.join(room);
				socket.room = room;
				console.log('Room ' + room + ' created');
				socket.emit('message', {type: 'room', value: 'created', room: room});
				} 
	
			if(numClients == 1) {
				//io.sockets.in(room).emit('join', room);
				socket.join(room);
				socket.room = room;
				console.log('A second user is added in Room ' + room);
				socket.emit('message', {type: 'room', value: 'joined', room: room});
				socket.broadcast.to(room).emit('message', {type: 'room', value: 'A second user is added', room: room});
			} 
			
			if(numClients == 2) {
				// max two clients
				console.log('Room ' + room + ' already is full');
				socket.emit('message', {type: 'room', value: 'full', room: room});
				} 
			} else console.log ('Number is empty');
		});

});



