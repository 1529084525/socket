var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

http.listen(8888, function() {
    console.log('listening on *:8888');
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

