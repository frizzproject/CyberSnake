import Component from "./Component";
import Config from "./Config";
import Theme from "./Theme.js";

/* ===== Preloader ===== */
export default class Fps extends Component {

    constructor(container, element) {
        super(container, element);

        this.config = new Config();
        this.theme = new Theme();
        this.container = container;
        this.element = document.createElement(element);
        this.element.className = 'fps';

        this.element.textContent = this.fps;
        this.fpsCounter = this.fpsCounter.bind(this);

        this.lastLoop = new Date();                        // Last point for fps
        this.loop;                                         // Curren point for fps
        this.fps;                                          // FPS

        this.fpsCounter();
        
    }

    /* ===== Fps counter ===== */
    fpsCounter() {
        this.loop = new Date();
        this.fps = Math.round(1000 / (this.loop - this.lastLoop));
        this.lastLoop = this.loop;

        this.element.textContent = this.fps;

        requestAnimationFrame(this.fpsCounter);
    }

}