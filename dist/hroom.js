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
      }

}

module.exports ={
  newRoom:newRoom
}
