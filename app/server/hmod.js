var socketio = require('socket.io');

module.exports = init;

init= function init(server){
  var io=socketio.listen(server);
  io.on('connection', function(socket){
    console.log('a user connected '+socket.id);
    socket.on('disconnect', function(){
      console.log('user disconnected '+socket.id);
    });
  });
}
