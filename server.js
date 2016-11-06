var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// var messages = [{
//   idMensaje: "1",
//   titulo: "Alerta nro 12",
//   descripcion: "Algun fenomeno"
// }];
var messages = [];

io.on('connection', function(socket) {
  console.log('Alguien se ha conectado con Sockets');
  //socket.emit('messages', messages);

  socket.on('messages', function(data) {
    var objeto = JSON.parse(data);
    console.log(objeto);
    //messages = objeto;
    //messages.push(objeto);

    io.sockets.emit('messages', objeto);
  });
});

server.listen(4040, function() {
  console.log("Servidor socket corriendo en http://localhost:4040");
});
