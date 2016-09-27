var r = require('rethinkdbdash')({
    port: 28015,
    host: 'localhost',
    db: "hmstart"
});


var hroom = {
    on: function(actionName, action) {
        this[actionName] = action;
    },
    roomJoined: function(sid, data) {},
    roomCreated: function(sid, data) {},
    roomError: function(sid, error) {},
}

hroom.newRoom = function(data) {
    r.table("Rooms").insert(data.content)
        .run()
        .then(function(response) {
            console.log('Insert success ', response);
            hroom.roomCreated(data.sid, response);
            hroom.joinRoom(data);
        })
        .error(function(err) {
            console.log('NewRoom ERROR ', err);
            hroom.roomError(data.sid, 'DB ERROR');
        });

}

hroom.joinRoom = function(data) {

    r.table("Rooms").get(data.content.name)
        .run().then(function(response) {
            console.log('getRoom:', response);

            if (response != null) {

                updateUserRoom(data);



            } else {
                console.log("newRoom", data);
                hroom.newRoom(data);
            }
        })
        .error(function(err) {
            console.log('getRoom ERROR ', err);
            hroom.roomError(cid, 'DB ERROR');
        });


}

var updateUserRoom = function(data) {
    r.table("Users")
        .filter({
            name: data.cid.un,
            secret: data.cid.s
        })
        .update({
            room: data.content.name,
            updatedAt: Date.now()
        })
        .run()
        .then(function(response) {
            console.log("updateUser", response);
            if (response.replaced > 0) {
                hroom.roomJoined(data.sid, {
                    name: data.content.name
                });
            } else {
                hroom.roomError(data.sid, 'DB ERROR');
            }

        })
        .error(function(err) {
            hroom.roomError(data.sid, 'DB ERROR');

        });

}

module.exports = hroom;
