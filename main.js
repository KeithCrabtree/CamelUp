var express = require('express');
var app = express();
var server = require('http').Server(app);

// Server Setup
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

server.listen(2323);

// Socket Setup
var io = require('socket.io')(server, {});
io.sockets.on('connection', function(socket) {
  console.log('new socket connection opened..');

  // Event listeners
  socket.on('howdy', function(data) {
    console.log(data.from + ' said hi!');
  });
})
