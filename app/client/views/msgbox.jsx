var React = require('react');

var TextBox=require('./textbox.jsx');
var SendBox=require('./sendbox.jsx');


module.exports = React.createClass({
  getInitialState: function() {
      return {
        messages:[]
      }
  },
  sendMessage:function(data){
    this.props.onSendMessage(data);
  },
  newMessage:function(data){
    var msgs = this.state.messages.concat([{id:this.state.messages.length,name:data.authorName,text:data.text}]);
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
