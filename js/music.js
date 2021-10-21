(function(window) {
  window.showMusic = showMusic;

  function showMusic (data) {
    $('#local-arts').empty();
    data.forEach(function(item) {
      $('#arts-col .col-title').text('最新流行音樂');

      $('#local-arts').append($('<div>', { class: 'music' })
        .append($('<a>', { href: item.video, target: '_blank', class: 'music-img-wrapper' }).click(function() {
            mixpanel.track("music click");
          })
          .append($('<span>', { class: 'glyphicon glyphicon-play play-music' }))
          .append($('<img>', { src: item.img, title: item.title })))
        .append($('<a>', { href: item.video, class: 'music-title', target: '_blank' }).text(item.title)));

    });
  }

})(window);
