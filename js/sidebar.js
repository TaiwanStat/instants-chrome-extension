(function(window) {

  var menuDiv = document.getElementById('ul-menu');
  var pages = {
    'life': {
      icon: 'glyphicon glyphicon-flash',
      title: '即時生活'
    },
    'forecast': {
      icon: 'glyphicon glyphicon-bullhorn',
      title: '預報資訊'
    },
    'news': {
      icon: 'glyphicon glyphicon-globe',
      title: '新聞資訊'
    },
    'social': {
      icon: 'fa fa-comment',
      title: '在地交流'
    },
    'arts': {
      icon: 'glyphicon glyphicon-film',
      title: '藝文資訊'
    },
    'search': {
      icon: 'glyphicon glyphicon-search',
      title: '搜尋'
    },
    'bookmark': {
      icon: 'glyphicon glyphicon-star',
      title: '書籤'
    },
    'apps': {
      icon: 'glyphicon glyphicon-th',
      title: '顯示應用程式頁面'
    },
    'note': {
      icon: 'fa fa-pencil-square-o',
      title: '備忘筆記'
    }
  };

  var defaultOrder = ['life', 'forecast', 'arts', 'news', 'social',
  'search', 'note', 'bookmark', 'apps'];
  var currentOrder = [];

  getLocalStorage('menu-order', function(order) {
    if (order) {

      if (order.length === (defaultOrder.length-1)) {
        order.splice(6, 0, 'note');
      }
      else if (order.length !== defaultOrder.length) {
        order = defaultOrder;
      }

      displayMenu(order);
    }
    else {
      displayMenu(defaultOrder);
    }
  });

  function displayMenu(items) {
    currentOrder = items;

    // insert to html
    items.forEach(function(id) {
      var li = document.createElement('li');
      var icon = document.createElement('div');
      var page = pages[id];

      li.id = id;
      li.className = 's-btn ' + 's-' + id + ' tooltips';
      icon.className = page.icon;
      if (page.title === 'apps')
        icon.title = page.title ? page.title : '';

      var toolTip = document.createElement('span');
      toolTip.innerHTML = page.title;
      icon.appendChild(toolTip);
      li.appendChild(icon);
      menuDiv.appendChild(li);
    });


    // deplay for performence
    setTimeout(function() {
      new Sortable(menuDiv, {
        animation: 400,
        dataIdAttr: 'data-id',
        forceFallback: true,
        onEnd: function(el) {
          currentOrder.splice(el.oldIndex, 1);
          currentOrder.splice(el.newIndex, 0, el.item.id);
          if (isMenuValid(currentOrder)) {
            saveToLocalStorage('menu-order', currentOrder);
          }
          else {
            saveToLocalStorage('menu-order', defaultOrder);
          }
        }
      });
    }, 300);
  }

  function isMenuValid(order) {
    if (order.length !== defaultOrder.length)
      return false;

    var items = {};
    var isVailid = true;
    order.forEach(function(id) {
      if (items.hasOwnProperty(id)) {
        isVailid = false;
      }
      items[id] = '';
    });
    return isVailid;
  }


  var menuCtr = document.querySelector('.menu-control');
  var menuStatus = $('#menu-status');

  getLocalStorage('right-menu', function(rt) {
    if (rt === undefined || rt.open === true) {
      showRightMenu();
    }
    else {
      hideRightMenu();
    }
  });

  menuCtr.addEventListener('click', function() {
    if(menuStatus.hasClass('open')) {
      hideRightMenu();
      saveToLocalStorage('right-menu', {
        open: false
      });
    }
    else {
      showRightMenu();
      saveToLocalStorage('right-menu', {
        open: true
      });
    }
  });

  function showRightMenu() {
    $('.right-sidebar').fadeIn();
    menuStatus.addClass('open');
  }

  function hideRightMenu() {
    $('.right-sidebar').fadeOut();
    menuStatus.removeClass('open');
  }

})(window);
