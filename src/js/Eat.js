import Config from "./Config.js";
import Theme from "./Theme.js";
import { getRandomInt } from "./Utils.js";

/* ===== Eat ===== */
export default class Eat {

    constructor() {

        this.config = new Config();
        this.theme = new Theme();

        this.x = 0;
	    this.y = 0;

        this.random();
        
    }

    /* ===== Darw eat ===== */
    draw(ctx) {
        this.theme.updateTheme();

        ctx.beginPath();
        ctx.fillStyle = this.theme.eatColor;
        ctx.arc(this.x + (this.config.sizeCell / 2 ), this.y + (this.config.sizeCell / 2 ), this.config.sizeEat, 0, 2 * Math.PI );
        // --- Square eat ---
        // ctx.fillRect(this.x + this.config.sizeEat, this.y + this.config.sizeEat, this.config.sizeEat*2,  this.config.sizeEat *2);  
        ctx.fill();
    }

    /* ===== Set random position ===== */
    random() {
        this.x = getRandomInt(0, this.config.canvasWidth / this.config.sizeCell) * this.config.sizeCell;
	    this.y = getRandomInt(0, this.config.canvasHeight / this.config.sizeCell) * this.config.sizeCell;
    }

}