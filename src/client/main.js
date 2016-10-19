var ReactDOM = require('react-dom');
var React = require('react');
var App= require('./views/app.jsx');
CTL="OK";

var datas=require('./tabdb.js');
datas.onUpdated=function(tab){
  app.setDatas(tab);
}

var app = ReactDOM.render(
  <App/>, document.getElementById('app'));

datas.add(1,{name:'item1',content:'OK',items:['a','b','c']});
datas.add(2,{name:'item2',content:'OK',items:[]});
datas.add(3,{name:'item3',content:'OK',items:['a']});
