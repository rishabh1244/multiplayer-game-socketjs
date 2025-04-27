class Controls {
    constructor() {
        this.up, this.down, this.right, this.left , this.info, this.info2= false;
        this.#control();
    }

    #control() {
        document.onkeydown = (event) => {
            switch (event.key) {
                case "w":
                    this.up = true;
                    break;
                case "s":
                    this.down = true;
                    break;
                case "d":
                    this.right = true;
                    break;
                case "a":
                    this.left = true;
                    break;
                case "g":
                    this.info = true;
                    break;
                    case "f":
                    this.info2 = true;
                    break;
            }
        };

        document.onkeyup = (event) => {
            switch (event.key) {
                case "w":
                    this.up = false;
                    break;
                case "s":
                    this.down = false;
                    break;
                case "d":
                    this.right = false;
                    break;
                case "a":
                    this.left = false;
                    break;
                
            }
        };
    }
}