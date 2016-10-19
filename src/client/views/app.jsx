module.exports = React.createClass({
    getInitialState: function() {
        return {infos: 'App here !'};
    },
    render: function() {

        return (
            <div>
                {this.state.infos}
            </div>
        )
    }
});
