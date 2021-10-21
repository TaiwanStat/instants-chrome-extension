(function() {

  var colors = ["rgb(33, 186, 69)", "#FFC107", "#F44336"]; // Green, Yellow, Red;
  window.power = power;

  function power(_data) {
    var regionData = _data.regionData;

    $('.power-title').text('全台即時電力資訊');

    $('#power').append('<svg id="battery">')
      .append($('<i>', { class: 'info glyphicon glyphicon-question-sign' }))
        .append($('<div>', { class: 'info-content'})
        .append($('<h5>', {class: 'disc'}).text('數字僅為供電能力指標參考，非實際用電比例')))
      .append($('<h5>')
        .append($('<span>').text('備轉容量率：'))
        .append($('<span>', {class: 'load-rate'})))
      .append($('<h5>', {class: 'state-note'}));

    loadReserveData(_data, _data.reserveData);
  }

  function loadReserveData (data, loadReserve) {
      var powerLoadData = [loadReserve.reserveLoad, loadReserve.reserveSupply,
        loadReserve.updateTime];
      var reserveSupply = powerLoadData[1];
      var reserveLoad = powerLoadData[0];
      var reserveLoadRate = ((reserveSupply-reserveLoad)/reserveLoad)*100;
      reserveLoadRate = reserveLoadRate.toFixed(2);
      $('.load-rate').text(reserveLoadRate + ' %');
      var percentage = (reserveLoadRate/15).toFixed(2);

      if (reserveLoadRate >= 10) {
        $('.state-note').text('供電充裕');
        visualBattery('#battery', percentage, colors[0]);
      }
      else if (reserveLoadRate > 6 && reserveLoadRate < 10) {
        $('.state-note').text('供電吃緊');
        visualBattery('#battery', percentage, colors[1]);
        //$('.state-note').addClass('red');
      }
      else if (reserveLoadRate <= 6) {
        $('.state-note').text('供電警戒，系統限電機率增加');
        $('.state-note').addClass('red');
        visualBattery('#battery', percentage, colors[2]);
      }
  }


  function visualBattery (id, percentage, color) {
    if (percentage > 1) {
      percentage = 1;
    }
    var container = d3.select(id);

    // container
    container
        .append("rect")
        .attr("width", 150)
        .attr("height", 80)
        .attr("stroke", "rgb(255, 255, 255)")
        .attr("stroke-width", "2px")
        .attr("x", 5)
        .attr("y", 5)
        .attr("rx", 10)
        .attr("ry", 10)
        .style("fill", "transparent");

     // content
    container
        .append("rect")
        .attr("width", 130*percentage)
        .attr("height", 65)
        .attr("x", 15)
        .attr("y", 12)
        .attr("rx", 5)
        .attr("ry", 5)
        .style("fill", color);

    container
        .append("rect")
        .attr("width", 12)
        .attr("height", 23)
        .attr("x", 160)
        .attr("y", 30)
        .attr("rx", 2)
        .attr("ry", 1)
        .style("fill", 'rgb(255, 255, 255)');

    container
        .append("svg:text")
        .attr("width", 8)
        .attr("height", 20)
        .attr("x", 68)
        .attr("y", 50)
        .attr("rx", 2)
        .attr("ry", 1)
        .text(Math.round(percentage*100) + '%')
        .style("fill", 'rgb(255, 255, 255)')
        .style("font-size", '16px');

  }


})();
