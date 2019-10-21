'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var lastTimeout;
  var debounce = function (cb, interval) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, interval);
  };

  // var DEBOUNCE_INTERVAL = 500;
  // var debounce2 = function (cb) {
  //   var lastTimeout = null;
  //
  //   return function () {
  //     var parameters = arguments;
  //     if (lastTimeout) {
  //       window.clearTimeout(lastTimeout);
  //     }
  //     lastTimeout = window.setTimeout(function () {
  //       cb.apply(null, parameters);
  //     }, DEBOUNCE_INTERVAL);
  //   };
  // };

  var getRandomIndex = function (min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  window.utils = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    getRandomIndex: getRandomIndex,
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent,
    debounce: debounce
  };
})();
