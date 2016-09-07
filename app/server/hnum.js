var r = require('rethinkdbdash')({
    port: 28015,
    host: 'localhost',
    db: "hmstart"
});


var updateUser = function(cid, onUserSaved, onUserSavedError, cpt) {
    r.table("Users")
        .filter({name: cid.name,secret:cid.secret})
        .update({socketId:cid.socketId,updatedAt: Date.now()})
        .run()
        .then(function(response) {
          console.log("updateUser",response);
          if(response.replaced>0){
            onUserSaved(cid);
          }else{
            newUser(cid, onUserSaved, onUserSavedError);
          }

        })
        .error(function(err) {
            onUserSavedError({
                socketId: cid.socketId,
                err: "db error"
            });

        });
}

var newUser = function(cid, onUserSaved, onUserSavedError, cpt) {
    console.log("hnum", cpt);
    var cpt = (typeof cpt === 'undefined') ? 0 : cpt;
    if (cpt > 50) {
        onUserSavedError({
            socketId: cid.socketId,
            err: "db full"
        });
        return
    }
    var data = {
        name: (Math.floor(Math.random() * 90000) + 10000).toString(),
        socketId: cid.socketId,
        secret: cid.secret,
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
                        onUserSaved(data);
                    })
                    .error(function(err) {
                        onUserSavedError({
                            socketId: cid.socketId,
                            err: "db error"
                        });
                        console.log('error occurred ', err);
                    })
            }

        })
        .error(function(err) {
            onUserSavedError({
                socketId: cid.socketId,
                err: "db error"
            });
            console.log('error occurred ', err);
        })

}


var hnum = function(cid, onUserSaved, onUserSavedError) {
    if (cid.name != "") {
        updateUser(cid, onUserSaved, onUserSavedError);
    } else {
        newUser(cid, onUserSaved, onUserSavedError);
    }
}


module.exports = hnum;
