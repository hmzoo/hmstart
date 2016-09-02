var r = require('rethinkdbdash')({
	port: 28015,
	host: 'localhost',
  db:"hmstart"
});

module.exports = hdb;

var newUser=function(name){
  r.table("Users")
  .insert({
      name: name,
      createAt:Date.now()
  })
  .run()
  .then(function(response){
  	console.log('Success ',response);
  })
  .error(function(err){
  	console.log('error occurred ',err);
  })

}

var reqUsers=function(){
  r.table('Users')
  .run()
  .then(function(response){
  	hdb.resUsers(response);
  })
  .error(function(err){
  	console.log(err);
  });

}

r.table('Users')
.changes()
.run()
.then(function(cursor){
	cursor.each(hdb.onUserChange);
})
.error(function(err){
	console.log(err);
});


var hdb = {
  reqUsers:reqUsers,
  resUsers:function(response){},
  newUser:newUser,
  onUserChange:function(err,datas){}

}
