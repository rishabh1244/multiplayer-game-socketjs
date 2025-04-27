class player {
    constructor(x, y, username, color, type, s_id) {
        this.x = x;
        this.y = y;
        this.username = username;

        this.height = 20;
        this.g = 0.10;

        this.color = color;

        this.control = null;
        if (type != " NPC") {
            this.control = new Controls
        }

        this.type = type;

        this.s_id = s_id;
        this.onground = false;
        this.vel_x = 0;
        this.vel_y = 0;

        this.moving = false;
    }
    detect_movement() {
        if (this.vel_x == 0 && this.vel_y == 0) {
            this.moving = false;
        } else {
            this.moving = true;
        }
    }
    render_player(bound) {
        
        ctx.beginPath();
        ctx.font = '10px Arial';
        ctx.fillStyle = this.color;
        ctx.fillText(this.username + " v.x : " + this.vel_x + " v.y : " +this.vel_y, this.x - 15, this.y - this.height / 2);
        ctx.rect(this.x, this.y, 5, this.height)
        ctx.fill();
        
        this.detect_movement();
        this.#physics(bound)
    }


    #movements(bound) {

        if (this.control.right == true) { this.vel_x = 2; }
        if (this.control.left == true) { this.vel_x = -2; }


        //sliding
        if (this.vel_x > 0) { 
            this.vel_x = this.vel_x - this.vel_x / 10 
            // this.vel_x = this.vel_x - 0.1; 

            if(this.vel_x <0.09){
                this.vel_x = 0;
            }
        }

        if (this.vel_x < 0) { 
            this.vel_x = this.vel_x - this.vel_x / 10;
            if(this.vel_x > -0.09 ){
                this.vel_x = 0;
            }
        }

        if (this.control.up == true && this.onground == true) { this.vel_y = -this.g * 10; this.onground == false }
    }

    #physics(bound) {

        this.x = this.x + this.vel_x;
        this.y = this.y + this.vel_y;

        if (this.y + this.height < bound) {
            // this.y = this.y + this.g;
            this.vel_y = this.vel_y + this.g;
        }
        else {

            // if (this.control != null)
            //     if(this.control.up == true) {
            //     if (this.vel_y > -27) {
            //         this.vel_y -= 4;
            //     }
    
            // }
            else this.vel_y = 0;

        }
        


        
        if (this.control != null) {
            
            this.#movements(bound);
        }
    }


}