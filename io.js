var io = require('socket.io')();

io.on('connection', function (socket) {
    console.log('Client connected to socket.io');
    socket.on('chat-event', function (data) {
        io.emit('chat-event', data);
    });
  });
  
  // io represents socket.io on the server
  module.exports = io;