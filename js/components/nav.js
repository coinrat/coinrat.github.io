'use strict';

app.components.nav = (function() {
  var $usd;
  var $gbp;
  var $eur;
  var $coins;

  var clearSelected = function() {
    $usd.removeClass('selected');
    $gbp.removeClass('selected');
    $eur.removeClass('selected');
  };

  var getSelectedBaseCurrency = function() {
    return $('.moving-slider .selected').attr('id');
  };

  var reload = function() {
    var base = getSelectedBaseCurrency();
    var coins = parseFloat($coins.val());

    if (isNaN(coins)) {
      coins = 1;
    }

    app.components.rateService.loadRates(base, coins);
  };

  var init = function() {
    $usd = $('#usd');
    $gbp = $('#gbp');
    $eur = $('#eur');
    $coins = $('#coins');

    $usd.on('click', function(e) {
      e.preventDefault();
      clearSelected();
      $(this).addClass('selected');
      reload();
    });

    $gbp.on('click', function(e) {
      e.preventDefault();
      clearSelected();
      $(this).addClass('selected');
      reload();
    });

    $eur.on('click', function(e) {
      e.preventDefault();
      clearSelected();
      $(this).addClass('selected');
      reload();
    });

    $('#update').on('click', function(e) {
      e.preventDefault();
      reload();
    });
  };

  return {
    init: init
  };
})();
