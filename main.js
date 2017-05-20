const player = require('./src/player');

var express = require('express');
var app = express();
var server = require('http').Server(app);
var players = [];

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
  socket.on('join', function(data) {
    console.log(data.playerName + ' has joined the game!');
    console.log('client id for ' + data.playerName + ': ' + data.clientId);
    players.push(new player.Player(data.playerName, data.clientId));
    console.log(players);
  });

  socket.on('exit', function(data) {
    console.log('player has left :(');
    players = players.filter(function (player) {
      return player.getClientId() != data.clientId;
    });
    console.log(players);
  });
})
