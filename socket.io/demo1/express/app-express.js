var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index-express.html');
});

http.listen(8888, function() {
    console.log('listening on *:8888');
});

io.on('connection', function(socket) {
    console.log('one user connected');

    socket.on('disconnect', function() {
        console.log('one user disconnected');
    })

    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
        console.log('msg: ' + msg);
    })
});
