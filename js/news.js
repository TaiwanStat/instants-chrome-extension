(function(window, chrome) {

  window.news = {
    globalNews: globalNews,
    localNews: localNews,
    techNews: techNews,
    sportNews: sportNews,
    travelNews: travelNews,
    init: init,
    isInit: false
  };
  window.addItems = addItems;

  var globalCount = {},
    total = {
      global: 3,
      local: 4,
      travel: 4,
      tech: 4,
      sport: 4
    },
    count = {},
    newsData = {};

  function init() {
    count = {
      global: 0,
      local: 0,
      travel: 0,
      tech: 0,
      sport: 0
    };

    newsData = {
      global: [],
      local: [],
      travel: [],
      tech: [],
      sport: []
    };
    news.isInit = true;
    globalCount = 0;
  }

  function globalNews(data, source) {
    $('#global-news .loading').remove();
    addItems('#global-news', data, source, null, total.global);
   }

  function localNews(data, source) {
    addItems('#local-news', data, source, null, total.local);
  }

  function techNews(data, source) {
    addItems('#tech-news', data, source, null, total.tech);
  }

  function sportNews(data, source) {
    $('#sport-news .loading').remove();
    addItems('#sport-news', data, source, null, total.sport);
  }

  function travelNews(data, source) {
    addItems('#travel-news', data, source, null, total.travel);
  }

  function addItems(id, data, source, maxVis, totalNewsInCategory) {
    var category = source.category;
    var tag = source.parser;
    var posts = data ? $(data).find(tag) : [];
    var divCount = 0;
    count[category] += 1;

    if (posts.length > 50) {
      posts = posts.slice(0, 50);
    }

    var postsCount = 0;
    posts.each(function () {
      var el = $(this);
      var published,
          limit;

      if (tag === 'entry') {
        published = el.find('published:first').text();
        limit = category === 'global' ? 1 : 5;
      }
      else if (tag === 'item') {
        published = el.find('pubDate:first').text();
        limit = source.name === '背包客棧' ? 14 : 1;
      }
      else {
        return;
      }
      var publishedDate = new Date(published);
      var publishedTime = timeSince(publishedDate, limit);
      if (isNaN(publishedDate) || !publishedTime)
        return;

      var title = el.find("title:first").text().replace('<![CDATA[', '').replace(']]>', '');
      var img = el.find('img:first').attr('src');
      var imgDiv = '';
      var linkElement = el.find('link');
      var link;

      if (source.name === '女人迷') {
        link = linkElement.attr('href');
      }
      else if (source.name === '紐約時報中文網') {
        link = linkElement.text().split(';')[0];
      }
      else if (source.name !== '報導者' && source.name !== 'BBC中文網') {
        link = linkElement.text();
      }
      else {
        link = el.find('guid').text();
      }
      /*if (source.label) {
        title = '［' + source.label + '］' + title;
      }*/

      var postData = {
        title: title,
        link: link,
        date: publishedDate,
        publishedTime: publishedTime,
        source: source.name
      };

      if (totalNewsInCategory > 1 && (category !== 'global' || globalCount >= 3 || !img)) {
        newsData[category].push(postData);

      } else {

        var showImg = false;
        if (category === 'global') {
          showImg = true;
          postData.img = img;
          globalCount += 1;
        }

        if (maxVis && postsCount > maxVis) {
          return;
        }

        $(id).append(createPostDiv(postData, showImg));
      }
      postsCount += 1;
    });

    if (totalNewsInCategory > 1 && count[category] >= totalNewsInCategory) {
      if (newsData[category].length === 0) {
        $(id).append($('<div>', { class: 'center' }).css('margin-top', '30px')
             // .text('此欄暫時無法取得新聞資訊'));
             .html('<i class="fa fa-smile-o" style="font-size: 75px;"></i><div>此欄暫時無法取得新聞資訊</div>'));
      }

      // sort by time
      newsData[category].sort(function(a,b){
        return b.date - a.date;
      });

      var numberOfVisiable = 0;
      var maxVisiable = maxVis || 100;
      newsData[category].forEach(function(d) {
        if (numberOfVisiable > maxVisiable)
          return;
        $(id).append(createPostDiv(d));
        numberOfVisiable += 1;
      });
      newsData[category] = [];
      $(id+' .loading').remove();
    }
  }

  function createPostDiv(d, showImg) {
    var imgDiv = '';
    if (showImg) {
      imgDiv = $('<div>', {class: 'n-img'})
        .append($('<a>', {target: '_blank', href: d.link})
          .append($('<img>', { src: d.img, title: d.title })));
    }

    return $('<div>', { class: 'news'})
      .append(imgDiv)
      .append($('<div>', {class: 'news-content' })
        .append($('<a>', { target: '_blank'}).attr('href', d.link).click(function() {
            mixpanel.track("news click");
          })
          .append($('<h4>', { class: 'news-title' }).text(d.title)))
          .append($('<h5>', { class: 'sub-text' })
            //.append($('<span>', { class: 'news-source'}).text(d.source))
            .append($('<span>', { class: 'news-time'}).text(d.publishedTime))
          ));
  }

  function timeSince(date, limit) {
    var seconds = Math.floor(Math.abs(new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
    interval = Math.floor(seconds / 2592000);
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      if (interval <= limit)
        return interval + ' 天前';
      else
        return false;
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval + " 小時";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return interval + " 分鐘";
    }
    return Math.floor(seconds) + " 秒";
  }

  
})(window, chrome);
