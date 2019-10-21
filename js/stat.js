'use strict';
(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var TEXT_LINE = 20;
  var GIST_HEIGHT = 150;
  var GIST_OFFSET = 80;
  var BAR_WIDTH = 40;
  var BAR_GAP = 50;
  var gistX = CLOUD_X + BAR_GAP;
  var gistY = CLOUD_Y + GIST_OFFSET;

  // функция для создания окна для статистики
  var renderCloud = function (ctx, x, y, color) {
    var width = CLOUD_WIDTH;
    var height = CLOUD_HEIGHT;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (width / 2), y + 10);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width + 10, y + (height / 2));
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x + (width / 2), y + height - 10);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x - 10, y + (height / 2));
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.fill();
  };

  // функция поиска максимального элемента в массиве
  var getMaxElement = function (arr) {
    var maxElement;

    if (arr.length < 1) {
      maxElement = GIST_HEIGHT;
    } else {
      maxElement = arr[0];

      for (var i = 0; i < arr.length; i++) {
        if (arr[i] > maxElement) {
          maxElement = arr[i];
        }
      }
    }
    return maxElement;
  };

  // рендеринг окна со статистикой
  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0,0,0,0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

    ctx.textBaseline = 'hanging';
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура! Вы победили!', CLOUD_X + 2 * GAP, CLOUD_Y + 2 * GAP);
    ctx.fillText('Список результатов:', CLOUD_X + 2 * GAP, CLOUD_Y + 2 * GAP + TEXT_LINE);

    var maxTime = getMaxElement(times);

    for (var i = 0; i < names.length; i++) {
      var currentBarHeight = (GIST_HEIGHT * times[i]) / maxTime;
      var saturation = Math.floor(Math.random() * 100);
      var barColor = 'hsl(230, ' + saturation + '%, 50%)';

      if (names[i] === 'Вы') {
        barColor = 'rgba(255, 0, 0, 1)';
      }

      ctx.fillStyle = barColor;
      ctx.fillRect(gistX + (BAR_WIDTH + BAR_GAP) * i, gistY + GIST_HEIGHT - currentBarHeight, BAR_WIDTH, currentBarHeight);
      ctx.fillStyle = '#000';
      ctx.fillText(names[i], gistX + (BAR_WIDTH + BAR_GAP) * i, gistY + GIST_HEIGHT + GAP);
      ctx.fillText(Math.round(times[i]), gistX + (BAR_WIDTH + BAR_GAP) * i, gistY + GIST_HEIGHT - currentBarHeight - TEXT_LINE);
    }
  };
})();
