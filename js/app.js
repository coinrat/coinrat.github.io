'use strict';

var app = {
  components: {},
  state: {},
  init: function() {
    Object.keys(app.components).forEach(function(key) {
      if (app.components[key].init) {
        app.components[key].init();
      }
    });
  }
};