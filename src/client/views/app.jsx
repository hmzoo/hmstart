var DataList=require('./datalist.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return {infos: 'App here !', rows: []};
    },
    setDatas: function(datas) {
        this.setState({items: datas});
    },
    render: function() {

        return (
            <div>
                {this.state.infos}
                <DataList rows={this.state.rows} />
            </div>
        )
    }
});
