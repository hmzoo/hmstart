var React = require('react');
var socket = io.connect();
var MsgBox=require('./msgbox.js');

socket.on('connect', function() {
        console.log('Connected successfully to the socket.io server.');
        });
socket.on('msg',function(msg){
  console.log('msg',msg);
  app.newMessage(msg.text);
});

var emitMessage =function(data){
  console.log(data);
socket.emit("msg",{text:data});
};






var app=ReactDOM.render(<MsgBox onSendMessage={emitMessage}/>, document.getElementById('msgbox'));
