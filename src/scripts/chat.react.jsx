var React = require('react');
var ReactDom = require('react-dom');


var Messages = React.createClass({
  getInitialState:function(){
    return {messages:["one","two"]};

  },
  newMessage:function(msg){
    this.state.messages.push(msg);
  },

  render:function(){
    var result="";
    for (var i = 0; i < this.state.messages.length; i++) {
      result=result+this.state.messages[i]+"<br/>";
    }
    return <div>{result}</div>;
  }
})

var InputChat = React.createClass({
  sendMessage:function(e){
    e.preventDefault();
    var msg=e.currentTarget.messageinput.value.trim();
    e.currentTarget.messageinput.value="";
    console.log(msg);
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
  render:function(){
   return <div><Messages /><InputChat /></div>
}
});



module.exports = Chat;
