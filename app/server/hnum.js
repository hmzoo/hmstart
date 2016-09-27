var r = require('rethinkdbdash')({port: 28015, host: 'localhost', db: "hmstart"});

var hnum = {
    on: function(actionName, action) {
        this[actionName] = action;
    },
    userSaved: function(sid, data) {},
    userError: function(sid, error) {}
}

hnum.updateUser = function(data, cpt) {
    r.table("Users").filter({name: data.cid.un, secret: data.cid.s}).update({sid: data.sid, room: data.cid.rn, updatedAt: Date.now()}).run().then(function(response) {
        console.log("updateUser", response);
        if (response.replaced > 0) {
            hnum.userserSaved(data.sid, {
                userName: cid.un,
                roomName: cid.rn
            });
        } else {
            hnum.newUser(data);
        }

    }).error(function(err) {
        hnum.useError(data.sid, "DB ERROR");

    });
}

hnum.newUser = function(data, cpt) {
    console.log("hnum", cpt);
    var cpt = (typeof cpt === 'undefined')
        ? 0
        : cpt;
    if (cpt > 50) {
        hnum.useError(data.sid, "DB FULL");
        return
    }
    var udata = {
        name: (Math.floor(Math.random() * 90000) + 10000).toString(),
        room: data.cid.rn,
        sid: data.sid,
        secret: data.cid.s,
        createAt: Date.now(),
        updatedAt: Date.now()
    };

    r.table("Users").get(udata.name).run().then(function(response) {
        console.log('Get success ', response);
        if (response) {
            hnum.newUser(data, cpt + 1);
        } else {
            r.table("Users").insert(data).run().then(function(response) {
                console.log('Insert success ', response);
                hnum.userSaved(data.sid, {
                    userName: udata.name,
                    roomName: udata.room
                });
            }).error(function(err) {
                hnum.useError(data.sid, "DB ERROR");

            })
        }

    }).error(function(err) {
        hnum.useError(data.sid, "DB ERROR");

    })

}

hnum.userIn = function(data) {

    if (data.cid.un != "") {
        hnum.updateUser(data);
    } else {
        hnum.newUser(data);
    }
}

hnum.userOut = function() {}

module.exports = hnum;
