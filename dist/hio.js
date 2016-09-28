var socketio = require('socket.io');
var  io;

var hnum=require('./hnum.js');
var hroom=require('./hroom.js');

//HNUM
hnum.on("userSaved",function(sid,data){
  console.log("userSaved",data.userName);
  io.sockets.connected[sid].emit("yourId", {userName:data.cid.un,roomName:data.cid.rn});

});

hnum.on("userError",function(sid,error){
  console.log("userError",error);
});
hnum.on("userLeave",function(data){
  console.log("userLeave",data);
  hroom.monitorRoom(data.room);
});

//HROOM
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

hroom.on("listUpdated",function(bid,data){
  io.emit('roomList',data);
});




module.exports = function(server){

  io=socketio.listen(server);


  io.on('connection', function(client){
    var connected=true;
    console.log('a user connected '+client.id);


    client.on('disconnect', function(){
      connected=false;
      console.log('User disconnected '+client.id);
      hnum.userOut(client.id);
    });

    client.on('msg', function(data){
      io.emit('msg',data.content);
      console.log('msg',data);
    });

    client.on('IdWanted', function(data){
      if(!(data.cid&&data.content)){return;}
      data.sid=client.id;
      hnum.userIn(data);
    });

    client.on('joinRoom', function(data){
      if(!(data.cid&&data.content)){return;}
      data.sid=client.id;
      hroom.joinRoom(data);
    });


  });
}
