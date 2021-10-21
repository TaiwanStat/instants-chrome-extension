(function() {

  window.water = water;

  function water (data) {
    data = [data];
    var configs = {};
    data.forEach(function(reservoir) {
       var reservoirName = reservoir.name;
       var percentage = parseFloat(reservoir.percentage).toFixed(1);
       var updateAt = reservoir.updateAt;
       var volumn = reservoir.volumn;
       var netFlow = -parseFloat(reservoir.daliyNetflow).toFixed(1);
       var netPercentageVar;
       var state;

       if (isNaN(percentage)) {
         return;
       }

       configs[reservoirName] = liquidFillGaugeDefaultSettings();
       configs[reservoirName].waveAnimate = true;
       configs[reservoirName].waveAnimateTime = setAnimateTime(percentage);
       configs[reservoirName].waveOffset = 0.3;
       configs[reservoirName].waveHeight = 0.05;
       configs[reservoirName].waveCount = setWavaCount(percentage);
       setColor(configs[reservoirName], percentage);
      
       // create svg
       $('#water').append($('<div>',{ class: "reservoir" })
              .append('<svg id="reservoir" width="300px"></svg>')
              .append($('<div>', {class: 'state'})
                .append($('<i>'))
                .append($('<h5>', { class: 'net-flow' }))));

      $('.water-title').text(reservoirName+ ' 即時水情');
       // draw
       loadLiquidFillGauge('reservoir', percentage, configs[reservoirName]);

       // set text
       netPercentageVar = Math.abs((netFlow) / parseFloat(reservoir.baseAvailable)*100).toFixed(2);
       if (isNaN(netFlow)) {
          $('.reservoir i').text('昨日水量狀態：待更新');
       }
       else if (netFlow < 0) {
         $('.reservoir i').addClass('glyphicon glyphicon-arrow-down');
         $('.net-flow').text('水量下降 ' + netPercentageVar + ' %');
       }
       else {
         $('.reservoir i').addClass('glyphicon glyphicon-arrow-up');
         $('.net-flow').text('水量上升 ' + netPercentageVar + ' %');
       }
    });
  }

  function setColor(config, percentage) {
    config.waveTextColor = "#fff";
    config.textColor = '#fff';
    if (percentage < 25) {
      config.circleColor = "#F44336";
      config.waveColor = "#F44336";
    }
    else if (percentage < 50) {
      config.circleColor = "rgb(255, 160, 119)";
      config.waveColor = "rgba(245, 151, 111, 0.9)";
    }
  }

  function setWavaCount(percentage) {
    if (percentage > 75) {
      return 3;
    }
    else if (percentage > 50) {
      return 2;
    }
    return 1;
  }

  function setAnimateTime(percentage) {
    if (percentage > 75) {
      return 2000;
    }
    else if (percentage > 50) {
      return 3000;
    }
    else if (percentage > 25) {
      return 4000;
    }
    return 5000;
  }

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

})();
