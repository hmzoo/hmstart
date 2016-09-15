var r = require('rethinkdbdash')({
	port: 28015,
	host: 'localhost',
  db:"hmstart"
});


//CREATE DB
r.dbCreate('hmstart')
.run()
.then(function(response){
	console.log(response);
})
.error(function(err){
	console.log('error occured creating DB ', err);
});

//CREATE TABLE USERS
r.tableCreate('Users',{ primaryKey: 'name' })
.run()
.then(function(response){
	console.log(response)
})
.error(function(err){
	console.log('error while creating table ',err)
})


r.tableCreate('Rooms',{ primaryKey: 'name' })
.run()
.then(function(response){
	console.log(response)
})
.error(function(err){
	console.log('error while creating table ',err)
})
