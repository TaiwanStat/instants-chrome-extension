(function(window) {

  window.dumpBookmarks = dumpBookmarks;
  var storagePrfix = 'instants-';
  var depth = 0;
  var sortable;
  var bookmarkColor = {};
  var isBookmarkDumped = false;

  getLocalStorage('bookmark-color', function(data) {
    bookmarkColor = data ? data : {};
  }, {}, 'local');

  var bookmarkNumber = 0;
  var colorThief;
  var color = d3.scale.category20();
  var sortableOpt = {
    animation: 350,
    dataIdAttr: 'data-id',
    forceFallback: true,
    scrollSpeed: 10,
    delay: 100,
    fallbackTolerance: 80,
    onStart: function(e) {
      $(e.item).addClass('moveable');
    },
    onMove: function(e) {
    },
    onEnd: function(e) {
      var item = $(e.item);
      var id = item.attr('data-id');
      item.removeClass('moveable');

      var dist = e.newIndex;

      if (dist === undefined) {
        return;
      }

      if (dist > e.oldIndex) {
        dist += 1;
      }

      chrome.bookmarks.move(id, {
        index: dist
      });
    }
  };

  // Search the bookmarks when entering the search keyword.
  $(function() {
    $('#bookmark-search').bind('input', function() {
       isBookmarkDumped = false;
       $('#bookmark-content').empty();
       dumpBookmarks($('#bookmark-search').val().toLowerCase());
    });
  });

  // Traverse the bookmark tree, and print the folder and nodes.
  function dumpBookmarks(query) {
    if (!query && isBookmarkDumped) {
      return;
    }
    else
      isBookmarkDumped = true;

    depth = 0;
    $('#bookmark-content')
      .append($('<div>', {class: 'glyphicon glyphicon-chevron-left return'}))
      .append($('<ul>', { id: 'bookmark-list', class: 'bookmark-list' } ));

    $('.bookmark-list').scroll(function() {
      $(this).addClass('scroll');

    }).scrollStopped(function() {
      $(this).removeClass('scroll');
    });

    var bookmarkTreeNodes = chrome.bookmarks.getTree(
      function(bookmarkTreeNodes) {
        dumpTreeNodes(bookmarkTreeNodes, query);

        var el = document.getElementById('bookmark-list');
        $('.folder').click(onFolderClick);
        sortable = new Sortable(el, sortableOpt);
      });
  }

  function dumpTreeNodes(bookmarkNodes, query) {
    var bookmarkList = $('#bookmark-list');

    var count = 0;
    bookmarkNodes.forEach(function(node) {
      bookmarkList.append(dumpNode(node, query));
    });
  }

  function dumpNode(bookmarkNode, query) {

    var title = bookmarkNode.title ? bookmarkNode.title : '';
    var titleDiv = $('<div>', { class: 'bookmark-title' }).text(title);
    var url = bookmarkNode.url;
    var id =  bookmarkNode.id;
    var li = $('<li>', { id: 'bookmark-'+id, "data-id": bookmarkNode.id });
    var span = $('<span>', { class: "item" });
    var src = 'chrome://favicon/' + url;

    if (query && !bookmarkNode.children) {
      if (String(title.toLowerCase()).indexOf(query) == -1) {
        return span;
      }
    }

    if (url) {
      var anchor = $('<a>').attr('href', url)
        .prepend($('<img>', { title: title }).attr('src', src));
      span.append(anchor);
    }
    else {
      li.attr('class', 'folder');
    }

    if (bookmarkColor.hasOwnProperty(url)) {
      li.css('background-color', bookmarkColor[url]);
    }
    else {
      var img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = src;
      img.onload = function() {
        $(this).remove();
        var color = getColor(url, depth, img);
        li.css('background-color', color);
        try {
          $('#'+id).attr('background-color', color);
        }
        catch(e) {}
        bookmarkColor[url] = color;
        window.saveToLocalStorage('bookmark-color', bookmarkColor, 'local');
      };
    }

    depth += 1;
    if (depth > 2 && bookmarkNode.children) {
      var nodes = bookmarkNode.children;
      var len = nodes.length > 4 ? 4 : nodes.length;

      for (var j = 0; j < len; ++j) { 
        if (nodes[j].url)
          span.append('<img src="chrome://favicon/' + nodes[j].url + '" />');
      }
    }
    else if (bookmarkNode.children && bookmarkNode.children.length > 0) {
      return dumpTreeNodes(bookmarkNode.children, query);
    }

    li.append(span).append(titleDiv);
    return li;
  }


  function getColor(url, depth, img) {
    if (!url)
      return 'rgba(255, 255, 255, 0.6)';
    var bg_color;
    if (url === 'https://www.youtube.com/') {
      bg_color = '#CC181E';
    }
    else if (url === 'https://www.facebook.com/') {
      bg_color = '#405E9B';
    }
    else if (url === 'https://tw.yahoo.com/') {
      bg_color = '#2D1152';
    }
    else if (url === 'https://trello.com/') {
      return '#026aa7';
    }
    else if (url === 'https://twitter.com/') {
      return '#53AAEB';
    }
    else if (url === 'https://www.instagram.com/') {
      return 'rgb(221, 210, 197)';
    }
    else if (url.indexOf('pixnet.net') > 0) {
      return '#3565da';
    }
    else if (url.indexOf('docs.google.com') > 0) {
      return 'rgb(40, 167, 105)';
    }
    else if (url === 'http://udn.com/news/index') {
      return '#ED7D19;';
    }
    else if (url === 'https://news.ycombinator.com/news') {
      return 'rgb(255, 99, 1)';
    }
    else if (url === 'http://www.cw.com.tw/') {
      return '#D60614';
    }
    else if (url.indexOf('eyny.com') > 0) {
      return '#F60';
    }
    else {
      try {
        if (!colorThief) {
          colorThief = new ColorThief();
        }
        return colorThief.getColor(img);
      }
      catch(e) {
        bg_color = color(depth);
      }
    }
    return bg_color;
  }

  function onFolderClick() {
    $('.return').click(function() {
       $('#bookmark-content').empty();
       $(this).hide();
       isBookmarkDumped = false;
       dumpBookmarks();
    });

    var folderID = $(this).attr('data-id');
    chrome.bookmarks.getChildren(folderID, function(nodes) {
      $('#bookmark-list').empty();
      $('.return').show();
      dumpTreeNodes(nodes);
      $('.folder').click(onFolderClick);
    });
  }

})(window);
