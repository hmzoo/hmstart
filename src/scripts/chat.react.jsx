var React = require('react');
var ReactDom = require('react-dom');

var MessagesDb = require('./messages_hz.js');


var Message = React.createClass({
  render:function(){
    return <div><b>{this.props.from} :</b>{this.props.children}</div>;
  }
});



var Messages = React.createClass({
  render:function(){
    var result=this.props.messages.map(function(msg){
      return <Message from={msg.from}>{msg.content}</Message>;
    });
    return <div>{result}</div>;
  }
})

var InputChat = React.createClass({
  sendMessage:function(e){
    e.preventDefault();
    var msg=e.currentTarget.messageinput.value.trim();
    e.currentTarget.messageinput.value="";
    console.log(msg);
    this.props.onMessage("me",msg);
  },
  render:function(){
    return <form onSubmit={this.sendMessage} ><fieldset>
      <span className="grid-item 9/12"><input type="text" id="messageinput" className="form-input" /></span>
        <span className="grid-item 3/12"><button className="btn" type="submit" className="btn btn-primary">Send</button></span>
        </fieldset>
    </form>
  }

});



var Chat = React.createClass({
  getInitialState:function(){
    return {
      messages:[]
    };

  },
  componentDidMount:function(){
    var self=this;
    MessagesDb.onDatas=function(messages){
      self.setState({messages:messages.reverse()});
    };
    MessagesDb.init();
  },
  newMessage:function(from,msg){
    //var a=this.state.messages.slice();
    //a.push({from:from,content:msg});
    //this.setState({messages:a,lastMessage:msg});
    MessagesDb.save(msg);
  }

  ,

  render:function(){
    console.log("OK");

   return <div>
     <div>{this.state.lastMessage}</div>
     <div>
       <Messages messages={this.state.messages}/>
       <InputChat onMessage={this.newMessage} />
    </div>
  </div>
}
});



module.exports = Chat;
