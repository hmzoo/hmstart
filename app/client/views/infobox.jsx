var React = require('react');


module.exports = React.createClass({
  getInitialState: function() {
      return {userName:'#####',roomName:'',infos:''}
  },
  setUserName:function(data){
    this.setState({userName:data});
  },
  setRoomName:function(data){
    this.setState({roomName:data})
  },
  setInfos:function(data){
    this.setState({infos:data})
  },

    render: function() {
        return (
            <div className="grid">
                <div className="grid-item 4/12">
                    <h3>{this.state.userName}</h3>
                </div>
                <div className="grid-item 4/12">
                    <h3>{this.state.roomName}</h3>
                </div>
                <div className="grid-item 4/12">
                    {this.state.infos}
                </div>
            </div>
        );
    }
});
