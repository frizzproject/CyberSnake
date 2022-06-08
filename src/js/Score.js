import Config from "./Config.js";
import Theme from "./Theme.js";
import { css } from "./Utils.js";

export default class Score {

    constructor(scoreTable, score = 0) {

        this.scoreTable = document.querySelector(scoreTable);
        this.score = score;
        
        this.config = new Config();
        this.theme = new Theme();

        this.draw();
        
    }

    /* ===== Increment score ===== */
    incScore() {
        this.score++;
        this.draw();
    }

    /* ===== Reset score ===== */
    reset() {
        this.score = 0;
        this.draw();
    }

    /* ===== Draw score ===== */
    draw() {
        this.theme.updateTheme();
        css(this.scoreTable, {color: this.theme.controlThemeColor});
        this.scoreTable.textContent = this.score;
    }

}