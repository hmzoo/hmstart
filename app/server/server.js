require('dotenv').config();
var express=require('express');
var app = express();
var server = require('http').Server(app);

var helmet = require('helmet');
app.use(helmet());

var hio= require('./hio.js');





app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname+'/index.html');
});



server.listen(8088);
hio(server);

console.log("Server started, listening on 8088 ...");
