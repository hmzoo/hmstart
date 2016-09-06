var React = require('react');

var TextBox=require('./textbox.js');
var SendBox=require('./sendbox.js');


module.exports = React.createClass({
  getInitialState: function() {
      return {messages:[]}
  },
  sendMessage:function(data){
    this.props.onSendMessage(data.message);
  },
  newMessage:function(text){
    var msgs = this.state.messages.concat([{id:this.state.messages.length,text:text}]);
    this.setState({messages:msgs});
  },


    render: function() {
        return (
          <div>
            <div><TextBox datas={this.state.messages}/></div>
            <div><SendBox onSubmit={this.sendMessage}/></div>
            </div>
        );
    }
});
