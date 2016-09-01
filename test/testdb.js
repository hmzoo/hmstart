var r = require('rethinkdbdash')({
	port: 28015,
	host: 'localhost',
  db:"hmstart"
});

/*
//CREATE DB
r.dbCreate('hmstart')
.run()
.then(function(response){
	console.log(response);
})
.error(function(err){
	console.log('error occured ', err);
});

//CREATE TABLE
r.tableCreate('Clients',{ primaryKey: 'name' })
.run()
.then(function(response){
	console.log(response)
})
.error(function(err){
	console.log('error while creating table ',err)
})
*/
r.table("Clients")
.insert({
    name: "Jay",
    num :54667
})
.run()
.then(function(response){
	console.log('Success ',response);
})
.error(function(err){
	console.log('error occurred ',err);
})

r.table('Clients')
.run()
.then(function(response){
	console.log(response);
})
.error(function(err){
	console.log(err);
})

r.table('Clients')
.get('Jay')
.run()
.then(function(response){
	console.log(response);
})
.error(function(err){
	console.log(err);
})

r.table('Clients')
.changes()
.run()
.then(function(cursor){
	cursor.each(myf);
})
.error(function(err){
	console.log(err);
});

var myf=function(err,data){

  console.log("ok",data);
}
