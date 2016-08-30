var socket = io.connect();
socket.on('connect', function() {
        console.log('Connected successfully to the socket.io server.');
        });

socket.on('tick', function(data) {

console.log("tick "+data.time+" "+data.id);
});
