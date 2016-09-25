var React = require('react');

module.exports = React.createClass({
    getInitialState: function() {
        return {textValue: ''}
    },

    onChange: function(e) {
        this.setState({textValue: e.target.value.trim()});
    },
    insertText :function(text){
       this.setState({textValue:this.state.textValue+text });
    },

    clearText: function() {
        this.setState({textValue: ''});

    },
    handleSubmit: function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.onJoin({name: this.state.textValue});
        this.clearText();
    },

    render: function() {
        return (
            <form action="" onSubmit={this.handleSubmit}  >

                <div className="grid">
                    <div className="grid-item 10/12">
                        <input id="joininput" className="form-input" type="text" placeholder="Type here" onChange={this.onChange} value={this.state.textValue}  ></input>
                    </div>
                    <div className="grid-item 2/12">
                        <button type="submit" className="btn  btn-primary">Join</button>
                    </div>
                </div>

            </form>
        );
    }
});