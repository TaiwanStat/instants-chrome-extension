(function(window) {

  window.setImage = setImage;
  window.setFilter = setFilter;
  var authorJSON = 'https://s3-ap-northeast-1.amazonaws.com/now.instants.xyz/author.json';

  getLocalStorage('bg-image', setImage, {}, 'local');

  getBatchLocalStorage({
    'instants-bg-brightness': '',
    'instants-bg-filter': '',
    'instants-blur': ''
  }, function(data) {
    setBrightness(data['instants-bg-brightness']);
    setFilter(data['instants-bg-filter']);
    setBlur(data['instants-blur']);
  }, {}, 'sync');

  setTimeout(function() {
    $('#brightness-control').click(function() {
      _gaq.push(['_trackEvent', 'clicked', 'brightness-control']);
      $('#brightness-wrapper').toggle();
      $('.loc-setting-panel').hide();
    });
    $('#brightness').change(function() {
      var perc = this.value;
      setBrightness(perc);
      updateBrightness(perc, true);
    });
  }, 500);

  function setImage(localImg) {

    if (!localImg) {
      setImgInfo(authorJSON, true);
    }
    else {
      setImgInfo(authorJSON, false);
      $('#background').css('background', 'url(' + localImg +')');
    }

    $('#background').show();
  }

  function setBlur(blur) {
    if (!blur)
      blur = 0;
    $('#background').css('-webkit-filter', 'blur(' + blur + 'px)');
  }

  function setFilter(filter) {
    if (filter === 'false') {
      return;
    }
    else if (!filter) {
      filter = '';
    }
    $('.background-wrapper').addClass(filter);
  }

  function setImgInfo(url, showAuthor) {
    $.getJSON(url, function(data) {
      if (data && data.name) {
        var text = '';

        setQuotes(data.quote);
        if (!showAuthor)
          return;

        if (data.url) {
          text += '<a class="author" href="'+data.url+'" target="_blank">'+data.name+'</a> ';
        }
        else {
          text += data.name;
        }

        if (data.location) {
          text += '／於' + data.location;
        }
        //text += ' <a class="img-download" href="' + data.img + '" download>' +
         // '<i class="glyphicon glyphicon-download"></i></a>';

        $('.author-wrapper').html(text+'拍攝');
        if (data.color) {
          $('.s-tile').css('background-color', 'rgba(240, 240, 240, 0.25)');
        }

      }
    })
    .fail(function() {
      $('.error').html($('<a>', { href: "", class: "btn btn-warning"})
         .append($('<span>').text('抱歉，目前無法與Instants建立連線...重試。'))
         .append($('<i>', {class: 'refresh glyphicon glyphicon-refresh'})));
    });
  }

  function setBrightness(perc) {
    if (perc) {
      var opacity = 1 - perc / 100.0;
      $('body').css('background-color', 'rgba(0,0,0,' + opacity + ')');
    }
    else {
      perc = 80;
    }
    updateBrightness(perc);

  }
  function updateBrightness(perc, save) {
    document.getElementById('brightness').value = perc;
    document.getElementById('brightness-value').innerText = perc;
    if (save)
      saveToLocalStorage('bg-brightness', perc);
  }

  function setQuotes(quotes) {
    $('#quotes').html(quotes);
  }

})(window);
