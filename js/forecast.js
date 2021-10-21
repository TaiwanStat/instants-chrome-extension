(function(window) {

  window.airForecast = airForecast;
  window.weatherForecast = weatherForecast;
  window.alertForecast = alertForecast;

  function airForecast(data) {
    var areaName = data.AreaName + '地區';
    var FPMI = data.FPMI.replace(' ', '').split('-');
    var max_pm25 = parseInt(FPMI[1]);
    var min_pm25 = parseInt(FPMI[0]);
    var avg = (min_pm25 + max_pm25) / 2;
    var info = '';
    var forecastDate = new Date(data.ForecastDate);
    var now = new Date();

    $('#air-forecast').append($('<div>', { class: "site_name"})
                      .append($('<h4>').text(areaName)))
                      .append($('<div>', { class: 'status'}))
                      .append($('<span>', { class: 'pm25' }).append($('<h4>')));

    if (avg <= 3) {
      $('#air-forecast .status').attr('class', 'ui green tag label status').text('良好');
      info = '可以正常戶外活動';
    }
    else if (avg <= 6) {
      $('#air-forecast .status').attr('class', 'ui orange tag label status').text('稍差');
      info = '一般人可正常戶外活動。心血管疾病的成人與孩童若有徵狀時應考慮減少戶外活動';
    }
    else if (avg <= 9) {
      $('#air-forecast .status').attr('class', 'ui red tag label status').text('不良');
      info = '任何人如果有不適，應該考慮減少戶外活動。心血管疾病的成人與孩童與年長者考慮減少體力消耗。';
    }
    else if (avg >= 9) {
      $('#air-forecast .status').attr('class', 'ui purple tag label status').text('有害');
      info = '任何人如果有不適，應減少體力消耗，特別是減少戶外活動。' +
        '心血管疾病的成人與孩童與年長者應減少體力消耗。具有氣喘的人可能需增加使用吸入劑頻率。';
    }

    if (isNaN(avg) || data.min_pm25 === -1) {
      $('#air-forecast .pm25')
        .children('h4')
        .text(" PM2.5指標：待更新");
      $('#' + data.site_id + ' .status').attr('class', 'ui tag label status').text('暫無預報資料');
    }
    else {
      if (forecastDate.toDateString() === now.toDateString()) {
        $('.air-forecast-title a').text('今天空氣品質預報');
      }
      else if (forecastDate > now && diffDays(now ,forecastDate) < 1){
        $('.air-forecast-title a').text('明天空氣品質預報');
      }
      else {
        $('.air-forecast-title a').text('空氣品質預報');
      }
      
      $('.pm25 h4').text("PM2.5指標：" + data.FPMI)
        .append($('<i>', { class: 'info glyphicon glyphicon-question-sign' }))
        .append($('<div>', { class: 'info-content'} )
                .append($('<h5>').text(info)));
    }
  }

  function weatherForecast(data) {
    var url;
    var title;
    var temp = data.TEMP;
    var weatherStatus = data.pred_status;
    var moment = data.forecast_moment;
    var greeting = '';
    var humd = '';
  
    if (!data.pred_temp) {
      $('#weather-forecast').html('<h4>資料暫時無法取得</h4>');
      return;
    }
    else {

      if (weatherStatus.indexOf('雨') > -1) {
        url = './images/rain.png';
        title = '雨';
      }
      else if (weatherStatus.indexOf('晴') === -1) {
        url = './images/cloudy.png';
        title = '多雲';
      }
      else if (weatherStatus.indexOf('雲') > -1) {

        if (moment.indexOf('白') > 0) {
          url = './images/sun_cloud.png';
        }
        else {
          url = './images/moon_cloud.png';
        }
        title = '晴時多雲';
      }
      else {
        if (moment.indexOf('白') > 0)
          url = './images/sun.png';
        else 
          url = './images/moon.png';
        title = '晴';
      }

      $('#weather-forecast').prepend($('<div>', { class: "img__wrapper" }));
      $('#weather-forecast .img__wrapper').append($('<img>', { 
        class: 'image', 
        title: title,
        src: url,
        alt: '天氣圖示'}
      ));


      data.pred_temp = data.pred_temp.replace('°', '').replace('~', '～'); 
      var tempRange = data.pred_temp.split('～');
      var disc = '';
      if (tempRange) {
        var tempMin = tempRange[0];
        var tempMax = tempRange[1];

        if (tempMin > 30) {
          disc = '炎熱';
        }
        else if (tempMin > 27) {
          disc = '微熱';
        }
        else if (tempMin > 20) {
          disc = '舒適';
        }
        else if (tempMin >= 15) {
          disc = '微冷';
        }
        else if (tempMin >= 10) {
          disc = '冷';
        }
        else if (tempMin < 10) {
          disc = '寒冷';
        }
      }

      var rainIcon = $('<img>', { src: "./images/rain_small.png", 
                       class: "rainy", title: "降雨機率"});

      var city = data.city.substring(0, data.city.length-1);
      var content = $('<div>')
              .append($('<h4>').text(weatherStatus+'・'+disc))
              .append($('<h4>')
                .append($('<span>').text(data.pred_temp))
                .append($('<sup>').text('˚C '))
                .append(rainIcon)
                .append($('<span>').text(' 降雨 '))
                .append($('<span>').text(data.pred_rain)));
      
      $('.weather-forecast-title a').text(data.forecast_moment+' '+city+'天氣預報');
      $('#weather-forecast').append(content);
    }
  }

  function alertForecast(data) {
    if (data.length === 0) {
      $('#alert-title').text('天氣特報與災害警報');
      document.getElementById('alert-forecast').innerHTML =
        '<img class="smile" src="./images/smile.png"/><h4 class="center">目前無任何資訊發布</h4>';
      return;
    }

    var record = {};
    var count = 0;
    data.forEach(function(alert) {
      if (!record.hasOwnProperty(alert.phenomena)) {
        var startTime = alert.startTime.substring(0, 10);
        var endTime = alert.endTime.substring(0, 10);
        $('#alert-forecast').prepend($('<div>', { class: "alert-event"})
                          .append($('<h4>').text('【' + alert.phenomena  + '】'))
                          .append($('<h5>').text('日期：' + startTime + '～' + endTime))
                          .append($('<p>').text(alert.contentText)));
        record[alert.phenomena] = true;
        count += 1;
      }
    });
    $('#alert-title').text('天氣特報與災害警報（' + count + '）');
    //$('#alert-forecast').append($('<img>', { class: 'smile s-bottom', src: "./images/smile.png"}))
     //                         .append($('<h4>', { class: 'center'}).text('所有最新天氣資訊已讀'));
  }

  function diffDays(current, from) {
    var timeDiff = Math.abs(current.getTime() - from.getTime());
    var diff = (timeDiff / (1000 * 60 * 60 * 24));
    return diff;
  }

})(window);
