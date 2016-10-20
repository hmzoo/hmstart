var ReactDOM = require('react-dom');
var React = require('react');
var App = require('./views/app.jsx');

HMStart = require('./hmstart.js');

HMStart.app = ReactDOM.render(
    <App/>, document.getElementById('app'));

HMStart.datas.onUpdated = function(tab) {

    HMStart.app.setDatas(tab);
}
