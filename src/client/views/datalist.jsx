var React = require('react');

var Item = React.createClass({

    clicked: function() {
        
        HMStart.select(this.props.index);
    },
    render: function() {
        return (

            <div className="grid-item 1/12">
                <div className="box" onClick={this.clicked}>
                    <b>{this.props.name}</b><br/>{this.props.content}</div>
            </div>

        );
    }
});

var ItemForm = React.createClass({
    getInitialState: function() {
        return {inputValue: this.props.content};
    },
    delClicked: function() {

        HMStart.delItem(this.props.name);
        HMStart.select(null);
    },
    componentDidMount: function() {
      this.refs.itemInput.focus();
    },

    onChangeInput: function(e) {
        this.setState({
            inputValue: e.target.value.substring(0, 64)
        });
    },
    handleSubmit: function(e) {
        e.preventDefault();
        e.stopPropagation();
        HMStart.updateItem(this.props.name, {content: this.state.inputValue});
        HMStart.select(null);
        //this.props.onSubmit(this.state.inputValue.trim());
        //this.setState({inputValue: ''});
    },
    render: function() {
        return (

            <div className="grid-item 3/12">
                <div className="box"><span className="fr" onClick={this.delClicked}>{'\u274C'}</span>
                    <b>{this.props.name}</b><br/>
                    <form action="" onSubmit={this.handleSubmit}>
                        <input className="form-input" ref="itemInput" type="text" value={this.state.inputValue} onChange={this.onChangeInput}></input>
                    </form>
                </div>
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
                {this.props.items.map(function(result, index) {
                    if (this.props.selected === index) {
                        return (<ItemForm key={result.id} name={result.name} content={result.content} index={index}/>);
                    } else {
                        return (<Item key={result.id} name={result.name} content={result.content} index={index}/>);
                    }
                }, this)}
            </div>

        );
    }

});
