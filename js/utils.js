'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var getRandomIndex = function (min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
  };

  window.utils = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    getRandomIndex: getRandomIndex
  };
})();
