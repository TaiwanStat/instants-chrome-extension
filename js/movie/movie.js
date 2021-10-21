(function(window) {

  window.movie = movie;
  var siteDiv;

  function movie(data) {
    var height = $('.full-height').height();
    var itemNumber = 3;
    if (height > 860) {
      itemNumber = 4;
    }

    var marginBottom = (height - 60 - 150 * itemNumber) / itemNumber;
    siteDiv = $('<div>', {class: 'movie-site'});
    sites = data.sites;
    sites.forEach(function(site) {
      siteDiv.append($('<h5>')
        .html($('<a>', { target: "_blank", href: site.url, class: 'movie-site-link'})
            .append($('<i>', { class: 'glyphicon glyphicon-time'}))
            .append($('<span>').text(' '+site.name))));
    });


    showThisWeek(data.this_week);
    showRank(data.ranking);
    $('.movie').css('margin-bottom', marginBottom);
    $('.movie-site-link').click(function() {
      mixpanel.track("movie site click");
    });
  }

  function showThisWeek(data) {
    data.forEach(function(item) {
      var title = item.title;
      var img = item.img;
      var date = item.date;
      var intro = item.intro;
      var trailer = item.trailer;
      var arr = intro.split('=');
      var id = arr[arr.length-1];

      var movieImgDiv = $('<div>', {class: 'm-img'})
            .append($('<a>', {target: '_blank', href: intro})
              .append($('<img>', { src: img, title: title })));

      var timeLink = 'https://tw.movies.yahoo.com/movietime_result.html/id=' + id;

      var preview = $('<h5>')
          .html($('<a>', {target: '_blank', href: trailer}).click(function () {
              mixpanel.track("movie this_week_trailer click");
            })
            .append($('<i>', { class: 'glyphicon glyphicon-play-circle movie-icon'}))
            .append($('<span>').text(' 預告片')));

      var movieContentDiv = $('<div>', { class: "movie-text"})
          .append($('<a>', {target: "_blank", href: intro})
            .html($('<h4>', {class: 'movie-title'}).text(title)))
          .append(siteDiv.clone())
          /*.append($('<h5>')
            .html($('<a>', {target: '_blank', href: intro })
            .append($('<i>', { class: 'glyphicon glyphicon-film'}))
            .append($('<span>').text(' 電影介紹'))))*/
          /*.append($('<h5>')
            .html($('<a>', {target: '_blank', href: timeLink })
            .append($('<i>', { class: 'glyphicon glyphicon-time'}))
            .append($('<span>').text(' 時刻表'))))*/
          .append(preview);


      $('#movie-this-week').append($('<div>', {class: 'movie'})
        .append(movieImgDiv)
        .append(movieContentDiv));
    });
  }

  function showRank(data) {
    var movieRankDiv = $('#movie-rank');
    var rank = 1;
    data.forEach(function(item) {
      var title = item.title;
      var intro = item.intro;
      var img = item.poster;
      var youtube = item.youtube;
      var movieImgDiv;
      var arr = intro.split('=');
      var id = arr[arr.length-1];
      var timeLink = 'https://tw.movies.yahoo.com/movietime_result.html/id=' + id;

      if (img) {
        movieImgDiv = $('<div>', {class: 'm-img'})
          .append($('<a>', {target: '_blank', href: intro})
          .append($('<img>', { src: img, title: title })));
      }
      else {
        movieImgDiv = $('<div>', { class: 'no-img'}).html($('<h5>').text('目前無圖示'));
      }

      var preview = $('<h5>')
          .html($('<a>', {target: '_blank', href: 'https://www.youtube.com/watch?v=' + youtube})
            .click(function() {
              mixpanel.track("movie_rank trailer click");
            })
            .append($('<i>', { class: 'glyphicon glyphicon-play-circle movie-icon'}))
            .append($('<span>').text(' 預告片')));

      var movieContentDiv = $('<div>', { class: "movie-text"})
          .append($('<a>', {target: "_blank", href: intro})
            .html($('<h4>', {class: 'movie-title'}).text(rank + ' ' + title)))
          .append(siteDiv.clone())
          /*.append($('<h5>')
            .html($('<a>', {target: '_blank', href: intro })
            .append($('<i>', { class: 'glyphicon glyphicon-film'}))
            .append($('<span>').text(' 電影介紹'))))
          .append($('<h5>')
            .html($('<a>', {target: '_blank', href: timeLink })
            .append($('<i>', { class: 'glyphicon glyphicon-time'}))
            .append($('<span>').text(' 時刻表'))))*/
          .append(preview);


      movieRankDiv.append($('<div>', {class: 'movie rank'})
                    .append(movieImgDiv)
                    .append(movieContentDiv));
      rank += 1;
    });
  }

})(window);
