const socket = io();
let username = prompt("Please enter your name:", "Guest");

randomColor = () => `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

socket.emit("login", 100, 100, username, randomColor());

socket.on('userLoggedIn', ([x, y, username, color, s_id]) => {
    if (g.player.length == 0) {
        g.player.push(new player(x, y, username, color, " player", s_id));
    } else {
        g.player.push(new player(x, y, username, color, " NPC", s_id));

    }
    let lastX = g.player[0].x;
    let lastY = g.player[0].y;
    setInterval(() => {
        if (g.player.length > 0) {
            if (g.player[0].x !== lastX || g.player[0].y !== lastY) {
                socket.emit('movement', g.player[0].x, g.player[0].y, g.player[0].s_id);
                lastX = g.player[0].x;
                lastY = g.player[0].y;
            }
        }
    }, 1)
});


socket.on('update', (data) => {
    for (let i = 0; i < g.player.length; i++) {
        if (g.player[i].s_id === data.s_id) {
            g.player[i].x = data.x;
            g.player[i].y = data.y;
            break;
        }
    }
});

socket.on('NPCLoggedIn', (players) => {
    for (i in players) {
        g.player.push(new player(players[i][0], players[i][1], players[i][2], players[i][3], " NPC", players[i][4]));
    }

});

socket.on('userDisconnected', (s_id) => {
    for (i in g.player) {
        if (g.player[i].s_id == s_id) {
            g.player.splice(i, 1);
        }
    }
});


