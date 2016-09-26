var r = require('rethinkdbdash')({
    port: 28015,
    host: 'localhost',
    db: "hmstart"
});


var hroom={
  on:function(actionName,action){
    this[actionName]=action;
  },
  roomJoined:function(sid,data){},
  roomCreated: function(sid,data){},
  roomError:function(sid,error){},



}
hroom.newRoom=function(data){
  r.table("Rooms").insert(data.content)
      .run()
      .then(function(response) {
          console.log('Insert success ', response);
          hroom.roomCreated(data.sid,response);
      })
      .error(function(err) {
        console.log('NewRoom ERROR ', err);
          hroom.roomError(data.sid,'DB ERROR');
      });

}

hroom.joinRoom=function(data){

  r.table("Rooms").get(data.content.name)
    .run().then(function(response){
      console.log('getRoom:', response);

      if(response!=null){
          hroom.roomJoined(data.sid,response);
      }else{
        console.log("newRoom",data);
          hroom.newRoom(data);
      }
    })
    .error(function(err){
      console.log('getRoom ERROR ', err);
      hroom.roomError(cid,'DB ERROR');
    });
  /*
  r.table("Rooms").insert(data)
      .run()
      .then(function(response) {
          console.log('Insert success ', response);
          onRoomSaved(cid,data);
      })
      .error(function(err) {
        console.log('NewRoom ERROR ', err);
        onRoomSavedError(cid,data,err);
      });
      */

}

module.exports = hroom;
