import '../sass/styles.scss';
import { css } from "./Utils.js";
import Config, { GAME_BEHAVIOR, gameBehaviorSwitch }  from "./Config.js";
import Canvas from "./Canvas.js";
import Theme from './Theme';
import GameLoop from "./GameLoop.js";
import Snake from "./Snake.js";
import Eat from "./Eat.js";
import Score from "./Score.js";
import RecordScore from "./RecordScore.js";
import Preloader from "./Preloader.js";
import Fps from './Fps.js';

/* ===== Game ===== */
class Game {

    constructor(container) {

        /* ===== Control game fields ===== */
        this.controlStart = container.querySelector('.game-start');                 // Control for start game
        this.controlSettings = container.querySelector('.game-settings');           // Control for game settings

        /* ===== Main fields ===== */
        this.$ = document.documentElement;                                          // Dom HTML
        this.canvas = new Canvas(container.querySelector('.canvas-wrapper'));       // Global canvas
        this.config = new Config();                                                 // Global config
        this.theme = new Theme();                                                   // Global theme
        this.fps = new Fps(document.querySelector('body'), 'div');

        /*  
        ===== Init themes ===== 
            If the color and thems game has never been selected, 
            then by default it is red and dark
        ===== Init themes =====
        */
        let colorCount = 0;
        // Get color
        if (localStorage.getItem(this.config.storageColor)) {
            this.$.dataset.color = localStorage.getItem(this.config.storageColor);
            colorCount = this.theme.colorArr.indexOf(localStorage.getItem(this.config.storageColor))
        } else {
            this.$.dataset.color = 'red';
            colorCount = 0;
        }    

        // Get theme                             
        localStorage.getItem(this.config.storageTheme)                              
        ? this.$.dataset.theme = localStorage.getItem(this.config.storageTheme) 
        : this.$.dataset.theme = 'dark'; 

        /* ===== New game loop ===== */
        this.gameLoop = new GameLoop(this.update.bind(this), this.render.bind(this), this.canvas, this.controlStart);

        // End screen at init or update browser
        setTimeout(() => this.gameLoop.end(), 10)

        /* ===== Listener click on the "SETTINGS" ===== */
        this.controlSettings.onclick = (e) => {
            // Click on the settings open/close
            if (e.target.name === 'settings') {
                e.target.classList.toggle('_isOpen');
                this.controlSettings.querySelector('.settings').classList.toggle('_isOpen');
            }
            // Click on the color
            if (e.target.name === 'color') {

                colorCount++;
                if (colorCount >= this.theme.colorArr.length) colorCount = 0;
 
                // Change color
                this.$.dataset.color = this.theme.colorArr[colorCount];
                // Save selected color
                localStorage.setItem(this.config.storageColor, this.theme.colorArr[colorCount]);

                this.score.draw();
                this.recordScore.draw();

                this.render();

                if (GAME_BEHAVIOR === 'END') this.gameLoop.end();

            } 
            // Click on the theme
            if (e.target.name === 'theme') {

                // Change theme
                this.$.dataset.theme === 'dark' ? this.$.dataset.theme = 'light' : this.$.dataset.theme = 'dark';
                // Save selected theme
                localStorage.setItem(this.config.storageTheme, this.$.dataset.theme);
            
                this.score.draw();
                this.recordScore.draw();
            
            }
            // Click on the fps
            if (e.target.name === 'fps') {
                e.target.classList.toggle('_isActive');
                e.target.classList.contains('_isActive') ? this.fps.appendComponent() : this.fps.deleteComponent();
            }

            // Update theme
            this.theme.updateTheme();
            
            if (this.score.score >= this.recordScore.score && this.recordScore.score != 0) {
                css(this.recordScore.scoreTable, {color: this.theme.controlThemeColor});
            } else {
                css(this.recordScore.scoreTable, {color: this.theme.recordColor});
            }
        }
        
        /* ===== Listener click on the "START" ===== */
        this.controlStart.onclick = () => {
            if (GAME_BEHAVIOR === 'END' || GAME_BEHAVIOR === 'PAUSE') {
                gameBehaviorSwitch('START');
                this.gameLoop.animate();
            } else {
                this.gameLoop.pause();
            }
        }

        /* ===== Game fields ===== */
        this.snake = new Snake();
        this.eat = new Eat();
        this.score = new Score('.game-score > .score-count', 0);
        this.recordScore = new RecordScore('.game-record > .record-count', JSON.parse(localStorage.getItem('record_score')));

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
    }
    
}

new Game(document.querySelector('#game'));
new Preloader(document.querySelector('body'), 'div');