import Config, { GAME_BEHAVIOR, gameBehaviorSwitch }  from "./Config.js";
import Theme from "./Theme.js";

/* ===== GameLoop ===== */
export default class GameLoop {

    constructor(update, render, canvas) {

        this.config = new Config();
        this.theme = new Theme();

        this.update = update;
        this.render = render;
        this.canvas = canvas;
        // this.controlStart = controlStart;

        this.rAF;                                          // Request animation frame
        this.animate = this.animate.bind(this);  
        
        this.lastLoop = new Date();                        // Last point for fps
        this.loop;                                         // Curren point for fps
        this.fps;                                          // FPS
        
    }

    /* ===== Animation frame ===== */
    animate() {

        if (GAME_BEHAVIOR === 'START') {
            // IF SELECTED START GAME
            this.rAF = requestAnimationFrame(this.animate);
            // this.controlStart.textContent = 'PAUSE';
        } else if (GAME_BEHAVIOR === 'PAUSE') {
            // IF SELECTED PAUSE GAME
            this.pause();
        } else if (GAME_BEHAVIOR === 'END') {
            // IF LOOSE
            this.end();
        }

        if (++this.config.step < this.config.maxStep) {
            return;
        }
	    this.config.step = 0;

        this.update();
        this.render();
    }

    /* ===== Pause game ===== */
    pause() {
        gameBehaviorSwitch('PAUSE');
        cancelAnimationFrame(this.rAF);
        
        // this.controlStart.textContent = 'START';
    }

    /* ===== End game ===== */
    end() {        
        this.theme.updateTheme();

        gameBehaviorSwitch('END');
        cancelAnimationFrame(this.rAF);
        document.querySelector('.game-start').textContent = 'START';

        this.canvas.clear(this.canvas.ctx);

        // End canvas screen
        for (let x = 0 ; x < this.config.canvasWidth; x += this.config.sizeCell) {
            for (let y = 0; y < this.config.canvasHeight; y+= this.config.sizeCell) {
                this.canvas.ctx.beginPath();
                this.canvas.ctx.fillStyle = this.theme.loosColor;
                this.canvas.ctx.arc(x + (this.config.sizeCell / 2 ), y + (this.config.sizeCell / 2 ), this.config.sizeEat, 0, 2 * Math.PI);
                this.canvas.ctx.fill();
            }
        }
    }

    /* ===== Fps counter ===== */
    fpsCounter() {
        this.loop = new Date();
        this.fps = Math.round(1000 / (this.loop - this.lastLoop));
        this.lastLoop = this.loop;

        return this.fps;
    }

}