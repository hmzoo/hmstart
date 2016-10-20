var ReactDOM = require('react-dom');
var React = require('react');
var App= require('./views/app.jsx');

Hmstart=require('./hmstart.js');

HMstart.datas.onUpdated=function(tab){
  app.setDatas(tab);
}

HMstart.app = ReactDOM.render(
  <App/>, document.getElementById('app'));
