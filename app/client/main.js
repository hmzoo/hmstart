var React = require('react');
var socket = io.connect();
var MsgBox=require('./msgbox.js');
var NameBox=require('./namebox.js');

var hcid=require('./hcid.js');

socket.on('connect', function() {
        console.log('Connected successfully to the socket.io server.');
        hcid.load();
        socket.emit('IdWanted',hcid.get());
        });
socket.on('msg',function(msg){
  console.log('msg',msg);
  app.newMessage(msg);
});
socket.on('yourId',function(msg){
  console.log('msg',msg);
  hcid.setName(msg.name);
  num.setName(hcid.name);
});

var emitMessage =function(data){
  data.name=hcid.name;
  socket.emit("msg",data);
};





var num=ReactDOM.render(<NameBox/>, document.getElementById('num'));
var app=ReactDOM.render(<MsgBox onSendMessage={emitMessage}/>, document.getElementById('msgbox'));
