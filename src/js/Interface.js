import { css } from "./Utils.js";
import Config, { GAME_BEHAVIOR, gameBehaviorSwitch }  from "./Config.js";
import Theme from './Theme';

export default class Interface {

    constructor(element, gameLoop, render, score, recordScore, fps) {

        this.config = new Config();                                 // Config
        this.theme = new Theme();                                   // Theme

        this.$ = document.documentElement;                          // Dom HTML
        this.element = document.querySelector(element);

        this.gameLoop = gameLoop;                                   // GameLoop
        this.render = render;                                       // Render
        this.score = score;                                         // Score
        this.recordScore = recordScore;                             // Record Score
        this.fps = fps;                                             // Fps

        localStorage.getItem(this.config.storageColor)              // Color count
        ? this.colorCount = this.theme.colorArr.indexOf(localStorage.getItem(this.config.storageColor))
        : this.colorCount = 0;
                               
        /* ===== Click on interface element ===== */
        this.element.onclick = (e) => {
            switch (e.target.name) {
                /* ===== Listener click on the "START" ===== */
                case 'start': this.startGame(); break;
                /* ===== Listener click on the "SETTINGS" ===== */
                case 'settings': this.toggleClass([e.target, this.element.querySelector('.settings')], '_isOpen'); break;
                /* ===== Listener click on the "FPS" ===== */
                case 'fps': 
                    this.toggleClass([e.target], '_isActive'); 
                    e.target.classList.contains('_isActive') ? this.fps.appendComponent() : this.fps.deleteComponent();
                    break;
                /* ===== Listener click on the "COLOR" ===== */
                case 'color': this.colorGame(); break;
                /* ===== Listener click on the "THEME" ===== */
                case 'theme': this.themeGame(); break;
            }
        }

    }

    /* ===== Start game ===== */
    startGame() {
        if (GAME_BEHAVIOR === 'END' || GAME_BEHAVIOR === 'PAUSE') {
            gameBehaviorSwitch('START');
            this.element.textContent = 'PAUSE';
            this.gameLoop.animate();
        } else {
            this.gameLoop.pause();
            this.element.textContent = 'START';
        }
    }

    /* ===== Change color game ===== */
    colorGame() {
        this.colorCount++;
        if (this.colorCount >= this.theme.colorArr.length) this.colorCount = 0;

        this.$.dataset.color = this.theme.colorArr[this.colorCount];

        localStorage.setItem(this.config.storageColor, this.theme.colorArr[this.colorCount]);

        this.theme.updateTheme();
        this.render();

        if (GAME_BEHAVIOR === 'END') this.gameLoop.end();

        if (this.score.score >= this.recordScore.score && this.recordScore.score != 0) {
            css(this.recordScore.scoreTable, {color: this.theme.controlThemeColor});
        } else {
            css(this.recordScore.scoreTable, {color: this.theme.recordColor});
        }
    }

    /* ===== Change theme game ===== */
    themeGame() {
        // Change theme
        this.$.dataset.theme === 'dark' ? this.$.dataset.theme = 'light' : this.$.dataset.theme = 'dark';
        // Save selected theme
        localStorage.setItem(this.config.storageTheme, this.$.dataset.theme);
        
        this.theme.updateTheme();
        this.render();

        if (GAME_BEHAVIOR === 'END') this.gameLoop.end();

        if (this.score.score >= this.recordScore.score && this.recordScore.score != 0) {
            css(this.recordScore.scoreTable, {color: this.theme.controlThemeColor});
        } else {
            css(this.recordScore.scoreTable, {color: this.theme.recordColor});
        }
    }

    /* ===== Toggle ===== */
    toggleClass(elList, cls) {
        elList.forEach(el => el.classList.toggle(cls));
    }

}