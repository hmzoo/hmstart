

module.exports ={
  secret : "",
  name:"",
  load:function(){
    console.log("load localstorage");
    if(localStorage.getItem('secret')!= undefined){
      this.secret=localStorage.getItem('secret');
      this.name=localStorage.getItem('name');
    }else{
      this.secret=Math.random().toString(35).substr(2, 12);
      this.name ="";
      this.save();
    }

  },
  save:function(){
    localStorage.setItem('secret',this.secret);
    localStorage.setItem('name',this.name);
  },
  get:function(){
    return{
      secret:this.secret,
      name:this.name
    }
  },
  setName:function(n){
    this.name=n;
    this.save();
  },
  destroy:function(){
    localStorage.removeItem('secret');
    localStorage.removeItem('name');
  }
}
