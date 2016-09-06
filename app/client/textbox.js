var React = require('react');

module.exports = React.createClass({


    render: function() {
        return (
            <div>
              {this.props.datas.map(function(result){
                return (
                  <TextBoxItem key={result.id} data={result} />
                );
              })}
            </div>
        );
    }
});


// Correct :)
var TextBoxItem = React.createClass({
  render: function() {
    return <div>{this.props.data.text}</div>;
  }
});
