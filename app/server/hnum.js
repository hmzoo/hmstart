var r = require('rethinkdbdash')({
    port: 28015,
    host: 'localhost',
    db: "hmstart"
});


var updateUser = function(cid, onUserSaved, onUserSavedError, cpt) {
    r.table("Users")
        .filter({name: cid.un,secret:cid.s})
        .update({socketId:cid.socketId,updatedAt: Date.now()})
        .run()
        .then(function(response) {
          console.log("updateUser",response);
          if(response.replaced>0){
            onUserSaved(cid.socketId,cid.un);
          }else{
            newUser(cid, onUserSaved, onUserSavedError);
          }

        })
        .error(function(err) {
            onUserSavedError(cid.socketId,"db error"
            );

        });
}

var newUser = function(cid, onUserSaved, onUserSavedError, cpt) {
    console.log("hnum", cpt);
    var cpt = (typeof cpt === 'undefined') ? 0 : cpt;
    if (cpt > 50) {
        onUserSavedError(cid.socketId,"db full");
        return
    }
    var data = {
        name: (Math.floor(Math.random() * 90000) + 10000).toString(),
        socketId: cid.socketId,
        secret: cid.s,
        createAt: Date.now(),
        updatedAt: Date.now()
    };

    r.table("Users")
        .get(data.name)
        .run()
        .then(function(response) {
            console.log('Get success ', response);
            if (response) {
                newUser(cid, onUserSaved, onUserSavedError, cpt + 1);
            } else {
                r.table("Users").insert(data)
                    .run()
                    .then(function(response) {
                        console.log('Insert success ', response);
                        onUserSaved(cid.socketId,data.name);
                    })
                    .error(function(err) {
                        onUserSavedError(cid.socketId,"db error"
                        );

                    })
            }

        })
        .error(function(err) {
            onUserSavedError(cid.socketId,
                "db error"
            );

        })

}


var userIn = function(cid, onUserSaved, onUserSavedError) {
  
    if (cid.un != "") {
        updateUser(cid, onUserSaved, onUserSavedError);
    } else {
        newUser(cid, onUserSaved, onUserSavedError);
    }
}

var userOut =function(){

}


module.exports = {

  userIn:userIn,
  userOut:userOut


};
