'use strict';

(function () {
  var setupWindow = document.querySelector('.setup');

  // создание блока с магом
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  // обработчик успешной загрузки данных с сервера
  var successHandler = function (wizards) {
    window.dataGenerator.allWizards = wizards;
    window.wizardList.updateSimilarWizardsList();
  };

  // обработчик ошибки при загрузке данных с сервера
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');

    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // показ блока с похожими магами
  document.querySelector('.setup-similar').classList.remove('hidden');

  // вызов функции обращения к серверу за данными для магов
  var URL = 'https://js.dump.academy/code-and-magick/data';
  window.backend.load(URL, successHandler, errorHandler);

  // обработчик сабмита формы
  var form = setupWindow.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      setupWindow.classList.add('hidden');
    });
    evt.preventDefault();
  });

  window.dataGenerator = {
    renderWizard: renderWizard
  };
})();
