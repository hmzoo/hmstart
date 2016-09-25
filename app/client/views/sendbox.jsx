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
        this.props.onSubmit({text: this.state.textValue});
        this.clearText();
    },

    render: function() {
        return (
            <form action="" onSubmit={this.handleSubmit} autoComplete="off" >

                <div className="grid">
                    <div className="grid-item 10/12">
                        <input id="msginput" className="form-input" type="text" placeholder="Type here" onChange={this.onChange} value={this.state.textValue} autoComplete="off" ></input>
                    </div>
                    <div className="grid-item 2/12">
                        <button type="submit" className="btn  btn-primary">Send</button>
                    </div>
                </div>

            </form>
        );
    }
});
