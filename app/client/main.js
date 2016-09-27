var socket = io.connect();

var hcid = require('./hcid.js');
var mainView = require('./views/mainview.jsx');

//Socket events
socket.on('connect', function() {
    console.log('Connected successfully to the socket.io server.');
    hcid.load();
    socket.emit('IdWanted', hcid.msg({}));
});
socket.on('msg', function(msg) {
    mainView.newMessage(msg);
});
socket.on('yourId', function(msg) {

    hcid.setUserName(msg.userName);
    hcid.setRoomName(msg.roomName);
    mainView.setUserName(hcid.userName);
    console.log("yourId",hcid.userName);
});

socket.on('roomJoined', function(data) {
  hcid.setRoomName(data.name);
  mainView.setRoomName(hcid.roomName);
  console.log(data);
});

socket.on('roomCreated', function(data) {
  console.log(data);

});
socket.on('roomList', function(data) {
  console.log(data);
  mainView.setList(data);
});

//View events
mainView.on('sendMessage',function(content) {
        console.log(content);
        content.authorName = hcid.userName;
        socket.emit("msg", hcid.msg(content));
    });

mainView.on('joinRoom', function(content) {
        console.log(content);
        socket.emit("joinRoom", hcid.msg(content));
    });
