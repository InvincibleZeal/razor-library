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
    this.elements.forEach(el => {
        var evt = this.eventHandler.bindEvent(event, callback, el);
    })
}
domElement.prototype.off = function (event) {
    this.elements.forEach(el => {
        var evt = this.eventHandler.unbindEvent(event, el);
    });
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

domElement.prototype.append = function (html) {
    this.elements.forEach(el => {
        el.innerHTML = el.innerHTML + html;
    })
};
domElement.prototype.prepend = function (html) {
    this.elements.forEach(el => {
        el.innerHTML = html + el.innerHTML;
    });
};
domElement.prototype.html = function (html) {
    if (html === undefined) {
        return this.elements.length > 1 ? this.elements[0].value : undefined;
    } else {
        this.elements.forEach(el => {
            this.element.innerHTML = html;
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

domElement.prototype.eventHandler = {
    events: [],
    bindEvent: function (event, callback, targetElement) {
        this.unbindEvent(event, targetElement);
        targetElement.addEventListener(event, callback, false);
        this.events.push({
            type: event,
            event: callback,
            target: targetElement
        });
    },
    findEvent: function (event) {
        return this.events.filter(function (evt) {
            return (evt.type === event);
        }, event)[0];
    },
    unbindEvent: function (event, targetElement) {
        var foundEvent = this.findEvent(event);
        if (foundEvent !== undefined) {
            targetElement.removeEventListener(event, foundEvent.event, false);
        }
        this.events = this.events.filter(function (evt) {
            return (evt.type !== event);
        }, event);
    }
};

$razor = function (selector) {
    var el = new domElement(selector);
    el.init();
    return el;
}

$razor.setState = function(key, value, isSessionStorage){
    isSessionStorage ? sessionStorage.setItem(key, value) : localStorage.setItem(key, value);
}

$razor.getState = function(key, isSessionStorage){
    return isSessionStorage ? sessionStorage.getItem(key) : localStorage.getItem(key);
}