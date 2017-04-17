'use strict';

app.components.rateService = (function() {
  var data = [];

  var getCurrencySymbol = function(base) {
    return { usd: '$', eur: '€', gbp: '£' }[base.toLowerCase()];
  };

  var getNameFromCode = function(code) {
    var names = {
      btc: 'Bitcoin',
      dash: 'Dash',
      bts: 'Bitshares',
      eth: 'Ethereum',
      ltc: 'Litecoin',
      xmr: 'Monero',
      xrp: 'Ripple',
      zec: 'Zcash'
    };

    return names[code.toLowerCase()];
  };

  var loadRates = function(base, coins) {
    var checkForErrors = function(results) {
      var errors = results.filter(function(result) {
        return result.data && result.data.error;
      });

      if (errors.length > 0) {
        return errors[0].data.error;
      }

      return null;
    };

    app.components.loader.show(true);

    fetch(base, function(err, results) {
      app.components.loader.show(false, 1500);

      if (err) {
        console.log('error: could not load rates', err);
        return;
      }

      var error = checkForErrors(results);

      if (error) {
        console.log('error: could not load rates: ', error);
        return;
      }

      data = results.map(function(result) {
        var ticker = result.data.ticker;
        var price = parseFloat(ticker.price) * coins;

        return {
          icon: ticker.base.toLowerCase() + '.svg',
          name: getNameFromCode(ticker.base),
          price: getCurrencySymbol(base) + price.toFixed(2),
          change: parseFloat(ticker.change).toFixed(2)
        };
      });

      app.components.renderer.refresh(data);
    });
  };

  var fetch = function(base, callback) {
    var getPairUrl = function(crypto, fiat) {
      return 'https://api.cryptonator.com/api/full/' + crypto + '-' + fiat;
    };

    var requests = [
      axios.get(getPairUrl('btc', base)),
      axios.get(getPairUrl('eth', base)),
      axios.get(getPairUrl('dash', base)),
      axios.get(getPairUrl('xrp', base)),
      axios.get(getPairUrl('ltc', base)),
      axios.get(getPairUrl('xmr', base)),
      axios.get(getPairUrl('zec', base)),
      axios.get(getPairUrl('bts', base))
    ];

    return axios.all(requests).then(function(results) {
      return callback(null, results);
    }).catch(callback);
  };

  return {
    loadRates: loadRates
  };
})();
