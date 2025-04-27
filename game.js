class game {
    constructor() {

        this.ground_height = canvas.height - 10
        this.player = [];
    }

    map(ctx) {

        ctx.beginPath();
        ctx.fillStyle = "white"
        ctx.rect(0, this.ground_height, canvas.width, 10);
        ctx.fill();

    }

    render() {
        this.map(ctx);
        
        for (let i = 0; i < this.player.length; i++) {
            this.player[i].render_player(this.ground_height);
        }
    }

}