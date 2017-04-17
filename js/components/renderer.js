'use strict';

app.components.renderer = (function() {
  var $container;

  var createRow = function(record) {
    var createMetric = function(label, value, extra) {
      var valueClass = extra ? 'value ' + extra : 'value';

      var $metric = $('<div>').addClass('metric');
      $metric.append($('<div>').addClass('label').text(label));
      $metric.append($('<div>').addClass(valueClass).text(value));
      return $metric;
    };

    var $row = $('<section>').addClass('rate');

    var $icon = $('<a>').attr('href', record.url).attr('target', '_blank').addClass('icon');
    $icon.append($('<img>').attr('src', 'img/coins/' + record.icon));
    $row.append($icon);

    $row.append(createMetric('Name', record.name));
    $row.append(createMetric('Price', record.price));

    if (parseFloat(record.change) < 0) {
      $row.append(createMetric('Change (last hour)', '▼' + record.change, 'down'));
    } else {
      $row.append(createMetric('Change (last hour)', '▲' + record.change, 'up'));
    }

    return $row;
  };

  var init = function() {
    $container = $('.rates');
  };

  var refresh = function(data) {
    $container.empty();

    data.forEach(function(record) {
      var $row = createRow(record);
      $container.append($row);
    });
  };

  return {
    init: init,
    refresh: refresh
  };
})();
