import { css, getRandomInt } from "./Utils.js";
import Config, { GAME_BEHAVIOR, gameBehaviorSwitch } from "./Config.js";
import Theme from "./Theme.js";
import Audio from "./Audio.js";

/* ===== Snake ===== */
export default class Snake {

    constructor() {

        this.config = new Config();
        this.theme = new Theme();
        
        this.tails = [];                                // Sanke elements
        this.maxTails = 3;                              // Max snake length
        this.direction = 'RIGHT';                       // Start direction
        this.sleepTime = this.config.sleepKey;          // Duration press key (100ms)
        this.randomSpawn();                             // Random spawn sanke (this.x, this.y)
        this.dx = 0;                                    // Move direction x
        this.dy = 0;                                    // Move direction y

        this.scoreSound = new Audio(this.theme.scoreSoundArr, false, 0.1);     // Sound score
        this.loosSound = new Audio(this.theme.loosSoundArr, false, 0.1);       // Sound loos
        
        this.control(); 
        
    }

    /* ===== Move sanke ===== */
    move(eat, score, recordScore) {
        /* Move */
        switch (this.direction) {
            case "UP":
                this.dy = -this.config.sizeCell;
                this.dx = 0;
                break;
            case "DOWN":
                this.dy = this.config.sizeCell;
                this.dx = 0;
                break;
            case "RIGHT":
                this.dx = this.config.sizeCell;
                this.dy = 0;
                break;
            case "LEFT":
                this.dx = -this.config.sizeCell;
                this.dy = 0;
                break;
        }
        this.x += this.dx;
        this.y += this.dy;
        
        this.tails.unshift({x: this.x, y: this.y});
        if (this.tails.length > this.maxTails) this.tails.pop();

        /* Border collisions */
        this.collisions(this.config.canvasWidth, this.config.canvasHeight);

        /* Food collisions & Loos */
        this.tails.forEach((el, index) => { 
            // Food collision
            if ( el.x == eat.x && el.y == eat.y ) {
                this.maxTails++;
                this.scoreSound.play();

                score.incScore(score);
                if (score.score > recordScore.score) recordScore.incScore();
                if (score.score >= recordScore.score)
                    css(recordScore.scoreTable, {color: this.theme.controlThemeColor});

                eat.random();
            }
            // Loos
            for (let i = index + 1; i < this.tails.length; i++) {
                if ( el.x == this.tails[i].x && el.y == this.tails[i].y ) {
                    this.loss();
                    this.loosSound.play();

                    score.reset();
                    css(recordScore.scoreTable, {color: this.theme.recordColor});
                    recordScore.setLocalScore();

                    eat.random();
                }
            }
        });
    }

    /* ===== Draw sanke ===== */
    draw(ctx) {
        this.theme.updateTheme();

        this.tails.forEach((el, index) => {
            if (index === 0) {
                ctx.fillStyle = this.theme.snakeHeadColor;
            } else {
                ctx.fillStyle = this.theme.snakeBodyColor;
            }

            ctx.beginPath();
            ctx.arc(el.x + this.config.sizeCell / 2, el.y + this.config.sizeCell / 2, this.config.sizeCell / 2, 0, 2 * Math.PI );
            // --- Square snake ---
            // ctx.fillRect(el.x, el.y, this.config.sizeCell,  this.config.sizeCell);    
            ctx.fill();   
        });
    }

    /* ===== Collisions sanke ===== */
    collisions(width, height) {
        if (this.x < 0) {
            this.x = width;
        } else if (this.x >= width) {
            this.x = -this.config.sizeCell;
        }
    
        if (this.y < 0) {
            this.y = height;
        } else if (this.y >= height) {
            this.y = -this.config.sizeCell;
        }
    }

    /* ===== Loos ===== */
    loss() {   
        gameBehaviorSwitch('END');

        this.randomSpawn();
        this.dx = 0,
        this.dy = 0;
        this.tails = [];
        this.maxTails = 3;
    }

    /* ===== Control sanke ===== */
    control() {
        let sleepTimer;
        document.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "KeyW":
                case "ArrowUp":
                    (this.direction != 'DOWN' && GAME_BEHAVIOR === 'START' && !sleepTimer) ? this.direction = 'UP' : this.direction;
                    sleepTimer = setTimeout(() => sleepTimer = clearTimeout(sleepTimer), this.sleepTime);
                    break;
                case "KeyS":
                case "ArrowDown":
                    (this.direction != 'UP' && GAME_BEHAVIOR === 'START' && !sleepTimer) ? this.direction = 'DOWN' : this.direction;
                    sleepTimer = setTimeout(() => sleepTimer = clearTimeout(sleepTimer), this.sleepTime);
                    break;
                case "KeyA":
                case "ArrowLeft":
                    (this.direction != 'RIGHT' && GAME_BEHAVIOR === 'START' && !sleepTimer) ? this.direction = 'LEFT' : this.direction;
                    sleepTimer = setTimeout(() => sleepTimer = clearTimeout(sleepTimer), this.sleepTime);
                    break;
                case "KeyD":
                case "ArrowRight":
                    (this.direction != 'LEFT' && GAME_BEHAVIOR === 'START' && !sleepTimer) ? this.direction = 'RIGHT' : this.direction;
                    sleepTimer = setTimeout(() => sleepTimer = clearTimeout(sleepTimer), this.sleepTime);
                    break;
            }
        });
    }

    /* ===== Set random position for snake ===== */
    randomSpawn() {
        this.x = getRandomInt(
            this.maxTails, (this.config.canvasWidth / this.config.sizeCell) - this.maxTails
        ) * this.config.sizeCell;
	    this.y = getRandomInt(
            this.maxTails, (this.config.canvasHeight / this.config.sizeCell) - this.maxTails
        ) * this.config.sizeCell;
    }

}