require('dotenv').config();
var express=require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var helmet = require('helmet');


app.use(helmet())

console.log(__dirname);
console.log(process.env.YES);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname+'/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected '+socket.id);
  socket.on('disconnect', function(){
    console.log('user disconnected'+socket.id);
  });
});

server.listen(8080)
