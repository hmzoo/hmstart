var socketio = require('socket.io');
var  io

var hnum=require('./hnum.js');
var hroom=require('./hroom.js');


var onUserSaved=function(socketId,userName){
  console.log("userSaved",userName);
  io.sockets.connected[socketId].emit("yourId", {userName:userName});
}

var onUserSavedError=function(socketId,error){
  console.log("userSavedError",error);
}


hroom.on("roomJoined",function(sid,data){
  console.log("user join",data);
  io.sockets.connected[sid].emit("roomJoined", data);
});

hroom.on("roomCreated",function(sid,data){
  console.log("user join",data);
  io.sockets.connected[sid].emit("roomCreated", data);
});

hroom.on("roomError",function(sid,error){
  console.log("roomError",error);
});




module.exports = function(server){

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
      if(!(data.cid&&data.content)){return;}
      data.sid=client.id;
      hroom.joinRoom(data);
    });


  });
}
