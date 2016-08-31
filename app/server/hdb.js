var r = require('rethinkdb');
var connection = null
var hdb = {


    init: function() {
        r.connect({
            host: 'localhost',
            port: 28015
        }, function(err, conn) {
            if (err) throw err;
            connection = conn;
        });
        r.db("test").tableCreate("clients").run(connection, function(err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result, null, 2));
        });
        r.db("test").table("clients").insert([{
            name: "Toto",
            num: 54667
        }, {
            name: "Bob",
            num: 74886
        }, ]).run(connection, function(err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result, null, 2));
        });
    },
    test: function() {
      r.table('clients').run(connection, function(err, cursor) {
          if (err) throw err;
          cursor.toArray(function(err, result) {
              if (err) throw err;
              console.log(JSON.stringify(result, null, 2));
          });
      });

    }







}

module.exports = hdb;
