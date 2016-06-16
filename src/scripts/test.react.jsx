var React = require('react');
var ReactDom = require('react-dom');

var creatUserDiv = React.createFactory('div');

var TestClass = React.createClass({
    getInitialState: function() {
        return {
          title:'hello',
          isBold: false
        }
    },
    handleClick:function(){
      this.setState({isBold:!this.state.isBold});
    },
    render: function() {
      var h=React.createElement('p',{onClick:this.handleClick,key:'test'},this.state.title);
        if (this.state.isBold) {
            return React.createElement('b',null,[h]);
        } else {
            return h;
        }
    }
});

var t = React.createElement(TestClass);

var reactElement = React.createElement('h1', {
    className: 'header'
}, "OK");
ReactDom.render(t, document.getElementById('reacttest'));
