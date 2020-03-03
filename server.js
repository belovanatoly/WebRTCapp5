var static = require('node-static');
var http = require('http');
var file = new(static.Server)();
const PORT = process.env.PORT || 5000;

var app = http.createServer(function (req, res) {
	file.serve(req, res);
}).listen(PORT);

var io = require('socket.io').listen(app);
console.log('begin');
console.log('listening on port: ' + PORT );

io.sockets.on('connection', function (socket){
	console.log('an user connected');
	socket.emit('success');

	socket.on('disconnect', function (socket) {
	console.log('an user disconnected');
	});

	socket.on('message', function (message) {
		console.log(message);
		socket.broadcast.emit('message', message); 
		
	});

});



