(function(window) {

  window.weather = weather;

  function weather(data) {
    var temp = data.TEMP;
    var greeting = '';
    var humd = isNaN(data.HUMD) ? '' : Math.abs((parseFloat(data.HUMD) * 100).toFixed(0));
    var hours = window.hours;
    var weatherStatus = data.pred_status;
    var rainSite = window.rainSite;
    var time = window.time;
    var predTemp = data.pred_temp.replace('~', '～').replace('°', '');

    if (isNaN(temp) || temp < -30) {
      document.getElementById('weather').innerHTML = '<i class="fa fa-meh-o" style="font-size: 75px;">' +
          '</i><h4>抱歉，資料暫時無法取得</h4>';
      return;
    }

    var imgAttrs = getImageAttrs(rainSite, weatherStatus, data);
    var img = $('<img>', imgAttrs);
    $('#weather').prepend($('<div>', { class: "img__wrapper"})
                  .append(img));

    var city = data.CITY.substring(0, data.CITY.length-1);

    var tempText = getTempFeeling(temp);

    var humdIcon = $('<i>', { class: "glyphicon glyphicon-tint",
                     title:"溼度"});

    var rainIcon = $('<img>', { src: "./images/rain_small.png",
                     class: "rainy", title: "降雨機率"});

    // current temperature
    $('#weather')
      .prepend($('<span>', { class: 'temp'}).text(temp)
      .append($('<sup>').text('˚C'))
      .append($('<span>', { class: 'temp-text'} ).text(tempText)));

    // detail
    /*$('#weather')
      .append($('<h4>')
              .text([greeting, city].join('')))*/

    $('#weather')
      .append($('<h4>')
              .append(humdIcon)
              .append($('<span>').text(' 溼度 '+humd+' % '))
              .append(rainIcon)
              .append($('<span>').text(' 降雨 '+data.pred_rain.replace('%', ' %'))));

    if (imgAttrs.src === './images/moon_cloud.png') {
      $('#weather .temp').css('margin-left', '50px');
    }
  }

  function getImageAttrs(rainSite, weatherStatus, data) {
    var url,
      title;

    var predRain = parseFloat(data.pred_rain.replace('%', ''));

    if (rainSite.Rainfall1hr > 0) {
      url = './images/rain.png';
      title = '雨';
    }
    else if (rainSite.Rainfall6hr > 0 || weatherStatus.indexOf('陰') > -1 ||
            (weatherStatus.indexOf('短暫') === -1 && weatherStatus.indexOf('雨') > -1) || 
            (weatherStatus.indexOf('多雲') >= 0 && weatherStatus.indexOf('晴') === -1 && predRain > 0)) {

      url = './images/cloudy.png';
      title = '多雲';
    }
    else if (rainSite.Rainfall24hr > 0 || weatherStatus.indexOf('雲') > -1 || weatherStatus.indexOf('霾') > -1) {
      url = time === '白天' ? './images/sun_cloud.png' : './images/moon_cloud.png';
      title = weatherStatus;
    }
    else {
      url = time === '白天' ? './images/sun.png' : './images/moon.png';
      title = '晴';
    }
    return {
      class: 'image',
      src: url,
      alt: title,
      title: title
    };
  }

  function getTempFeeling(temp) {
    if (temp > 30) {
      return '熱';
    }
    else if (temp > 27) {
      return '微熱';
    }
    else if (temp >= 20) {
      return '舒適';
    }
    else if (temp > 18) {
      return '微冷';
    }
    else if (temp > 10) {
      return '冷';
    }
    else {
      return '寒冷';
    }
  }

})(window);
