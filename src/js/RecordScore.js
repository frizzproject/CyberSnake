import Score from "./Score";
import Theme from "./Theme.js";
import { css } from "./Utils.js";

/* ===== RecordScore ===== */
export default class RecordScore extends Score {

    constructor(scoreTable, score) {
        super(scoreTable, score);

        this.theme = new Theme();
        this.config.storage = 'record_score';
        this.score = this.getLocalScore();

        this.draw();

    }

    /* ===== Increment score ===== */
    incScore() {
        super.incScore();
    }

    /* ===== Set localStorage ===== */
    setLocalScore() {
        localStorage.setItem(this.config.storage, JSON.stringify(this.score));
    }

    /* ===== Get localStorage ===== */
    getLocalScore() {
        return localStorage.getItem(this.config.storage) ? JSON.parse(localStorage.getItem(this.config.storage)) : 0;
    }

    /* ===== Draw ===== */
    draw() {
        this.theme.updateTheme();
        // css(this.scoreTable, {color: this.theme.recordColor});
        this.scoreTable.textContent = this.score;
    }

}