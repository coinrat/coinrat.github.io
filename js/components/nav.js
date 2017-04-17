'use strict';

app.components.nav = (function() {
  var $usd;
  var $gbp;
  var $eur;

  var clearSelected = function() {
    $usd.removeClass('selected');
    $gbp.removeClass('selected');
    $eur.removeClass('selected');
  };

  var getSelectedBaseCurrency = function() {
    return $('.moving-slider .selected').attr('id');
  };

  var getCoinsValue = function() {
    var coins = parseFloat($('#coins').val());
    return isNaN(coins) ? 1 : coins;
  };

  var reload = function() {
    app.components.rateService.loadRates(getSelectedBaseCurrency(), getCoinsValue());
    rememberInput();
  };

  var loadRememberedValues = function() {
    var coins = localStorage.getItem('coins');

    $('#coins').val(coins || 1);

    var base = localStorage.getItem('base');

    if (base) {
      clearSelected();
      $('#' + base).addClass('selected');
    }
  };

  var rememberInput = function() {
    localStorage.setItem('base', getSelectedBaseCurrency());
    localStorage.setItem('coins', getCoinsValue());
  };

  var init = function() {
    $usd = $('#usd');
    $gbp = $('#gbp');
    $eur = $('#eur');

    loadRememberedValues();
    reload();

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

    $('#coins').on('keypress', function(e) {
      var keycode = e.keyCode ? e.keyCode : e.which;

      if (keycode === 13) {
        e.preventDefault();
        $(this).blur();
        reload();
      }
    });
  };

  return {
    init: init
  };
})();
