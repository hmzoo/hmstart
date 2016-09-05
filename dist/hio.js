var socketio = require('socket.io');
var db, io



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




  });
}
