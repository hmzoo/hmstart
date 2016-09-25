
/* hcid keeps tracks of user informations

  userName : user name
  roomName : current room name in use
  secret : shared key with server

  load : checks if informations exist  in localStorage and init datas
  save : save datas in localStorage

  msg : build a message including user informations

*/
module.exports ={
  secret : "",
  userName:"",
  roomName:"",
  load:function(){
    console.log("load localstorage");
    if(localStorage.getItem('secret')!= undefined){
      this.secret=localStorage.getItem('secret');
      this.userName=localStorage.getItem('userName');
      this.roomName=localStorage.getItem('roomName');
    }else{
      this.secret=Math.random().toString(35).substr(2, 12);
      this.userName ="";
      this.roomName ="";
      this.save();
    }

  },
  save:function(){
    localStorage.setItem('secret',this.secret);
    localStorage.setItem('userName',this.userName);
    localStorage.setItem('roomName',this.roomName);
  },
  setUserName:function(t){
    this.userName=t;
    this.save();
  },
  setRoomName:function(t){
    this.roomName=t;
    this.save();
  },
  destroy:function(){
    localStorage.removeItem('secret');
    localStorage.removeItem('userName');
    localStorage.removeItem('roomName');
  },
  get:function(){
      return{
        s:this.secret,
        un:this.userName,
        rn:this.roomName
      }
    },
  msg:function(content){
      return{
        cid:this.get(),
        content:content
      }
    }
}
