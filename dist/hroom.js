var r = require('rethinkdbdash')({
    port: 28015,
    host: 'localhost',
    db: "hmstart"
});

var newRoom=function(cid,data,onRoomSaved,onRoomSavedError){
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

}

var joinRoom=function(cid,data,onRoomJoined,onRoomJoinedError){

  r.table("Rooms").get(data.name)
    .run().then(function(reponse){
      console.log('getRoom:', reponse);
    })
    .error(function(err){
      console.log('getRoom ERROR ', err);
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

module.exports ={
  newRoom:newRoom,
  joinRoom:joinRoom
}
