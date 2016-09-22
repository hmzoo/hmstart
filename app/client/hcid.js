

module.exports ={
  secret : "",
  user:"",
  room:"",
  load:function(){
    console.log("load localstorage");
    if(localStorage.getItem('secret')!= undefined){
      this.secret=localStorage.getItem('secret');
      this.user=localStorage.getItem('user');
      this.room=localStorage.getItem('room');
    }else{
      this.secret=Math.random().toString(35).substr(2, 12);
      this.name ="";
      this.save();
    }

  },
  save:function(){
    localStorage.setItem('secret',this.secret);
    localStorage.setItem('user',this.user);
    localStorage.setItem('room',this.room);
  },
  get:function(){
    return{
      secret:this.secret,
      user:this.user,
      room:this.room

    }
  },
  setUser:function(t){
    this.user=t;
    this.save();
  },
  setRoom:function(t){
    this.room=t;
    this.save();
  },
  destroy:function(){
    localStorage.removeItem('secret');
    localStorage.removeItem('user');
    localStorage.removeItem('room');
  }
}
