const canvas = document.getElementById('game-screen')
const ctx = canvas.getContext('2d');

canvas.height = 300;
canvas.width = 500;

const g = new game()

function Animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    g.render();

    requestAnimationFrame(Animate);

}


Animate();