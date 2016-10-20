var Mdb=require('./mdb.js');

var ctl = {
    datas: new Mdb(),

    select:function(i){
      this.app.select(i);
    },
    newItem:function(name,content){
      this.datas.add(name,{name:name,content:content})
    },
    delItem:function(name){
      this.datas.del(name);
    },
    updateItem:function(name,data){
      this.datas.set(name,data);
    }

};

module.exports = ctl;
