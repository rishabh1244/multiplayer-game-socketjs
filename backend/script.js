const express = require('express');
const app = express();
const http = require('http').createServer(app); // Wrap app in HTTP server
const { Server } = require('socket.io');

const io = new Server(http); // Pass server to socket.io
const PORT = 3000;


// = [x,y,username,color]
const players = []

app.use(express.static('..'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected: ' + socket.id);
  socket.on("movement", (x, y, s_id) => {

    for(i in players){
      if(players[i][4] === s_id){
        players[i][0] = x
        players[i][1] = y;
      }
    }

    socket.broadcast.emit("update",{x,y,s_id})
  })

  socket.on('login', (x, y, username, color) => {
    players.push([x, y, username, color, socket.id])
    io.emit('userLoggedIn', [x, y, username, color, socket.id]);

    if (players.length > 1) {
      let sort_npc = [];
      for (i in players) {
        if (players[i][4] != socket.id) {
          sort_npc.push(players[i]);
        }
      }
      socket.emit('NPCLoggedIn', sort_npc);
      // sort_npc = []
    }
  });

  socket.on('disconnect', () => {

    io.emit("userDisconnected", socket.id);
    console.log('User disconnected: ' + socket.id);

    for (i in players) {
      if (players[i][4] == socket.id) {
        players.splice(i, 1);
      }
    }
  });


});

http.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});