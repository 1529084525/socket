var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

http.listen(8888, function() {
    console.log('listening on *:8888');
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/all.html');
});

app.get('/demo1', function(req, res) {
    res.sendFile(__dirname + '/demo1.html');
});

app.get('/boy', function(req, res) {
    res.sendFile(__dirname + '/boy.html');
});

app.get('/girl', function(req, res) {
    res.sendFile(__dirname + '/girl.html');
});

io.on('connection', function(socket) {
    console.log('one user connected :' + socket.id);

    socket.broadcast.emit('广播');

    socket.on('disconnect', function() {
        console.log('one user disconnected:' + socket.id);
    })

    socket.on('all', function(msg) {
        io.emit('all', msg);
        console.log('all: ' + msg);
    });

    io.emit('6666', { for: 'everyone' });


});
