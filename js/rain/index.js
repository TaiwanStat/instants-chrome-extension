(function(window) {

  window.rain = rain;
  window.rainSite = {};

  function rain(data) {
    window.rainSite = data;

      $('#rain').append(
          $('<div>', { class: "raindrop", id: "rain-site" })
          .append($('<h3>', { class: 'sitename' }).text(data.Township + '測站')
            .append($('<div>', { class: 'day-rain'})
            .append($('<h5>').text('24小時累積'))
            .append($('<h5>').text(data.Rainfall24hr+' 毫米')))))
          .append($('<h5>').text('1小時 '+data.Rainfall1hr+' 毫米'))
          .append($('<h5>').text('10分鐘 '+data.Rainfall10min+' 毫米'));

      if (Math.round(10*data.Rainfall24hr) !== 0) {
        createRainDrop('#rain-site', getOptions(data.Rainfall10min, data.Rainfall24hr));
      }
  }

  function addTick(id) {
    var width = $(id).width();
    var height = $(id).height();
    var svg = d3.select(id)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("position", 'absolute');

    var yScale = d3.scale.linear()
                .range([height, 0])
                .domain([0, 500]);
      //Define Y axis
    var yAxis = d3.svg.axis()
                      .scale(yScale)
                      .orient("left")
                      .tickPadding(0)
                      .ticks(5);
    //Create Y axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(30,0)")
        .call(yAxis); 
  }

  function colorlize(value) {
    //if (value > 0) 
      //return '<span class="red">' + value + '</span>';
    return value;
  }

  function createRainDrop(id, options) {
    options = options || {};
    var raindrop = $(id).raindrops(options);
  }

  function getOptions(rainValue10min, rainValue24hr) {
    var canvasHeight = rainValue24hr*1.5;
    var density = 0.01;
    var rippleSpeed = 0.01;
    var frequency = 0;
    var color = 'rgb(23, 139, 202)';
    var waveHeight = 40;
    var waveLength = 400;

    if (rainValue10min < 1) {
      frequency = 0 * rainValue10min;
    }
    else if (rainValue10min < 5) {
      frequency = 10 * rainValue10min/5; 
    }
    else if (rainValue10min < 10) {
      waveLength = 200;
      frequency = 10*rainValue10min/10;
      waveHeight = 80;
    }
    else if (rainValue10min < 15) {
      waveLength = 200;
      frequency = 10*rainValue10min/15;
      waveHeight = 90;
    }
    else if (rainValue10min < 20) {
      color = '#DB2828';
      waveLength = 200;
      waveHeight = 90;
      frequency = 10*rainValue10min/20;
    }
    else {
      color = '#DB2828';
      frequency = 15;
      waveLength = 180;
      waveHeight = 100;
      $('span').removeClass('red');
    }

    if (canvasHeight > 300) {
      canvasHeight = 300;
    }

    return {
      color: color,
      waveLength: waveLength,
      frequency: frequency,
      waveHeight: waveHeight,
      density: 0.04,
      canvasHeight: canvasHeight
    };

  }

  function renderGlobalNews() {
    var newsItem = newsUpdateManger.central;
    $('.rain-title').text('國際快訊');
    if (newsItem.category === 'local') {
      fetchRSS(newsItem.path, renderLocalNews, newsItem);
    }
  }


})(window);
