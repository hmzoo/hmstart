var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
      return {
        items:[]
      }
  },
  setList:function(data){
    console.log("setList");
    this.setState({items:data});
  },

    render: function() {
        return (
            <div id='listbox'><h6>U</h6>
              {this.state.items.map(function(result){
                return (
                  <ListBoxItem key={result.name} data={result} />
                );
              })}
            </div>
        );
    }
});


// Correct :)
var ListBoxItem = React.createClass({
  render: function() {
    return <div><b>{this.props.data.name}</b></div>;
  }
});
