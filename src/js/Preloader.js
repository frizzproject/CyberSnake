import Config from "./Config";
import Component from "./Component";
import { css } from "./Utils.js";

/* ===== Preloader ===== */
export default class Preloader extends Component {

    constructor(container, element) {
        super(container, element);

        this.config = new Config();
        this.container = container;
        this.element = document.createElement(element);
        this.showTime = 1500;

        this.element.className = 'preloader';
        this.element.innerHTML = this.config.appName;

        css(this.element, {width: 100 + 'vw', height: 100 + 'vh'})

        this.appendComponent();
        setTimeout(() => this.hideComponent(), this.showTime);
        setTimeout(() => this.deleteComponent(), this.showTime + 500);
        
    }

}