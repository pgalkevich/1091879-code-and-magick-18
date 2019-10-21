'use strict';

// функционал окна пользовательских настроек
(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setupOpenBtn = document.querySelector('.setup-open');
  var setupWindow = document.querySelector('.setup');
  var setupCloseBtn = setupWindow.querySelector('.setup-close');
  var wizardCoat = setupWindow.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setupWindow.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = setupWindow.querySelector('.setup-fireball');

  // закрытие окна по нажатию Esc
  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePopup);
  };

  // рандомный перебор цвета глаз, плаща, файрбола по клику
  var colorsSelector = function (el) {
    var elColor = '';
    switch (el) {
      case wizardCoat:
        elColor = COAT_COLORS[window.utils.getRandomIndex(0, COAT_COLORS.length)];
        el.style.fill = elColor;
        setupWindow.querySelector('input[name="coat-color"]').value = elColor;
        window.wizardList.currentCoatColor = elColor;
        break;
      case wizardEyes:
        elColor = EYES_COLORS[window.utils.getRandomIndex(0, EYES_COLORS.length)];
        el.style.fill = elColor;
        setupWindow.querySelector('input[name="eyes-color"]').value = elColor;
        window.wizardList.currentEyesColor = elColor;
        break;
      case wizardFireball:
        elColor = FIREBALL_COLORS[window.utils.getRandomIndex(0, FIREBALL_COLORS.length)];
        wizardFireball.closest('.setup-fireball-wrap').style.background = elColor;
        setupWindow.querySelector('input[name="fireball-color"]').value = elColor;
        break;
    }

    window.utils.debounce(window.wizardList.updateSimilarWizardsList, 500);
    // window.utils.debounce2(function () {
    //   window.wizardList.updateSimilarWizardsList();
    // });
  };

  // открыть окно настроек
  var openPopup = function () {
    setupWindow.classList.remove('hidden');
    window.addEventListener('keydown', onPopupEscPress);
    setupWindow.addEventListener('click', function (evt) {
      colorsSelector(evt.target);
    });
  };

  // закрыть окно настроек
  var closePopup = function () {
    setupWindow.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setupWindow.style.left = window.setupWindowBaseCoords.x;
    setupWindow.style.top = window.setupWindowBaseCoords.y;
  };

  // обработчик кнопки открытия окна настроек
  setupOpenBtn.addEventListener('click', function (evt) {
    evt.stopPropagation();
    openPopup();
  });

  // обработчик кнопки открытия окна настроек (открытие с клавиатуры)
  setupOpenBtn.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, openPopup);
  });

  // обработчик кнопки закрытия окна настроек
  setupCloseBtn.addEventListener('click', function () {
    closePopup();
  });

  // обработчик кнопки закрытия окна настроек (с клавиатуры)
  setupCloseBtn.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, closePopup);
  });

  // валидация поля ввода имени
  var userNameInput = setupWindow.querySelector('.setup-user-name');
  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  userNameInput.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });
})();
