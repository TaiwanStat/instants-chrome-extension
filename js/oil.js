(function(window) {

  window.oil = oil;

  function oil(data) {
    var statusClass = '';
    $('#oil-title').html('<a href="http://new.cpc.com.tw/mobile/Home/"></a>');

    if (data.status === '跌') {
      statusClass = 'glyphicon glyphicon-arrow-down';
    }
    else {
      statusClass = 'glyphicon glyphicon-arrow-up';
    }

    var releaseDate = new Date(data.date);
    var diff = diffDays(now, releaseDate);

    if (diff < -0.1) {
      $('#oil-title a').text('下週油價資訊');
    }
    else if (diff < 7) {
      $('#oil-title a').text('本週油價資訊');
    }
    else {
      $('#oil-title a').text('上週油價資訊');
    }

    $('#oil')
      .append($('<h2>', { class: "status"})
        .append($('<i>', { class: statusClass, title: data.status}))
        .append($('<span>', { class: 'status-number' }).text(data.float_price))
      )
      .append($('<div>', { class: "detail" })
        .append($('<h4>', { class: "nineeight"})
          .append($('<span>', { class: "type"}).text('98 無鉛'))
          .append($('<span>', { class: "value" }).text(data.nineeight))
          .append($('<span>', { class: "unit"}).text('元／公升')))
        .append($('<h4>', { class: "ninefive"})
          .append($('<span>', { class: "type"}).text('95 無鉛'))
          .append($('<span>', { class: "value" }).text(data.ninefive))
          .append($('<span>', { class: "unit"}).text('元／公升')))
        .append($('<h4>', { class: "ninetwo"})
          .append($('<span>', { class: "type"}).text('92 無鉛'))
          .append($('<span>', { class: "value" }).text(data.ninetwo))
          .append($('<span>', { class: "unit"}).text('元／公升')))
        .append($('<h4>', { class: "ultra"})
          .append($('<span>', { class: "type"}).text('超柴'))
          .append($('<span>', { class: "value" }).text(data.ultra))
          .append($('<span>', { class: "unit"}).text('元／公升')))
      );
  }


  function diffDays(current, from) {
    var timeDiff = current.getTime() - from.getTime();
    var diff = (timeDiff / (1000 * 60 * 60 * 24));
    return diff;
  }

})(window);
