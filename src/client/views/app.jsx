var React = require('react');
var DataList=require('./datalist.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return {infos: 'no selection', items: [],selected:null};
    },
    setDatas: function(datas) {
        this.setState({items: datas});
    },
    select: function(i) {
      if(i!=null){
        this.setState({selected: i,infos:'selected :'+i.toString()});
      }else{this.setState({selected: i,infos:'no selection'});}
    },
    newItem:function(){
      HMStart.newItem((Math.floor(Math.random() * 90000) + 10000).toString(),'content here ...')
    },

    render: function() {

        return (
            <div>

                <button className='btn m' onClick={this.newItem}>ADD</button>
                <div>{this.state.infos}</div>
                <DataList items={this.state.items} selected={this.state.selected} />
            </div>
        )
    }
});
