var datas=require('./tabdb.js');

var ctl={
  onDataUpdate:function(data){
    console.log(data);
  }

};


datas.onUpdated=ctl.onDataUpdate;

ctl.rowSelected="";
ctl.colSelected="";

ctl.rowSel=function(r,s){
  this.rowSelected=r;
  this.colSelected=s;
}




module.exports =ctl;
