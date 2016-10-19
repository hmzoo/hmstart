var React = require('react');


var show=function(row,col){
  console.log(row,col,CTL);
}

var Item = React.createClass({

    clicked: function() {
        show(this.props.row, this.props.col);
    },
    render: function() {
        return (

            <div className="grid-item 1/12"><div className="box" onClick={this.clicked}> {this.props.data}</div></div>

        );
    }
});

var Row = React.createClass({

    render: function() {
        return (
            <div className="grid" >
                <div className="grid-item 2/12">{this.props.name}<br/>{this.props.content}</div>

                {this.props.items.map(function(result, index) {
                    return (<Item key={index} data={result} row={this.props.name} col={index}  />);
                }, this)}

            </div>
        );
    }
});

module.exports = React.createClass({
    getInitialState: function() {
        return {locked: false};
    },

    render: function() {
        return (

            <div id="datalist" className="bord">
                {this.props.rows.map(function(result) {
                    return (<Row key={result.id} name={result.name} content={result.content} items={result.items} />);
                }, this)}
            </div>

        );
    }

});
