var React = require('react');
var ReactDom = require('react-dom');



var Messages = React.createClass({


  render:function(){
    var result=this.props.messages.map(function(msg,n=0){
      n=n+1;
      return <p key={n}>{msg}</p>;
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
    this.props.onMessage(msg);
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
    return {messages:["one","two"],lastMessage:"AAA"};

  },
  newMessage:function(msg){
    var a=this.state.messages.slice();
    a.push(msg);
    this.setState({messages:a,lastMessage:msg});

  },
  render:function(){
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
