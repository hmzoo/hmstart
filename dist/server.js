var express = require('express');

var helmet = require('helmet');

var app = express();
app.use(helmet())

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname+'/index.html');
});

app.listen(8080, '127.0.0.1')
