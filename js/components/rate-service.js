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

  var getProjectUrlFromCode = function(code) {
    var urls = {
      btc: 'https://bitcoin.org',
      dash: 'https://www.dash.org',
      bts: 'https://bitshares.org',
      eth: 'https://www.ethereum.org',
      ltc: 'https://litecoin.org',
      xmr: 'https://getmonero.org/home',
      xrp: 'https://ripple.com',
      zec: 'https://z.cash'
    };

    return urls[code.toLowerCase()];
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
          change: parseFloat(ticker.change).toFixed(2),
          url: getProjectUrlFromCode(ticker.base.toLowerCase())
        };
      });

      app.components.renderer.refresh(data);
    });
  };

  var fetch = function(base, callback) {
    var getPairUrl = function(crypto, fiat) {
      return 'https://api.cryptonator.com/api/full/' + crypto + '-' + fiat;
    };

    var delay = 0;

    var get = function(url) {
      delay += 500;

      return new Promise(function(resolve) {
        setTimeout(function() {
          resolve(axios.get(url));
        }, delay);
      });
    };

    var requests = [
      get(getPairUrl('btc', base)),
      get(getPairUrl('eth', base)),
      get(getPairUrl('dash', base)),
      get(getPairUrl('xrp', base)),
      get(getPairUrl('ltc', base)),
      get(getPairUrl('xmr', base)),
      get(getPairUrl('zec', base)),
      get(getPairUrl('bts', base))
    ];

    return axios
      .all(requests)
      .then(function(results) {
        return callback(null, results);
      })
      .catch(callback);
  };

  return {
    loadRates: loadRates
  };
})();
