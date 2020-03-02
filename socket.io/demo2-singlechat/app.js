var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');

http.listen(8888, function() {
    console.log('listening on *:8888');
});

app.use(express.static('public'))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

var usocket = {} , user = [];


io.on('connection', (socket) => {
    console.log('one user connected');

    socket.emit('news' , 'test news');

    socket.on('new user', (username) => {
        socket.username = username;
        usocket[username] = socket;
        user.push(username);
        socket.emit('login', user);
        socket.broadcast.emit('user joined', username, (user.length - 1));
        console.log('new user: ' + user);
    })

    socket.on('send private message', function(res){
        usocket[res.name].emit('receive private message', res.msg);
    });
    
    socket.on('send public message', (res) => {
        io.emit('send public message', res);
    });

    socket.on('disconnect', () => {
        if(socket.username in usocket){
			delete(usocket[socket.username]);
			user.splice(user.indexOf(socket.username), 1);
		}
		console.log('disconnect: ' + user);
		socket.broadcast.emit('user left',socket.username)
    })

});