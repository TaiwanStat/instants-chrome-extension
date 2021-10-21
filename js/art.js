(function(window) {

  window.art = art;

  function art(data) {
    if (data && data.length > 0) {
      data.forEach(function(item) {
        var title = item.title;
        var intro = item.sourceWebPromote;
        var category = item.category;
        var artDiv;
        var link = '';
        if (intro) {
          link = 
            $('<h5>').html($('<span>').text('活動連結：')
                  .append($('<a>', { target: "_blank", href: intro })
                  .append($('<i>', { class: 'glyphicon glyphicon-link'}))
                  .append(' 點閱')));
        }
        artDiv = $('<h4>', {class: 'art-title'}).text('[ ' + category + ' ] ' + title);

        $('#local-arts').append($('<div>', { class: 'local-art-item' })
                        .append(artDiv)
                        .append($('<h5>').text('日期：' + item.startDate + '～' + item.endDate))
                        .append($('<h5>').text('地點：' + item.locationName))
                        .append(link));
      });
    }
    else {
      document.getElementById('local-arts').innerHTML = '<h4>您的位置目前暫時無相關活動資訊</h4>';
    }
  }

})(window);
