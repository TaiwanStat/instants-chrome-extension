var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-71076686-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

(function(window, chrome) {

  var storagePrfix = 'instants-';
  var location = {};
  var prevWater = '';
  var prevAir = '';
  var prevUV = '';
  var prevWeather = '';
  var prevRain = '';
  var rainSite = 'auto';
  var prevArts = '';
  var prevAirForecast = '';
  var prevWeatherForecast = '';
  var host = 'http://api.instants.xyz/';
  //host = 'http://localhost:8000/';

  initRain();
  var rains, townships;
  function initRain() {
    d3.json('rain_site.json', function(data) {
      rains = data;
    });
  }

  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('bg-image').addEventListener('change', handleFileSelect, false);


  // Saves options to chrome.storage
  function save_options(refresh) {
    var waterSite = document.getElementById('water').value;
    var weatherSite = document.getElementById('weather').value;
    var airSite = document.getElementById('air').value;
    var uvSite = document.getElementById('uv').value;
    var artsSite = document.getElementById('arts').value;
    var weatherForecastSite = document.getElementById('weather-forecast').value;
    var airForecastSite = document.getElementById('air-forecast').value;

    var showTime = document.getElementById('show-time').checked;
    var showSearch = document.getElementById('show-search').checked;
    var showSearchPage = document.getElementById('show-search-page').checked;
    var showArtsPage = document.getElementById('show-arts-page').checked;
    var showAppsPage = document.getElementById('show-apps-page').checked;
    var showBookmarkPage = document.getElementById('show-bookmark-page').checked;
    var showForecastPage = document.getElementById('show-forecast-page').checked;
    var showNewsPage = document.getElementById('show-news-page').checked;
    //var showSocialPage = document.getElementById('show-social-page').checked;
    var showNotePage = document.getElementById('show-note-page').checked;

    var showPages = {
      arts: showArtsPage,
      search: showSearchPage,
      apps: showAppsPage,
      bookmark: showBookmarkPage,
      forecast: showForecastPage,
      news: showNewsPage,
      //social: showSocialPage,
      note: showNotePage
    };

    var initPage = $('input[name=initpage]:checked').val();

    var timeFormat = document.getElementById('time-format').value;
    var blur = document.getElementById('blur').value;
    var filter = document.getElementById('filter').value;
    var brightness = document.getElementById('brightness').value;
    document.getElementById('brightness-value').innerHTML = brightness;

    chrome.storage.sync.set({
      'instants-waterSelect': waterSite,
      'instants-weatherSelect': weatherSite,
      'instants-weather-forecastSelect': weatherForecastSite,
      'instants-air-forecastSelect': airForecastSite,
      'instants-airSelect': airSite,
      'instants-uvSelect': uvSite,
      'instants-rainSelect': rainSite,
      'instants-showTime': showTime,
      'instants-showSearch': showSearch,
      'instants-timeFormat': timeFormat,
      "instants-blur": blur,
      "instants-bg-brightness": brightness,
      'instants-bg-filter': filter,
      'instants-artsSelect': artsSite,
      'instants-showPages': showPages,
      'instants-initPage': initPage
    }, function() {
      var updateTypes = {};
      updateTypes.waterSelect = waterSite;
      updateTypes.airSelect = airSite;
      updateTypes.weatherSelect = weatherSite;
      updateTypes.uvSelect = uvSite;
      updateTypes.rainSelect = rainSite;
      updateTypes.artsSelect = artsSite;
      updateTypes.weatherForecastSelect = weatherForecastSite;
      updateTypes.airForecastSelect = airForecastSite;
      updateTypes.refresh = refresh;

      renderLocal('location', updateData, updateTypes, 'sync');

      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.style.display = 'block';
      setTimeout(function() {
        status.style.display = 'none';
      },1750);
    });
  }

  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    var defaultPages = {
      arts: true,
      search: true,
      apps: true,
      bookmark: true,
      forecast: true,
      news: true,
      social: true,
      note: true
    };
    var defaultLocation = {};

    chrome.storage.sync.get({
      'instants-waterSelect': 'auto',
      'instants-airSelect': 'auto',
      'instants-weatherSelect': 'auto',
      'instants-uvSelect': 'auto',
      'instants-rainSelect': 'auto',
      'instants-showTime': true,
      'instants-timeFormat': '24',
      "instants-blur": "0",
      "instants-bg-brightness": 90,
      'instants-showSearch': false,
      'instants-bg-filter': false,
      'instants-artsSelect': 'auto',
      'instants-initPage': 'default',
      'instants-showPages': defaultPages,
      'instants-location': defaultLocation,
      'instants-weather-forecastSelect': 'auto',
      'instants-air-forecastSelect': 'auto'
    }, function(items) {
      prevWater = items['instants-waterSelect'];
      prevAir = items['instants-airSelect'];
      prevWeather = items['instants-weatherSelect'];
      prevUV = items['instants-uvSelect'];
      prevRain = items['instants-rainSelect'];
      prevArts = items['instants-artsSelect'];
      prevWeatherForecast = items['instants-weather-forecastSelect'];
      prevAirForecast = items['instants-air-ForecastSelect'];

      document.getElementById('water').value = items['instants-waterSelect'];
      document.getElementById('weather').value = items['instants-weatherSelect'];
      document.getElementById('air').value = items['instants-airSelect'];
      document.getElementById('uv').value = items['instants-uvSelect'];
      document.getElementById('arts').value = items['instants-artsSelect'];

      document.getElementById('weather-forecast').value = items['instants-weather-forecastSelect'];
      document.getElementById('air-forecast').value = items['instants-air-forecastSelect'];

      document.getElementById('blur').value = items['instants-blur'];
      document.getElementById('show-time').checked = items['instants-showTime'];
      document.getElementById('show-search').checked = items['instants-showSearch'];
      document.getElementById('show-search-page').checked = items['instants-showPages'].search;
      document.getElementById('show-arts-page').checked = items['instants-showPages'].arts;
      document.getElementById('show-apps-page').checked = items['instants-showPages'].apps;
      document.getElementById('show-forecast-page').checked = items['instants-showPages'].forecast;
      document.getElementById('show-bookmark-page').checked = items['instants-showPages'].bookmark;
      document.getElementById('show-news-page').checked = items['instants-showPages'].news;
      //document.getElementById('show-social-page').checked = items['instants-showPages'].social;
      document.getElementById('show-note-page').checked = items['instants-showPages'].note;
      document.getElementById('time-format').checked = items['instants-timeFormat'];
      document.getElementById('filter').value = items['instants-bg-filter'];
      document.getElementById('brightness').value = items['instants-bg-brightness'];
      document.getElementById('brightness-value').innerHTML = items['instants-bg-brightness'];
      //document.getElementById('current-location').innerHTML = items['instants-location'].lng.toFixed(5) + ', ' +
        //items['instants-location'].lat.toFixed(5);

      $('input[name="initpage"][value="' + items['instants-initPage'] + '"]').attr('checked', 'checked');
       

      if (items['instants-rainSelect'] !== 'auto') {
        document.getElementById('rain-county').value = 'custom';
        document.getElementById('rain-status').innerHTML = '（已選定測站）';
      }
      
      renderLocal('bg-image', function(url) {
        if (url) {
          showUploadImg(url);
          updateFileImgText(url);
        }
        else {
          document.getElementById('bg-image-status').innerHTML = '未選擇任何檔案';
        }
      });
    });
  }

  function updateData(loc, data) {
    location = loc;

    var waterSelect = data.waterSelect;
    var airSelect = data.airSelect;
    var weatherSelect = data.weatherSelect;
    var uvSelect = data.uvSelect;
    var rainSelect = data.rainSelect;
    var artsSelect = data.artsSelect;
    var refresh = data.refresh;
    var weatherForecastSelect = data.weatherForecastSelect;
    var airForecastSelect = data.airForecastSelect;
    if (needUpdate(waterSelect, prevWater, refresh)) {
      req('water', host+'water/read/?select='+waterSelect);
      prevWater = waterSelect;
    }
    if (needUpdate(airSelect, prevAir, refresh)) {
      req('air', host+'air/read/?select='+airSelect);
      prevAir = airSelect;
    }
    if (needUpdate(weatherSelect, prevWeather, refresh)) {
      req('weather', host+'weather/read/?select='+weatherSelect);
      prevWeather = weatherSelect;
    }
    if (needUpdate(uvSelect, prevUV, refresh)) {
      req('uv', host+'uv/read/?select='+uvSelect);
      prevUV = uvSelect;
    }
    if (needUpdate(rainSelect, prevRain, refresh)) {
      req('rain', host+'rain/read/?select='+rainSelect);
      prevRain = rainSelect;
    }
    if (needUpdate(artsSelect, prevArts, refresh)) {
      req('art', host+'art/read/?select='+artsSelect);
      req('movie', host+'movie/read/?select='+artsSelect);
      prevArts = artsSelect;
    }
    
    if (needUpdate(weatherForecastSelect, prevWeatherForecast, refresh)) {
      req('weather-forecast', host+'weather/read/forecast?select='+weatherForecastSelect);
      prevWeatherForecast = weatherForecastSelect;
    }
    if (needUpdate(airForecastSelect, prevAirForecast, refresh)) {
      req('air-forecast', host+'air/read/forecast?select='+airForecastSelect);
      prevAirForecast = airForecastSelect;
    }

  }

  function needUpdate(select, prev, refresh) {
    return (refresh && (!prev || prev === 'auto' || select === 'auto')) || (select && select !== prev);
  }

  function req(key, url, cb) {
    d3.json(url+'&lat='+location.lat+'&lng='+location.lng, function(data) {
      if (data) {
        saveToStorage(key, data);
      }
    });
  }

  function saveToStorage(key, value, type) {
    if (!type)
      type = 'local';
    var data = {};
    data[storagePrfix+key] = value;
    chrome.storage[type].set(data, function() {
     if (chrome.runtime.error) 
       console.log("Runtime error.");
   });
  }

  function renderLocal(key, cb, opts, from) {
    if (!from)
      from = 'local';

    chrome.storage[from].get(storagePrfix+key, function (result) {
      if (result) {
        cb(result[storagePrfix+key], opts);
      }
    });
  }

  function onChangeRainTownship() {
    if (this.value !== 'default') {
      var sites = townships[this.value];
      rainSite = sites[0];
    }
    else {
      rainSite = 'auto';
    }
    save_options();
  }
 

   // update current locaiton
  function updateLocation(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var newLocation = {
      lat: lat,
      lng: lng
    };
    // save new location
    saveToStorage('location', newLocation, 'sync');
    saveToStorage('isLocationManual', false, 'sync');

    document.getElementById('current-location').innerHTML = newLocation.lng.toFixed(5) + ', ' +
      newLocation.lat.toFixed(5);
    if (!location || newLocation.lat !== location.lat)
      save_options(true);
  }

  function handleFileSelect(evt) {
    _gaq.push(['_trackEvent', 'setting', 'custom-background-image']);
    var files = evt.target.files; // FileList object
    $('output').empty();

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          var url = e.target.result;
          // Render thumbnail.
          showUploadImg(url);
          updateFileImgText(url);
          saveToStorage('bg-image', url);
        };
      })(f);
      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  function showUploadImg(url) {
    var span = document.createElement('span');
    span.innerHTML = ['<img class="thumb" src="', url, '"/>'].join('');
    document.getElementById('list').insertBefore(span, null);
  }

  function updateFileImgText(url) {
    document.getElementById('bg-example').src = url;
    document.getElementById('bg-image-status').innerHTML = '已自訂背景圖片' +
        '（<a href="#" id="remove-bg-image">移除</a>）';

    $('#remove-bg-image').click(function() {
      saveToStorage('bg-image', null);
      document.getElementById('bg-image-status').innerHTML = '未選擇任何檔案';
      $('output').empty();
    });
  }


  $('#filter').change(function() {
    $('.filter-example figure').removeClass();
    $('.filter-example figure').addClass(this.value);
  });

  $('#reset-location').click(function() {
    navigator.geolocation.getCurrentPosition(updateLocation);
  });

  $('input').change(function() {
    _gaq.push(['_trackEvent', 'setting', 'change', this.id, this.value]);
    save_options();
  });

  $('select').on('change', function() {
    // deal with rain 
    if (this.id === 'rain-county'){
      if (this.value === 'auto') {
        rainSite = 'auto';
        save_options();
      }

      townships = rains[this.value];
      $('#rain-township').remove();
      $('#rain-block').append('<select id="rain-township" class="form-control">' +
                              '<option value="default">選擇鄉鎮區</option></select>');
      for (var township in townships) {
        $('#rain-township').append('<option value="' +  township +  '">' + township + '</option>');
      }
      $('#rain-township').change(onChangeRainTownship);
    }
    else if (this.id !== 'rain-township'){
      save_options();
    }
  });

  window.mapClickCallback = function(c, d) {
    var name = d.properties.name;
    var center = this.geo.centroid(d);
    var invert = this.proj.invert(center);

    if (invert) {
      var newLocation = {
        lat: invert[1],
        lng: invert[0]
      };
      saveToStorage('location', newLocation, 'sync');
      saveToStorage('isLocationManual', newLocation, 'sync');
      document.getElementById('current-location').innerHTML = newLocation.lng.toFixed(5) + ', ' +
        newLocation.lat.toFixed(5);

      if (!location || location.lat !== newLocation.lat)
        save_options(true);
  }

    this.setState({
      select: name,
      center: invert
    });
  };



})(window, chrome);
