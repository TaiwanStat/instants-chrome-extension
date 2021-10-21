(function(window, chrome) {

  window.HOST = 'http://api.instants.xyz/';
  //HOST = 'http://localhost:8000/';
  window.powerURL = 'https://www.taiwanstat.com/powers/latest?';
  window.version = '0.6.7';

  window.storagePrfix = 'instants-';
  var now = window.now = new Date();
  var hours = window.hours = window.now.getHours();
  /*$.ajaxSetup({
    timeout: 1500 // in milliseconds
  });*/
  window.time = (hours >= 5 && hours < 18) ? '白天' : '晚上';
  window.saveToLocalStorage = saveToLocalStorage;
  window.getLocalStorage = getLocalStorage;
  window.getBatchLocalStorage = getBatchLocalStorage;
  window.saveBatchToLocalStorage = saveBatchToLocalStorage;
  window.fetchRSS = fetchRSS;

  function saveToLocalStorage(key, value, saveTo) {
    if (!saveTo) saveTo = 'sync';
    var data = {};
    data[storagePrfix+key] = value;
    chrome.storage[saveTo].set(data, function() {
     if (chrome.runtime.error)
       console.log("Runtime error.");
   });
  }

  function saveBatchToLocalStorage(data, saveTo) {
    if (!saveTo) saveTo = 'sync';
    chrome.storage[saveTo].set(data, function() {
     if (chrome.runtime.error)
       console.log("Runtime error.");
   });
  }



  function getLocalStorage(key, cb, opts, from) {
    if (!from) from = 'sync';
    chrome.storage[from].get(storagePrfix+key, function (result) {
      if (result) {
        cb(result[storagePrfix+key], opts);
      }
    });
  }

  function getBatchLocalStorage(keys, cb, opts, from) {
    if (!from) from = 'sync';
    chrome.storage[from].get(keys, function (result) {
      if (result) {
        cb(result, opts);
      }
    });
  }

  function fetchRSS(url, cb, opts) {
    $.get(url, function (data) {
      if (data) {
        cb(data, opts);
      }
    })
    .fail(function(res) {
      if (res.status === 200) {
        console.log(res);
        cb({}, opts);
        //cb(res.responseText, opts);
      }
      else {
        cb({}, opts);
        console.log(url);
        console.log('fetch news error');
      }
    });
  }


  // scroll active
  $.fn.scrollStopped = function(callback) {
    var that = this, $this = $(that);
    $this.scroll(function(ev) {
      clearTimeout($this.data('scrollTimeout'));
      $this.data('scrollTimeout', setTimeout(callback.bind(that), 850, ev));
    });
  };


  window.locationList = ["基隆市七堵區","基隆市中山區","基隆市中山區(海)","基隆市中正區","基隆市中正區(海)","基隆市仁愛區","基隆市仁愛區(海)","基隆市信義區","基隆市安樂區","基隆市暖暖區","新北市三峽區","新北市三芝區","新北市三重區","新北市中和區","新北市五股區","新北市八里區","新北市土城區","新北市坪林區","新北市平溪區","新北市新店區","新北市新莊區","新北市板橋區","新北市林口區","新北市樹林區","新北市永和區","新北市汐止區","新北市泰山區","新北市淡水區","新北市深坑區","新北市烏來區","新北市瑞芳區","新北市石碇區","新北市石門區","新北市萬里區","新北市蘆洲區","新北市貢寮區","新北市金山區","新北市雙溪區","新北市鶯歌區","台北市中山區","台北市中正區","台北市信義區","台北市內湖區","台北市北投區","台北市南港區","台北市士林區","台北市大同區","台北市大安區","台北市文山區","台北市松山區","台北市萬華區","桃園縣中壢市","桃園縣八德市","桃園縣大園鄉","桃園縣大溪鎮","桃園縣平鎮市","桃園縣復興鄉","桃園縣新屋鄉","桃園縣桃園市","桃園縣楊梅鎮","桃園縣蘆竹鄉","桃園縣觀音鄉","桃園縣龍潭鄉","桃園縣龜山鄉","新竹市北區","新竹市東區","新竹市香山區","新竹縣五峰鄉","新竹縣北埔鄉","新竹縣寶山鄉","新竹縣尖石鄉","新竹縣峨眉鄉","新竹縣新埔鎮","新竹縣新豐鄉","新竹縣橫山鄉","新竹縣湖口鄉","新竹縣竹北市","新竹縣竹東鎮","新竹縣芎林鄉","新竹縣關西鎮","苗栗縣三灣鄉","苗栗縣三義鄉","苗栗縣公館鄉","苗栗縣卓蘭鎮","苗栗縣南庄鄉","苗栗縣大湖鄉","苗栗縣後龍鎮","苗栗縣泰安鄉","苗栗縣獅潭鄉","苗栗縣竹南鎮","苗栗縣苑裡鎮","苗栗縣苗栗市","苗栗縣西湖鄉","苗栗縣通霄鎮","苗栗縣造橋鄉","苗栗縣銅鑼鄉","苗栗縣頭份鎮","苗栗縣頭屋鄉","台中市中區","台中市北區","台中市北屯區","台中市南區","台中市南屯區","台中市后里區","台中市和平區","台中市外埔區","台中市大安區","台中市大甲區","台中市大肚區","台中市大里區","台中市大雅區","台中市太平區","台中市新社區","台中市東勢區","台中市東區","台中市梧棲區","台中市梧棲鎮(海區","台中市沙鹿區","台中市清水區","台中市清水鎮(海區","台中市潭子區","台中市烏日區","台中市石岡區","台中市神岡區","台中市西區","台中市西屯區","台中市豐原區","台中市霧峰區","台中市龍井區","南投縣中寮鄉","南投縣仁愛鄉","南投縣信義鄉","南投縣南投市","南投縣名間鄉","南投縣國姓鄉","南投縣埔里鎮","南投縣水里鄉","南投縣竹山鎮","南投縣草屯鎮","南投縣集集鎮","南投縣魚池鄉","南投縣鹿谷鄉","彰化縣二林鎮","彰化縣二水鄉","彰化縣伸港鄉","彰化縣北斗鎮","彰化縣和美鎮","彰化縣員林鎮","彰化縣埔心鄉","彰化縣埔鹽鄉","彰化縣埤頭鄉","彰化縣大城鄉","彰化縣大村鄉","彰化縣彰化市","彰化縣永靖鄉","彰化縣溪州鄉","彰化縣溪湖鎮","彰化縣田中鎮","彰化縣田尾鄉","彰化縣社頭鄉","彰化縣福興鄉","彰化縣秀水鄉","彰化縣竹塘鄉","彰化縣線西鄉","彰化縣芬園鄉","彰化縣花壇鄉","彰化縣芳苑鄉","彰化縣鹿港鎮","雲林縣二崙鄉","雲林縣元長鄉","雲林縣北港鎮","雲林縣口湖鄉","雲林縣古坑鄉","雲林縣台西鄉","雲林縣四湖鄉","雲林縣土庫鎮","雲林縣大埤鄉","雲林縣崙背鄉","雲林縣斗六市","雲林縣斗南鎮","雲林縣東勢鄉","雲林縣林內鄉","雲林縣水林鄉","雲林縣莿桐鄉","雲林縣虎尾鎮","雲林縣褒忠鄉","雲林縣西螺鎮","雲林縣麥寮鄉","嘉義市東區","嘉義市西區","嘉義縣中埔鄉","嘉義縣六腳鄉","嘉義縣大埔鄉","嘉義縣大林鎮","嘉義縣太保市","嘉義縣布袋鎮","嘉義縣新港鄉","嘉義縣朴子市","嘉義縣東石鄉","嘉義縣梅山鄉","嘉義縣民雄鄉","嘉義縣水上鄉","嘉義縣溪口鄉","嘉義縣番路鄉","嘉義縣竹崎鄉","嘉義縣義竹鄉","嘉義縣阿里山鄉","嘉義縣鹿草鄉","台南市七股區","台南市下營區","台南市中西區","台南市仁德區","台南市佳里區","台南市六甲區","台南市北區","台南市北門區","台南市南化區","台南市南區","台南市南區(海)","台南市善化區","台南市大內區","台南市學甲區","台南市安南區","台南市安定區","台南市安平區","台南市安平區(海)","台南市官田區","台南市將軍區","台南市山上區","台南市左鎮區","台南市後壁區","台南市新化區","台南市新市區","台南市新營區","台南市東區","台南市東山區","台南市柳營區","台南市楠西區","台南市歸仁區","台南市永康區","台南市玉井區","台南市白河區","台南市西港區","台南市關廟區","台南市鹽水區","台南市麻豆區","台南市龍崎區","高雄市三民區","高雄市仁武區","高雄市內門區","高雄市六龜區","高雄市前金區","高雄市前鎮區","高雄市前鎮區(海)","高雄市大寮區","高雄市大樹區","高雄市大社區","高雄市小港區","高雄市小港區(海)","高雄市岡山區","高雄市左營區","高雄市彌陀區","高雄市新興區","高雄市旗山區","高雄市旗津區","高雄市旗津區(海)","高雄市杉林區","高雄市林園區","高雄市桃源區","高雄市梓官區","高雄市楠梓區","高雄市橋頭區","高雄市永安區","高雄市湖內區","高雄市燕巢區","高雄市田寮區","高雄市甲仙區","高雄市美濃區","高雄市苓雅區","高雄市茂林區","高雄市茄萣區","高雄市路竹區","高雄市阿蓮區","高雄市鳥松區","高雄市鳳山區","高雄市鹽埕區","高雄市鼓山區","高雄市鼓山區(海)","屏東縣三地門鄉","屏東縣九如鄉","屏東縣佳冬鄉","屏東縣來義鄉","屏東縣內埔鄉","屏東縣南州鄉","屏東縣屏東市","屏東縣崁頂鄉","屏東縣恆春鎮","屏東縣新園鄉","屏東縣新埤鄉","屏東縣春日鄉","屏東縣東港鎮","屏東縣枋寮鄉","屏東縣枋山鄉","屏東縣林邊鄉","屏東縣泰武鄉","屏東縣滿州鄉","屏東縣潮州鎮","屏東縣牡丹鄉","屏東縣獅子鄉","屏東縣琉球鄉","屏東縣瑪家鄉","屏東縣竹田鄉","屏東縣萬丹鄉","屏東縣萬巒鄉","屏東縣車城鄉","屏東縣里港鄉","屏東縣長治鄉","屏東縣霧台鄉","屏東縣高樹鄉","屏東縣鹽埔鄉","屏東縣麟洛鄉","宜蘭縣三星鄉","宜蘭縣五結鄉","宜蘭縣冬山鄉","宜蘭縣南澳鄉","宜蘭縣員山鄉","宜蘭縣壯圍鄉","宜蘭縣大同鄉","宜蘭縣宜蘭市","宜蘭縣礁溪鄉","宜蘭縣羅東鎮","宜蘭縣蘇澳鎮","宜蘭縣頭城鎮","花蓮縣光復鄉","花蓮縣卓溪鄉","花蓮縣吉安鄉","花蓮縣壽豐鄉","花蓮縣富里鄉","花蓮縣新城鄉","花蓮縣玉里鎮","花蓮縣瑞穗鄉","花蓮縣秀林鄉","花蓮縣花蓮市","花蓮縣萬榮鄉","花蓮縣豐濱鄉","花蓮縣鳳林鎮","台東縣卑南鄉","台東縣台東市","台東縣大武鄉","台東縣太麻里鄉","台東縣延平鄉","台東縣成功鎮","台東縣東河鄉","台東縣池上鄉","台東縣海端鄉","台東縣綠島鄉","台東縣蘭嶼鄉","台東縣達仁鄉","台東縣金峰鄉","台東縣長濱鄉","台東縣關山鎮","台東縣鹿野鄉","澎湖縣七美鄉","澎湖縣望安鄉","澎湖縣湖西鄉","澎湖縣白沙鄉","澎湖縣西嶼鄉","澎湖縣馬公市","連江縣北竿鄉","連江縣南竿鄉","連江縣東引鄉","連江縣莒光鄉","金門縣烈嶼鄉","金門縣金城鎮","金門縣金寧鄉","金門縣金沙鎮","金門縣金湖鎮"];

})(window, chrome);