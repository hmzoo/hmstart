var React = require('react');


module.exports = React.createClass({
  getInitialState: function() {
      return {name:'#####'}
  },
  setName:function(data){
    this.setState({name:data})
  },

    render: function() {
        return (
          <div>
            {this.state.name}
            </div>
        );
    }
});
