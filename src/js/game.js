import "../sass/styles.scss";
import Config from "./Config.js";
import Canvas from "./Canvas.js";
import Theme from './Theme';
import GameLoop from "./GameLoop.js";
import Snake from "./Snake.js";
import Eat from "./Eat.js";
import Score from "./Score.js";
import RecordScore from "./RecordScore.js";
import Preloader from "./Preloader.js";
import Fps from "./Fps.js";
import Interface from "./Interface.js";

/* ===== Game ===== */
class Game {

    constructor(container) {

        /* ===== Main fields ===== */
        this.$ = document.documentElement;                                          // Dom HTML
        this.canvas = new Canvas(container.querySelector('.canvas-wrapper'));       // Global canvas
        this.config = new Config();                                                 // Global config
        this.theme = new Theme();                                                   // Global theme

        /*  
        ===== Init themes ===== 
            If the color and thems game has never been selected, 
            then by default it is red and dark
        ===== Init themes =====
        */ 
        /* ===== Get color ===== */                            
        localStorage.getItem(this.config.storageColor)                              
        ? this.$.dataset.color = localStorage.getItem(this.config.storageColor) 
        : this.$.dataset.color = 'red'; 
        /* ===== Get theme ===== */                             
        localStorage.getItem(this.config.storageTheme)                              
        ? this.$.dataset.theme = localStorage.getItem(this.config.storageTheme) 
        : this.$.dataset.theme = 'dark'; 

        /* ===== New game loop ===== */
        this.gameLoop = new GameLoop(this.update.bind(this), this.render.bind(this), this.canvas);

        // End screen at init or update browser
        this.theme.updateTheme();
        setTimeout(() => this.gameLoop.end(), 100);

        /* ===== Game fields ===== */
        this.snake = new Snake();
        this.eat = new Eat();
        this.score = new Score('.game-score > .score-count', 0);
        this.recordScore = new RecordScore('.game-record > .record-count', JSON.parse(localStorage.getItem('record_score')));
        this.fps = new Fps(document.querySelector('body'), 'div');

        /* ===== Start game ===== */
        new Interface('.game-start', this.gameLoop)
        /* ===== Settings game ===== */
        new Interface('.game-settings', this.gameLoop, this.render.bind(this), this.score, this.recordScore, this.fps);

    }

    /* ===== Update game ===== */
    update() {
        this.snake.move(this.eat, this.score, this.recordScore);
    }

    /* ===== Render game ===== */
    render() {
        this.canvas.clear(this.canvas.ctx);
        this.snake.draw(this.canvas.ctx);
        this.eat.draw(this.canvas.ctx);

        this.score.draw();
        this.recordScore.draw();
    }
    
}

new Game(document.querySelector('#game'));
new Preloader(document.querySelector('body'), 'div');