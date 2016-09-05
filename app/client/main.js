var React = require('react');
var socket = io.connect();

socket.on('connect', function() {
        console.log('Connected successfully to the socket.io server.');
        });

var Hello=require('./hello.js');

ReactDOM.render(<Hello/>, document.getElementById('app'));
