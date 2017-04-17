'use strict';

app.components.loader = (function() {
  var messages = [
    'The bits are breeding.',
    'Pay no attention to the man behind the curtain.',
    'Go ahead - hold your breath!',
    'At least you\'re not on hold.',
    'The server is powered by a lemon and two electrodes.',
    'We\'re just testing your patience.',
    'The bits are flowing slowly today.',
    'It\'s still faster than you could draw it.',
    'The last time I tried this the rat didn\'t survive.',
    'The other loading screen is much faster.',
    'Insert quarter.',
    'Do you come here often?',
    'What do you call 8 Hobbits? A Hobbyte.',
    'We are not liable for any broken screens as a result of waiting.',
    'Time flies when you’re having fun.',
    '99 bottles of beer on the wall...',
    'Your left thumb points to the right and your right thumb points to the left.',
    'Wait, do you smell something burning?',
    'Tip: never steal – the government hates competition.'
  ];

  var getRandomMessage = function() {
    return messages[Math.floor(Math.random() * messages.length)];
  };

  var show = function(show, delay) {
    if (!show) {
      if (delay) {
        setTimeout(function() {
          $('#loading-screen').hide();
        }, delay)
      } else {
        $('#loading-screen').hide();
      }
    } else {
      $('#loading-screen').show();
      $('#loading-screen').find('.message-sub').text(getRandomMessage());
    }
  };

  return {
    show: show
  };
})();
