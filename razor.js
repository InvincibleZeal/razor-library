var domElement = function (selector) {
  this.selector = selector || null;
  this.elements = null;
  this.queue = [];
};

domElement.prototype = {
  get length() {
    return this.elements.length;
  },
};

domElement.prototype.init = function () {
  this.elements = document.querySelectorAll(this.selector);
};

// Util Functions
domElement.prototype.on = function (...args) {
  if (this.timer) {
    this.queue.push(() => {
      this.onUtil(...args);
    });
  } else {
    this.onUtil(...args);
  }
  return this;
};

domElement.prototype.off = function (...args) {
  if (this.timer) {
    this.queue.push(() => {
      this.offUtil(...args);
    });
  } else {
    this.offUtil(...args);
  }
  return this;
};

domElement.prototype.setStyle = function (...args) {
  if (this.timer) {
    this.queue.push(() => {
      this.setStyleUtil(...args);
    });
  } else {
    return this.setStyleUtil(...args);
  }
};

domElement.prototype.addClass = function (...args) {
  if (this.timer) {
    this.queue.push(() => {
      this.addClassUtil(...args);
    });
  } else {
    this.addClassUtil(...args);
  }
  return this;
};

domElement.prototype.setProps = function (...args) {
  if (this.timer) {
    this.queue.push(() => {
      this.setPropsUtil(...args);
    });
  } else {
    this.setPropsUtil(...args);
  }
  return this;
};

// DOM Methods
domElement.prototype.onUtil = function (event, callback) {
  this.off(event, callback);
  this.elements.forEach((targetElement) => {
    targetElement.addEventListener(event, callback, true);
  });
};

domElement.prototype.offUtil = function (event, callback) {
  this.elements.forEach((targetElement) => {
    targetElement.removeEventListener(event, callback, true);
  });
};

domElement.prototype.val = function (newVal) {
  if (newVal === undefined) {
    return this.elements.length > 1 ? this.elements[0].value : undefined;
  } else {
    this.elements.forEach((el) => {
      el.value = newVal;
    });
  }
};

domElement.prototype.addClassUtil = function (className) {
  this.elements.forEach((el) => {
    el.classList.add(className);
  });

  return this;
};

domElement.prototype.setStyleUtil = function (styles) {
  this.elements.forEach((el) => {
    Object.keys(styles).forEach((s) => {
      el.style[s] = styles[s];
    });
  });
  return this;
};

domElement.prototype.setPropsUtil = function (key, value) {
  this.elements.forEach((el) => {
    el.setAttribute(key, value);
  });
  return this;
};

domElement.prototype.delay = function (duration) {
  queue = this.queue;
  this.timer = setTimeout(function () {
      console.log("queue", queue)
    timer = 0;
    var f;
    while ((f = queue.shift())) f();
  }, duration);
  return this;
};

// Driver Functions
$razor = function (selector) {
  var el = new domElement(selector);
  el.init();
  return el;
};

// Static Methods
$razor.api = function (...args) {
  return fetch(...args);
};

$razor.setState = function (key, value, isSessionStorage) {
  isSessionStorage
    ? sessionStorage.setItem(key, value)
    : localStorage.setItem(key, value);
};

$razor.getState = function (key, isSessionStorage) {
  return isSessionStorage
    ? sessionStorage.getItem(key)
    : localStorage.getItem(key);
};
