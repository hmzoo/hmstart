var Horizon =require ('@horizon/client/dist/horizon');
const horizon = Horizon({host: 'localhost:8181'});

var Messages={
  init:function(){
    var self=this;
    horizon("messages")
    //.order("datetime","descending")
    .limit(8)
    .watch().
    subscribe(function(messages){
      self.onDatas(messages);
    });
  },
  save: function(message){
    horizon("messages").store({
      from :'test',
      content:message,
      datetime: new Date()
    });
  },
  onDatas:function(datas){
    console.log(datas);
  }
}


module.exports = Messages;
