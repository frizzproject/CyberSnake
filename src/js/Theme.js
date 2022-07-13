import { getCSSCustomProp } from "./Utils";

/* ===== Theme ===== */
export default class Theme {

    constructor() {

        this.colorArr = ['red', 'pink', 'purple', 'green', 'yellow', 'white'];      // Colors theme list 

        this.scoreSoundArr = [				// Score sound urls
        new URL('../audio/score.mp3', import.meta.url).pathname, 
        new URL('../audio/score.wav', import.meta.url).pathname, 
        new URL('../audio/score.ogg', import.meta.url).pathname
        ];
        this.loseSoundArr = [				// Lose sound urls
            new URL('../audio/loos.mp3', import.meta.url).pathname, 
            new URL('../audio/loos.wav', import.meta.url).pathname, 
            new URL('../audio/loos.ogg', import.meta.url).pathname
        ];

        this.updateTheme();
        
    }

    /* ===== Update theme ===== */
    updateTheme() {
        this.controlThemeColor = getCSSCustomProp('--control-theme-color');     // Color conrol theme
        this.recordColor = getCSSCustomProp('--record-color');                  // Color record default
        this.snakeHeadColor = getCSSCustomProp('--snake-head-color');           // Color head snake
        this.snakeBodyColor = getCSSCustomProp('--snake-body-color');           // Color body snake
        this.eatColor = getCSSCustomProp('--eat-color');                        // Color eat for snake
        this.loseColor = getCSSCustomProp('--lose-color');                      // Color loos screen
    }
    
}