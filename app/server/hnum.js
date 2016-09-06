var r = require('rethinkdbdash')({
    port: 28015,
    host: 'localhost',
    db: "hmstart"
});

var log = function(data) {
    console.log(data);
}

var newRandUser = function(uid, onUserSaved, onUserSavedError, cpt) {
    var cpt = (typeof cpt === 'undefined') ? 0 : cpt;
    if (cpt > 50) {
        onUserSavedError({
            uid: uid,
            err: "db full"
        });
        return
    }
    var data = {
        name: (Math.floor(Math.random() * 90000) + 10000).toString(),
        uid: uid,
        createAt: Date.now()
    };

    r.table("Users")
        .get(data.name)
        .run()
        .then(function(response) {
            console.log('Get success ', response);
            if (response) {
                newRandUser(uid, onUserSaved, onUserSavedError, cpt + 1);
            } else {
                r.table("Users").insert(data)
                    .run()
                    .then(function(response) {
                        console.log('Insert success ', response);
                        onUserSaved(data);
                    })
                    .error(function(err) {
                        onUserSavedError({
                            uid: uid,
                            err: "db error"
                        });
                        console.log('error occurred ', err);
                    })
            }

        })
        .error(function(err) {
            onUserSavedError({
                uid: uid,
                err: "db error"
            });
            console.log('error occurred ', err);
        })

}

newRandUser("X", log,log);
