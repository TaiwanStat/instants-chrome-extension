(function(window, chrome) {

  // User position
  window.position = {};
  var newPosition = {};

  // Manual location
  var locationData = {};
  var customRegion = '';
  var isLocationManual = false;

  // Page rendering
  var currentPage = 'life';
  var renderAfterLocationUpdate = false;
  var renderNote = true;
  var renderSocial = true;
  var artInit = false;

  // init
  initConfigs();
  initEvents();

  function initConfigs() {
    var defaultPages = {
      arts: true,
      search: true,
      apps: true,
      bookmark: true,
      forecast: true,
      news: true,
      social: false,
      note: true
    };

    getBatchLocalStorage({
      'instants-isLocationManual': false,
      'instants-user-location-list': '',
      'instants-initPage': 'default',
      'instants-showPages': defaultPages,
      'instants-showTime': true,
      'instants-showSearch': false,
      'instants-timeFormat': 24,
      'instants-lastPage': 'life',
      'instants-location': null

    }, function(data) {
      isLocationManual = data['instants-isLocationManual'];
      customRegion = data['instants-user-location-list'];

      initPage(data['instants-initPage'], data['instants-location'], data['instants-lastPage']);

      showTime(data['instants-showTime'], data['instants-timeFormat']);
      showSearch(data['instants-showSearch']);
      showPages(data['instants-showPages']);
    }, {}, 'sync');
  }

  /* Page functions */

  function initPage(p, loc, lastPage) {

    // Default, open last page
    if (!p || p === 'default') {
      openLastPage(lastPage);
      _gaq.push(['_trackEvent', p, 'initPage']);
    }
    else {   // User custom init page
      currentPage = p;
      displayCurrentPage();
      _gaq.push(['_trackEvent', p, 'initPage']);
    }
    checkLocationAndUpdate(loc);
  }

  function openLastPage(p) {
    currentPage = p || 'life';
    displayCurrentPage();
    _gaq.push(['_trackEvent',  p, 'lastPage']);
  }

  /*
  * Remove and show pages depend user config
  */
  function showPages(config) {
    $('#life').show();
    if (config) {
      for (var page in config) {
        if (config[page] === false) {
          removePage(page);
        }
        else {
          $('#'+page).show();
        }
      }
    }
  }

  function removePage(id) {
    $('#'+id).hide();
    $('#'+id+'-block').remove();
  }

  function displayCurrentPage(page) {
    if (page && page === currentPage) {
      return;
    }
    activePages();
    $('#'+currentPage).addClass('active');
    $('.'+currentPage+'-block').show();
    updateRightSideBar();
  }

  function hideCurrentPage(page) {
    if (page && page === currentPage) {
      return;
    }
    $('#'+currentPage).removeClass('active');
    $('.'+currentPage+'-block').hide();
  }

  /* Location update functions */

  function checkLocationAndUpdate(loc) {
    newPosition = loc;

    if (isValidLocation(loc)) {
      position = loc;
      contentRouter(false);
    }
    else {
      renderAfterLocationUpdate = true;
    }

    var diff;
    if (loc && loc.updateAt) {
      diff = diffMins(window.now, new Date(loc.updateAt));
    }

    if (!diff || diff > 30) {
      detectAndUpdateLocation();
    }
  }

  function detectAndUpdateLocation() {
    if (renderAfterLocationUpdate) {
      $('.content').html($('<div>', { title : "載入中...", class: "loading"} ));
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateLocation, handleLocationError);
    }
    else {
      throwError('抱歉，您的瀏覽器目前不支援定位功能，可以升級至最新版本，解決此問題。');
    }
  }

    // update current locaiton
  function updateLocation(pos) {
    newPosition = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
      updateAt: +window.now
    };

    if (!isLocationManual && isValidLocation(newPosition)) {
      position = newPosition;
      // save new location
      saveToLocalStorage('location', newPosition, 'sync');

      if (renderAfterLocationUpdate) {
        contentRouter(true);
      }
    }
  }

  function handleLocationError(error) {
     switch(error.code) {
      case error.PERMISSION_DENIED:
      case error.POSITION_UNAVAILABLE:
        throwError('抱歉，我們目前無法取得您的位置資訊，或無法順利建立網路連線。');
        break;
      case error.TIMEOUT:
        throwError('抱歉，取得位置資訊時發生了錯誤。');
        break;
      case error.UNKNOWN_ERROR:
        throwError('抱歉，取得位置資訊發生未知的錯誤，請聯絡我們。');
    }
  }

  function sidebarSwitch(e, page) {
    var id = page || this.id;

    if (id === currentPage || id === 'apps')
      return;

    hideCurrentPage(id);
    currentPage = id;
    displayCurrentPage();

    if (id === 'life') {
      $('#life-block .content').empty();
      startRender(lifeUpdateManger, false);
    }
    else if (id === 'arts' && !artInit) {
      startRender(artsUpdateManger, false);
      artInit = true;
    }
    else if (id === 'bookmark') {
      dumpBookmarks();
    }
    else if (id === 'forecast') {
      $('#forecast-block .content').empty();
      startRender(forecastUpdateManger, false);
    }
    else if (id === 'news') {
      loadSocialJS();
    }

    saveToLocalStorage('lastPage', currentPage, 'sync');
    _gaq.push(['_trackEvent', id, 'mourseover']);
  }

  /**
   *  CheckLastUpdate -> from local
   *  or -> fetch server
   *
   */
  function startRender(config, isRefresh) {
    for (var key in config) {

      if (key === 'power' && !window.news.isInit && Math.random() < 0.5) {
        var newsItem = newsUpdateManger.central;
        $('.power-title').text('即時快訊');
        if (newsItem.category === 'local') {
          fetchRSS(newsItem.path, renderLocalNews, newsItem);
        }
        continue;
      }
      else if (key === 'oil') {
        var rand = new Date().getDay() === 0 ? 0.4 : 0.8;

        if (Math.random() < rand) {
          getLocalStorage(specialUpdate.book.timeHandler, checkUpdate, {
            key: 'book',
            params: specialUpdate.book,
            refresh: isRefresh
          }, 'local');
          continue;
        }
      }
      else if (key === 'art' && Math.random() < 0.3) {
        getLocalStorage(specialUpdate.music.timeHandler, checkUpdate, {
            key: 'music',
            params: specialUpdate.music,
            refresh: isRefresh
        }, 'local');
        continue;
      }

      // check last update time from storage & if expire callback it's fn
      getLocalStorage(config[key].timeHandler, checkUpdate, {
        key: key,
        params: config[key],
        refresh: isRefresh
      }, 'local');
    }
  }

  function renderLocalNews(data, source) {
    $('#power .loading').remove();
    addItems('#power', data, source, 1, 1);
  }

  function checkUpdate(lastUpdateTime, entity) {
    var interval = entity.params.interval;
    var params = entity.params;
    var key = entity.key;
    var refresh = entity.refresh;
    var path = entity.params.path;
    var diff = lastUpdateTime ? diffMins(now, new Date(lastUpdateTime)) : 10080;
    var isExpire = diff > interval;

    if (isExpire && diff > 60) {
      refresh = true;
    }

    if (refresh) {
      resetContent(key, '<div title="載入中..." class="loading"></div>');
      if (key === 'music') {
        resetContent('local-arts', '<div title="載入中..." class="loading"></div>');
      }
      else if (key === 'book') {
        resetContent('oil', '<div title="載入中..." class="loading"></div>');
      }
    }
    else {
      getLocalStorage(key, renderFromLocalData, {key: key, cb: params.fn}, 'local');
    }

    if (isNaN(lastUpdateTime) || isExpire || refresh) {
      if (key === 'art' && key === 'movie') {
        getLocalStorage('artsSelect', updateDataWithOption, [key, HOST+path+'?', params.fn, refresh]);
      }
      else if (key === 'power') {
        updateData(key, powerURL, params.fn, refresh);
      }
      else if (params.canSelectBySiteName) {
        getLocalStorage(key+'Select', updateDataWithOption, [key, HOST+path+'?', params.fn, refresh]);

      } else {
        updateData(key, HOST+path+'?', params.fn, refresh);
      }
    }
  }

  function updateDataWithOption(userOption, params) {
    if (!userOption) {
      userOption = 'auto';
    }

    var url = params[1]+'select='+userOption+'&';
    updateData(params[0], url, params[2], params[3]);
  }

  function updateData(key, url, cb, refresh) {
    var api = url+'lat='+position.lat+'&lng='+position.lng;
    var keyTime = key+'Time';

    $.getJSON(api, function(data) {
      if (data) {
        if (refresh) {
          resetContent(key);
          cb(data);
        }
        saveToLocalStorage(key, data, 'local');
        saveToLocalStorage(keyTime, +now, 'local');
      }
    })
    .fail(function(response) {
      if (key === 'weather-forecast') {
        $('.weather-forecast-title').text('天氣預報');
      }
      else if (key === 'air-forecast') {
        $('.air-forecast-title').text('空氣品質預報');
      }

      saveToLocalStorage(keyTime, +now, 'local');
      if (!refresh) {
        return;
      }
      else if (!position.lat || !position.lng) {
        throwError('抱歉，我們目前無法取得您的位置資訊。');
      }
      else if (response.status === 0) {
        throwError('抱歉，目前無法建立網路連線...重試。');
      }
      else {
        throwError('抱歉，目前暫時無法與Instants建立連線...重試。');
      }
    });
  }

  function renderFromLocalData(data, opts) {
    if (data) {
      resetContent(opts.key);
      opts.cb(data);
    }
  }

  function resetContent(key, content) {
    if (!content)
      content = '';

    if (key === 'movie') {
      $('#movie-rank').html(content);
      $('#movie-this-week').html(content);
    }
    else if (key === 'art') {
      $('#local-arts').html(content);
    }
    else if (isLoading(key)) {
      $('#'+key).html(content);
    }
  }

  function contentRouter(isRefresh) {
    if (currentPage === 'life') {
      startRender(lifeUpdateManger, isRefresh);
    }
    else if (currentPage === 'arts') {
      artInit = true;
      startRender(artsUpdateManger, isRefresh);
    }
    else if (currentPage === 'forecast') {
      startRender(forecastUpdateManger, isRefresh);
    }
    else if (currentPage === 'bookmark') {
      $('#bookmark-search').show();
    }
  }

  function showTime(show, format) {
    if (show === false) {
      $('.col-md-4').css('margin', '0.5px');
      return;
    }
    startTime(format);
  }

  function diffMins(current, from) {
    var timeDiff = Math.abs(current.getTime() - from.getTime());
    return timeDiff/(1000 * 60);
  }

  function showSearch(show) {
    if (show) $('.search-box').show();
  }

  function isValidLocation(loc) {
    return loc && !isNaN(loc.lat) && !isNaN(loc.lng);
  }

  function isLoading (key) {
    var content = $('#'+key).text().replace(/\s/g, '');
    return !content || content === '載入中...';
  }

  // Is Array contains string
  function contains(a, obj) {
    for (var i = 0; i < a.length; ++i) {
      if (a[i] === obj) {
        return true;
      }
    }
    return false;
  }

  function clearCurrentView() {
    $('#'+currentPage+'-block .content').empty();
  }

  function updateRightSideBar() {
    $('#brightness-control').fadeIn();
    if (currentPage === 'life' || currentPage === 'forecast' || currentPage === 'arts')  {
      $('#plus, #minus, #pencil').hide();
      $('#location-setting, #refresh').fadeIn();
    }
    else if (currentPage === 'search' ){
      $('#location-setting, #refresh, #plus, #minus').hide();
      $('#pencil').fadeIn();
    }
    else if (currentPage === 'note') {
      $('#location-setting, #refresh, #pencil').hide();
      $('#plus, #minus').fadeIn();
      if (window.simplemdeList && window.simplemdeList.length >= 4) {
        $('#plus').hide();
      }
    }
    else {
      $('#location-setting, #refresh, #pencil, #minus, #plus').hide();
      if (currentPage === 'social') {
        $('#brightness-control').hide();
      }
    }
  }

  function activePages() {
    if (!renderSocial) {
      $('body').removeClass('transparent');
      $('html').css('overflow-y', 'hidden');
    }

    if (currentPage === 'bookmark') {
      dumpBookmarks();
    }
    else if (currentPage === 'social') {
      /* loadSocialJS();

      $('body').addClass('transparent');
      $('html').css('overflow-y', 'auto'); */
    }
    else if (currentPage === 'note') {
      loadNoteJS();
    }
    else if (currentPage === 'news') {
      showNews();
    }
  }

  function loadSocialJS() {
    if (renderSocial) {
      loadCSS('./vendor/leaflet.css');
      loadCSS('./public/stylesheets/style.css');
      var js = loadJS('./vendor/leaflet.js', function() {
        loadJS("./public/javascripts/dist/index.js");
        renderSocial = false;
      });
    }
  }

  function loadNoteJS() {
    if (renderNote) {
      var js = loadJS("./vendor/simplemde.min.js", function() {
        loadJS("./note.js");
        renderNote = false;
      });
    }
  }

  function loadJS(src, cb) {
    var e = document.createElement("script");
    e.type = "application/javascript";
    e.src = src;
    if (cb) {
      e.onload = cb;
    }
    document.body.appendChild(e);
  }

  function loadCSS(src, cb) {
    var e = document.createElement("link");
    e.setAttribute("type", "text/css");
    e.setAttribute("rel", "stylesheet");
    e.href = src;
    if (cb) {
      e.onload = cb;
    }
    document.getElementsByTagName("head")[0].appendChild(e);
  }

  function showNews() {
    if (!window.news.isInit) {
      $.ajaxSetup({
        timeout: 3500
      });
      $("#news-block .content").html($("<div>", {
        title: "載入中...",
        "class": "loading"
      }));

      window.news.init();
      for (var key in newsUpdateManger) {
        var news = newsUpdateManger[key];
        fetchRSS(news.path, news.fn, news);
      }
    }
  }

  function onClickLocationOption() {
    customRegion = $(this).text();
    position = {
      lat: locationData[customRegion][1],
      lng: locationData[customRegion][0],
      updateAt: +new Date()
    };

    $('.location-list').html($('<div>', {class: "user-location"})
      .append($('<span>').text(customRegion))
      .append($('<i>', {class: 'remove-loc glyphicon glyphicon-remove'})));

    $('#search-location').val('');

    clearCurrentView();
    contentRouter(true);
    saveBatchToLocalStorage({
      'instants-user-location-list': customRegion,
      'instants-isLocationManual': true,
      'instants-location': position
    }, 'sync');

    onClearUserLocation();
  }

  function onClearUserLocation() {
    $('.remove-loc').click(function() {
      renderAfterLocationUpdate = true;
      $('.location-list').html($('<div>', {class:"user-location"})
          .text('更改您目前的關注區域'));

      clearCurrentView();

      if (!newPosition || newPosition.lat === position.lat) {
        isLocationManual = false;
        detectAndUpdateLocation();
      }
      else {
        position = newPosition;
        contentRouter(true);
      }

      saveBatchToLocalStorage({
        'instants-user-location-list': '',
        'instants-isLocationManual': false,
        'instants-location': ''
      }, 'sync');
    });
  }

  function loadLocationData(cb) {
    var path = './js/geo.json';
    $.getJSON(path, function(data) {
      if (data) {
        cb(data);
      }
    })
    .fail(function(response) {
      console.log(response);
    });
  }

  function queryLocation(query, init) {
    var find = false;
    locationList.forEach(function(key) {
      if (key.indexOf(query) !== -1 || init) {
        find = true;
        $('.search-result').append($('<div>', {class: "loc-option"})
        .append($('<span>').text(key))
        .append($('<i>', {class:"glyphicon glyphicon-plus"})));
      }
    });
    $('.loc-option').click(onClickLocationOption);
    return find;
  }

  function switchContent(currentKey, replaceKey) {
  }

  function throwError(text) {
    setTimeout(function() {
      $(".error").html($("<a>", {
          href: "",
          "class": "btn btn-warning"
      }).append($("<span>").text(text)).append($("<i>", {
          "class": "refresh glyphicon glyphicon-refresh"
      })));
    }, 5000);
  }


  function initEvents() {
   // delay
    setTimeout(function() {

      $('#refresh').click(function() {
        _gaq.push(['_trackEvent', 'refresh', 'clicked']);
        clearCurrentView();
        contentRouter(true);
      });

      // hande left sidebar menu  mouseover event
      $('.s-btn').mouseover(sidebarSwitch);

      $('.s-apps').click(function() {
        var url = 'chrome://apps/';
        _gaq.push(['_trackEvent', 'app', 'clicked']);
        chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
          chrome.tabs.update(tab.id, {url: url});
        });
      });

      $('#option').click(function() {
        _gaq.push(['_trackEvent', 'option', 'clicked']);
        chrome.tabs.create({'url': "/options/options.html" } );
      });

      // custom location setting
      $('#location-setting').click(function() {
        mixpanel.track("Location setting click");
        _gaq.push(['_trackEvent', 'location-setting', 'click']);
        $('.loc-setting-panel').toggle();
        $('#brightness-wrapper').hide();

        if (customRegion) {
          $('.location-list').html($('<div>', {class: "user-location"})
            .append($('<span>').text(customRegion))
            .append($('<i>', {class: 'remove-loc glyphicon glyphicon-remove'})));
          onClearUserLocation();
        }
        else {
          $('.location-list').html($('<div>', {class:"user-location"})
            .text('更改您目前關注區域'));
        }
        $('.search-result').empty();
        queryLocation('', true);
      });

      // bind search
      $('#search-location').bind('input', function() {
        var query = $('#search-location').val();
        $('.search-result').empty();

        if (!queryLocation(query)) {
          $('.search-result').append($('<div>', {class: 'loc-option'})
                              .text('抱歉，搜尋不到符合區域名稱'));
        }
      });

      // hide
      $(document).click(function(e) {
        var target = $(e.target);
        var targets = [
          { triggerElement: '.more-icon', affectElement: '.more-list' },
          { triggerElement: '.glyphicon-map-marker', affectElement: '.loc-setting-panel' },
          { triggerElement: '.glyphicon-adjust', affectElement: '#brightness-wrapper' }
        ];

        targets.forEach(function(t) {
          if (!target.is(t.affectElement) && !target.is(t.triggerElement) &&
             !target.parents().is(t.affectElement)) {
            $(t.affectElement).hide();
          }
        });
      });

      $('.scrollable').scroll(function() {
        $(this).addClass('scroll');

      }).scrollStopped(function() {
        $(this).removeClass('scroll');
      });

      loadLocationData(function(data) {
        locationData = data;
      });

      var display = true;
      var mouseMove = false;
      var menuStatus = $('#menu-status');
      document.onmousemove = function() {
        if (!display) {
          $('.left-sidebar, .menu-control, .author-wrapper').fadeIn();
          if (menuStatus.hasClass('open')) {
            $('.right-sidebar').fadeIn();
          }

          display = true;
        }
        else {
          mouseMove = true;
        }
      };

      setInterval(function() {
        if (!mouseMove && display) {
          $('.left-sidebar, .menu-control, .author-wrapper').hide();
          if (menuStatus.hasClass('open')) {
            $('.right-sidebar').hide();
          }

          display = false;
        }
        else {
          mouseMove = false;
        }
      }, 30000);

    }, 500);
  }

})(window, chrome);
