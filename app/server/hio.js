var socketio = require('socket.io');
var db, io

var hnum=require('./hnum.js');
var hrooms=require('./hroom.js');


var onUserSaved=function(socketId,userName){
  console.log("userSaved",userName);
  io.sockets.connected[socketId].emit("yourId", {userName:userName});
}

var onUserSavedError=function(socketId,error){
  console.log("userSavedError",error);
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
      hnum.userIn(data,onUserSaved,onUserSavedError);
    });

    client.on('joinRoom', function(data){
      data.socketId=client.id;
      hnum.userIn(data,onUserSaved,onUserSavedError);
    });


  });
}
