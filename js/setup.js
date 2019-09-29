'use strict';

(function () {
  var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

  var getRandomIndex = function (min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
  };

  var createWizard = function () {
    var wizardItem = {};
    var firstNameIndex = getRandomIndex(0, firstNames.length);
    var lastNameIndex = getRandomIndex(0, lastNames.length);
    var coatColorIndex = getRandomIndex(0, coatColors.length);
    var eyesColorIndex = getRandomIndex(0, eyesColors.length);

    wizardItem.name = firstNames.splice(firstNameIndex, 1) + ' ' + lastNames.splice(lastNameIndex, 1);
    wizardItem.coatColor = coatColors.splice(coatColorIndex, 1);
    wizardItem.eyesColor = eyesColors.splice(eyesColorIndex, 1);

    return wizardItem;
  };

  var wizards = [];
  for (var i = 0; i < 4; i++) {
    wizards.push(createWizard());
  }

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var fragment = document.createDocumentFragment();
  for (var k = 0; k < wizards.length; k++) {
    fragment.appendChild(renderWizard(wizards[k]));
  }

  var similarListElement = document.querySelector('.setup-similar-list');
  similarListElement.appendChild(fragment);

  document.querySelector('.setup-similar').classList.remove('hidden');

  // Код для 4-го задания
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setupOpenBtn = document.querySelector('.setup-open');
  var setupWindow = document.querySelector('.setup');
  var setupCloseBtn = setupWindow.querySelector('.setup-close');
  var wizardCoat = setupWindow.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setupWindow.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = setupWindow.querySelector('.setup-fireball');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var colorsSelector = function (el) {
    var elColor = '';
    switch (el) {
      case wizardCoat:
        elColor = COAT_COLORS[getRandomIndex(0, COAT_COLORS.length)];
        el.style.fill = elColor;
        setupWindow.querySelector('input[name="coat-color"]').value = elColor;
        break;
      case wizardEyes:
        elColor = EYES_COLORS[getRandomIndex(0, EYES_COLORS.length)];
        el.style.fill = elColor;
        setupWindow.querySelector('input[name="eyes-color"]').value = elColor;
        break;
      case wizardFireball:
        elColor = FIREBALL_COLORS[getRandomIndex(0, FIREBALL_COLORS.length)];
        wizardFireball.closest('.setup-fireball-wrap').style.background = elColor;
        setupWindow.querySelector('input[name="fireball-color"]').value = elColor;
        break;
    }
  };

  var openPopup = function () {
    setupWindow.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    setupWindow.addEventListener('click', function (evt) {
      colorsSelector(evt.target);
    });
  };

  var closePopup = function () {
    setupWindow.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpenBtn.addEventListener('click', function (evt) {
    evt.stopPropagation();
    openPopup();
  });

  setupOpenBtn.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      evt.stopPropagation();
      openPopup();
    }
  });

  setupCloseBtn.addEventListener('click', function () {
    closePopup();
  });

  setupCloseBtn.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

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
