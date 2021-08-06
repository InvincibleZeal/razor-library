class Razor {
    constructor(selector) {
        this.selector = selector;
        this.elements = document.querySelectorAll(this.selector);
    }

    addClass(className) {
        this.elements.forEach(x => x.classList.add(className));
    }

    get length() {
        return this.elements.length
    }
}

const $razor = function (selector) {
    return new Razor(selector);
}