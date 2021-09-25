var express = require("express");
var socket = require("socket.io");

// app setup
var app = express();
var server = app.listen(4000, function () {
  console.log("listening to requests on port number: 4000");
});

// static files
app.use(express.static("public"));

// socket setup
var io = socket(server);
/*
  socket.io is gonne be sitting around now on the server
  waiting for a connection from the client
*/
io.on("connection", function (socket) {
  // socket variable for each connection between a client and the server
  console.log("made socket connection", socket.id);

  socket.on("chat", function (data) {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
