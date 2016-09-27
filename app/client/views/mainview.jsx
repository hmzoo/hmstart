var React = require('react');
var MsgBox = require('./msgbox.jsx');
var InfoBox = require('./infobox.jsx');
var JoinBox = require('./joinbox.jsx');
var ListBox = require('./listbox.jsx');

var mainView = {
    on: function(actionName, action) {
        this[actionName] = action;
    },

    setUserName: function(text) {
        infoApp.setUserName(text);
    },
    setRoomName: function(text) {
        infoApp.setRoomName(text);
    },
    setInfos: function(text) {
        infoApp.setInfos(text);
    },
    newMessage: function(msg) {
        msgApp.newMessage(msg);
    },
    setList: function(data) {
      console.log("HEY3");
        listApp.setList(data);
    }

}

var joinRoom = function(data) {
    mainView.joinRoom(data);
}

var sendMessage = function(data) {
    mainView.sendMessage(data);
}

var joinApp = ReactDOM.render(
    <JoinBox onJoinRoom={joinRoom}/>, document.getElementById('joinbox'));
var infoApp = ReactDOM.render(
    <InfoBox/>, document.getElementById('num'));
var msgApp = ReactDOM.render(
    <MsgBox onSendMessage={sendMessage}/>, document.getElementById('msgbox'));
var listApp = ReactDOM.render(
          <ListBox />, document.getElementById('listbox'));

module.exports = mainView;
