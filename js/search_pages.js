(function(window, chrome) {

  var most_visited_urls = [];

  chrome.topSites.get(topSitesCallBack);

  function topSitesCallBack(mostVisitedURLs) {

    var div = $('#mostVisited');
    var len = mostVisitedURLs.length < 10 ? mostVisitedURLs.length : 10;
    most_visited_urls = mostVisitedURLs.slice(0, len+1);

    for (var i = 0; i < len; i++) {
      var url = mostVisitedURLs[i].url;
      var favicon = 'chrome://favicon/' + url;
      var thumb = "chrome://thumb/" + url;
      var title = mostVisitedURLs[i].title;

      var contentDiv = $('<a>').attr("href", url)
          .append($('<div>', {class: 'mv-favicon'})
            .append($('<img>', {title: title}).attr('src', favicon)))
          .append($('<div>', {class: 's-title'}).text(title));

      var site = $('<div>', {class: 's-tile'})
        .append($('<div>', {class: 's-remove', "data-id": i}).text('x'))
        .append(contentDiv);

      div.append(site);
    }

    $('.s-remove').click(function() {
      var vm = $(this);
      var id = vm.attr('data-id');
      var url = most_visited_urls[id].url;
      chrome.history.deleteUrl({url: url}, function(re) {
        vm.parent().remove();
      });
    });


    $('.g-more').click(function() {
      $('.more-list').toggle();
    });
  }


  var recognition;
  var final_transcript = '';
  var userInput = document.getElementById('search-text');
  var speechButton = document.getElementById('speech');
  var recognizing = false;

  if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();

    recognition.onstart = function() {
      recognizing = true;
      $('#speech').addClass('speech-pulse');
    };

    recognition.onresult = function(event) {
      var interim_transcript = '';
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (!event.results[i][0].transcript) {
          continue;
        }

        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;

          if (!userInput.value) {
            userInput.value = '';
          }

          userInput.value += event.results[i][0].transcript;

        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
      window.location.href = 'https://www.google.com.tw/search?q=' + userInput.value;
    };

    recognition.onend = function() {
      recognizing = false;
      $('#speech').removeClass('speech-pulse');
    };

  } else {
    speechButton.style.display = 'none';
  }

  speech.addEventListener('click', startButton);

  function startButton(event) {
    if (recognizing) {
      recognition.stop();
      return;
    }
    final_transcript = '';
    recognition.lang = 'cmn-Hant-TW';
    recognition.start();
  }



})(window, chrome);
