var express = require("express"),
    app     = express(),
    path    = require("path"),
    http    = require('http').Server(app),
    io      = require('socket.io')(http);

app.use("/client", express.static("client"));
app.use("/", express.static(__dirname + '/node_modules'));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/client/index.html"));
});

http.listen(8080, function() {
    console.log("Server started!");
});
var shapes = {
    'room1':[],
    'room2':[],
    'room3':[]
};

var updateShape = (room, movement) => {
    const index = shapes[room].findIndex((obj => obj.id === movement.id));
    shapes[room][index].coords = movement.coords;
};
io.on('connection', function(socket){
    var rooms = Object.getOwnPropertyNames(shapes);
    let myroom = '';
    socket.on('join', function(room = rooms[0]) {
        socket.join(room);
        myroom = room;
        io.sockets.in(myroom).emit('connectToRoom', { rooms:rooms, myroom:myroom });
        io.sockets.in(myroom).emit('paint', shapes[myroom]);
    });
    socket.on('leave', function(room) {
        socket.leave(room);
    });
    socket.on('movement', function(movement){
        updateShape(myroom, movement);
        io.sockets.to(myroom).emit('paint', shapes[myroom]);

    });
    socket.on('delete', function(id){
        shapes[myroom] = shapes[myroom].filter( shape => {return shape.id !== id;} );
        io.sockets.to(myroom).emit('paint', shapes[myroom]);
    });
    socket.on('create', function(item){
        shapes[myroom].push(item);
        io.sockets.to(myroom).emit('paint', shapes[myroom]);
    });
});
