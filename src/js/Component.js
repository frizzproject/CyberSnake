import Config from "./Config";

/* ===== Component ===== */
export default class Component {

    constructor(container = document.querySelector('body'), element = 'div') {

        this.container = container;
        this.element = element;
        this.showTime;

    }

    /* ===== Append ===== */
    appendComponent() {
        return this.container.append(this.element);
    }

    /* ===== Delete ===== */
    deleteComponent() {
        return this.container.lastChild.remove();
    }

    /* ===== Hide ===== */
    hideComponent() {
        return this.element.style.opacity = 0;
    }

}