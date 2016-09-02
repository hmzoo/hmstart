var socketio = require('socket.io');

module.exports = function(server,db){
  var db=db;
  var io=socketio.listen(server);
  io.on('connection', function(client){
    var connected=true;
    console.log('a user connected '+client.id);

    client.on('disconnect', function(){
      connected=false;
      console.log('user disconnected '+client.id);
    });

    var tick = function(){

        if (!connected) {
          return;
        }

        var dateTime = new Date();

        client.emit('tick', {'time' : dateTime,'id':client.id});
        setTimeout(tick, 5000);
      };

      tick();


  });
}
