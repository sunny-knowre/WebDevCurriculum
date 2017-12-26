var express = require("express"),
  app = express(),
  path = require("path"),
  http = require('http').Server(app),
  io = require('socket.io')(http);

app.use("/client", express.static("client"));
app.use("/", express.static(__dirname + '/node_modules'));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/client/index.html"));
});

http.listen(8080, function() {
    console.log("Server started!");
});

io.on('connection', socket => {
    socket.emit('test', {hello: 'world'});
    socket.on('test2', data => {
        console.log(data);
    });
});
