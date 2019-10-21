'use strict';

(function () {
  // функция ранжирования по похожести
  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.wizardList.currentCoatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.wizardList.currentEyesColor) {
      rank += 1;
    }

    return rank;
  };

  // функция сравнения имен
  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  // обновление списка похожих магов
  var similarListElement = document.querySelector('.setup-similar-list');
  var updateSimilarWizardsList = function () {
    var sortedWizards = window.dataGenerator.allWizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    });

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(window.dataGenerator.renderWizard(sortedWizards[i]));
    }

    similarListElement.innerHTML = '';
    similarListElement.appendChild(fragment);
  };
  window.wizardList = {
    updateSimilarWizardsList: updateSimilarWizardsList,
  };
})();
