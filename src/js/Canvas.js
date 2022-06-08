import Config from "./Config.js";

/* ===== Canvas ===== */
export default class Canvas {

    constructor(container) {
        this.element = document.createElement('canvas');
        this.ctx = this.element.getContext('2d');

        this.config = new Config();
        this.element.width = this.config.canvasWidth;
        this.element.height = this.config.canvasHeight;

        container.append(this.element);
    }

    /* ===== Clear canvas ===== */
    clear() {
        this.ctx.clearRect(0, 0, this.element.width, this.element.height);
    }

}