var domElement = function (selector) {
    this.selector = selector || null;
    this.elements = null;
};

domElement.prototype = {
    get length() {
        return this.elements.length;
    }
}
domElement.prototype.init = function () {
    this.elements = document.querySelectorAll(this.selector);
};

domElement.prototype.on = function (event, callback) {
    this.off(event, callback);
    this.elements.forEach(targetElement => {
        targetElement.addEventListener(event, callback, true);
    })
}
domElement.prototype.off = function (event, callback) {
    console.log(this.elements, event)
    this.elements.forEach(targetElement => {
        targetElement.removeEventListener(event, callback, true);
    })
}

domElement.prototype.val = function (newVal) {
    if (newVal === undefined) {
        return this.elements.length > 1 ? this.elements[0].value : undefined;
    } else {
        this.elements.forEach(el => {
            el.value = newVal;
        })
    }
};

domElement.prototype.addClass = function (className) {
    this.elements.forEach(el => {
        el.classList.add(className);
    });

    return this;
}

domElement.prototype.setStyle = function (styles) {
    this.elements.forEach(el => {
        Object.keys(styles).forEach(s => {
            el.style[s] = styles[s]
        })
    });
    return this;
}

$razor = function (selector) {
    var el = new domElement(selector);
    el.init();
    return el;
}

$razor.api = function (...args) {
    return fetch(...args);
}

$razor.setState = function (key, value, isSessionStorage) {
    isSessionStorage ? sessionStorage.setItem(key, value) : localStorage.setItem(key, value);
}

$razor.getState = function (key, isSessionStorage) {
    return isSessionStorage ? sessionStorage.getItem(key) : localStorage.getItem(key);
}