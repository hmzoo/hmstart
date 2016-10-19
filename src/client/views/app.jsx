var DataList=require('./datalist.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return {infos: 'App here !', items: []};
    },
    setDatas: function(datas) {
        this.setState({items: datas});
    },
    render: function() {

        return (
            <div>
                {this.state.infos}
                <DataList rows={this.state.items} />
            </div>
        )
    }
});
