var socketio = require('socket.io');
var db, io

var hnum=require('./hnum.js');
var hrooms=require('./hrooms.js');


var onUserSaved=function(data){
  console.log("userSaved",data);
  io.sockets.connected[data.socketId].emit("yourId", {name:data.name});
}

var onUserSavedError=function(data){
  console.log("userSavedError",data);
}



module.exports = function(server,database){
  db=database;
  io=socketio.listen(server);


  io.on('connection', function(client){
    var connected=true;
    console.log('a user connected '+client.id);


    client.on('disconnect', function(){
      connected=false;
      console.log('user disconnected '+client.id);
    });

    client.on('msg', function(data){
      io.emit('msg',data.content);
      console.log('msg',data);
    });

    client.on('IdWanted', function(data){
      data.socketId=client.id;
      hnum(data,onUserSaved,onUserSavedError);
    });

    client.on('joinRoom', function(data){
      data.socketId=client.id;
      hnum(data,onUserSaved,onUserSavedError);
    });


  });
}
