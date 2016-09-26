var React = require('react');
var MsgBox = require('./msgbox.jsx');
var NameBox = require('./namebox.jsx');
var JoinBox = require('./joinbox.jsx');





var mainView = {
    on:function(actionName,action){
      this[actionName]=action;
    },

    setName: function(text) {
        numApp.setName(text);
    },
    newMessage: function(msg) {
        msgApp.newMessage(msg);
    }

}


var joinRoom=function(data){
  mainView.joinRoom(data);
}

var sendMessage=function(data){
  mainView.sendMessage(data);
}

var joinApp = ReactDOM.render(
    <JoinBox onJoinRoom={joinRoom}/>, document.getElementById('joinbox'));
var numApp = ReactDOM.render(
    <NameBox/>, document.getElementById('num'));
var msgApp = ReactDOM.render(
    <MsgBox onSendMessage={sendMessage}/>, document.getElementById('msgbox'));

module.exports = mainView;
