(function(window) {
  // update
  window.lifeUpdateManger = {
    rain: {
      path: 'rain/read/',
      interval: 13,
      timeHandler: 'rainTime',
      canSelectBySiteName: true,
      fn: window.rain
    },
    air: {
      path: 'air/read/',
      interval: 21,
      timeHandler: 'airTime',
      canSelectBySiteName: true,
      fn: window.air
    },
    weather: {
      path: 'weather/read/',
      interval: 13,
      timeHandler: 'weatherTime',
      canSelectBySiteName: true,
      fn: window.weather
    },
    uv: {
      path: 'uv/read/',
      interval: 29,
      timeHandler: 'uvTime',
      canSelectBySiteName: true,
      fn: window.uv
    },
    water: {
      path: 'water/read/',
      interval: 79*3,
      timeHandler: 'waterTime',
      canSelectBySiteName: true,
      fn: window.water
    },
    power: {
      path: 'power/read/',
      interval: 73*3,
      timeHandler: 'powerTime',
      fn: window.power
    }
  };

  window.artsUpdateManger = {
    movie: {
      path: 'movie/read/',
      interval: 59*12*1,
      timeHandler: 'movieTime',
      canSelectBySiteName: true,
      fn: window.movie
    },
    art: {
      path: 'art/read/',
      interval: 61*24*1,
      timeHandler: 'artTime',
      canSelectBySiteName: true,
      fn: window.art
    }
  };

  window.forecastUpdateManger = {
    "air-forecast": {
      path: 'air/read/forecast/',
      interval: 71*5,
      timeHandler: 'air-forecastTime',
      canSelectBySiteName: true,
      fn: window.airForecast
    },
    "weather-forecast": {
      path: 'weather/read/forecast/',
      interval: 53,
      timeHandler: 'weather-forecastTime',
      canSelectBySiteName: true,
      fn: window.weatherForecast
    },
    "alert-forecast": {
      path: 'alert/read/',
      interval: 13,
      timeHandler: 'alert-forecastTime',
      canSelectBySiteName: true,
      fn: window.alertForecast
    },
    oil: {
      path: 'oil/read/',
      interval: 67*1,
      timeHandler: 'oilTime',
      canSelectBySiteName: false,
      fn: window.oil
    }
  };

  window.newsUpdateManger = {
    bbc: {
      path: "http://feeds.bbci.co.uk/zhongwen/trad/rss.xml",
      category: "global",
      name: "BBC中文網",
      parser: "item",
      fn: window.news.globalNews
    },
    nyt: {
      path: "http://cn.nytimes.com/rss/zh-hant/",
      category: "global",
      name: "紐約時報中文網",
      parser: "item",
      fn: window.news.globalNews
    },
    "地球圖輯": {
      path: "http://world.yam.com/rss.php",
      category: "global",
      name: "地球圖輯隊",
      parser: "item",
      fn: window.news.globalNews
    },
    reporter: {
      path: "https://www.twreporter.org/a/rss2.xml",
      category: "local",
      name: "報導者",
      parser: "item",
      fn: window.news.localNews
    },
    newtalks: {
      path: "https://theinitium.com/feeds/",
      category: "local",
      name: "端傳媒",
      parser: "item",
      fn: window.news.localNews
    },
    central: {
      path: "http://feeds.feedburner.com/cnaFirstNews?format=xml",
      category: "local",
      name: "中央社",
      parser: "item",
      fn: window.news.localNews
    },
    udn: {
      path: 'http://udn.com/rssfeed/news/2/6644?ch=news',
      category: 'local',
      name: '聯合報',
      parser: 'item',
      fn: window.news.localNews
    },
    bnext: {
      path: "http://www.bnext.com.tw/Feed/rss/home",
      category: "tech",
      name: "數位時代",
      parser: "item",
      fn: window.news.techNews
    },
    pansci: {
      path: "http://pansci.asia/feed",
      category: "tech",
      name: "泛科學",
      parser: "item",
      fn: window.news.techNews
    },
    "A Day Magazine 時尚生活雜誌": {
      path: "http://www.adaymag.com/feed/",
      category: "travel",
      name: "A Day Magazine 時尚生活雜誌",
      parser: "item",
      fn: window.news.travelNews
    },
    women: {
      path: "https://feeds.feedburner.com/womany",
      category: "travel",
      name: "女人迷",
      parser: "entry",
      fn: window.news.travelNews
    },
    design: {
      path: "http://feeds.feedburner.com/mydesy",
      category: "travel",
      name: "ㄇㄞˋ點子靈感創意誌",
      parser: "item",
      fn: window.news.travelNews
    },
    technews: {
      path: "http://technews.tw/feed/",
      category: "tech",
      name: "TechNews科技新報",
      parser: "item",
      fn: window.news.techNews
    },
    travel: {
      path: "http://www.backpackers.com.tw/forum/external.php?type=RSS2",
      category: "travel",
      name: "背包客棧",
      parser: "item",
      fn: window.news.travelNews
    },
    ithome: {
      path: "http://www.ithome.com.tw/rss",
      category: "tech",
      name: "iThome",
      parser: "item",
      fn: window.news.techNews
    },
    basketball: {
      path: "https://tw.news.yahoo.com/rss/basketball",
      category: "sport",
      name: "Yahoo 新聞",
      label: "籃球",
      parser: "item",
      fn: window.news.sportNews
    },
    basetball: {
      path: "https://tw.news.yahoo.com/rss/baseball",
      category: "sport",
      name: "Yahoo 新聞",
      label: "棒球",
      parser: "item",
      fn: window.news.sportNews
    },
    sport: {
      path: "https://tw.news.yahoo.com/rss/other-sports",
      category: "sport",
      name: "Yahoo 新聞",
      parser: "item",
      fn: window.news.sportNews
    },
    tennis: {
      path: "https://tw.news.yahoo.com/rss/tennis",
      category: "sport",
      name: "Yahoo 新聞",
      label: "網球",
      parser: "item",
      fn: window.news.sportNews
    }
  };

  window.specialUpdate = {
     book: {
      path: 'book/read/',
      interval: 3 * 47,
      timeHandler: 'bookTime',
      canSelectBySiteName: false,
      fn: window.showBook
    },
    music: {
      path: 'music/read/',
      interval: 60 * 12,
      timeHandler: 'musicTime',
      canSelectBySiteName: false,
      fn: window.showMusic
    }
  };


})(window);
