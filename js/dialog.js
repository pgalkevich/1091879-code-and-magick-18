'use strict';
(function () {
  var dialogHandle = document.querySelector('.upload');
  var setupWindow = document.querySelector('.setup');
  var setupWindowBaseCoords = {
    x: setupWindow.style.left,
    y: setupWindow.style.top
  };

  window.setupWindowBaseCoords = {
    x: setupWindowBaseCoords.x,
    y: setupWindowBaseCoords.y
  };

  // функционал перетаскивания окна с пользовательских настроек
  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var dragged = false;
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords.x = moveEvt.clientX;
      startCoords.y = moveEvt.clientY;

      setupWindow.style.left = (setupWindow.offsetLeft - shift.x) + 'px';
      setupWindow.style.top = (setupWindow.offsetTop - shift.y) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          document.removeEventListener('click', onClickPreventDefault);
        };

        document.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
})();
