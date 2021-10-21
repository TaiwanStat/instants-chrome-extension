(function(window) {

  window.startTime = startTime;
  var timeFormat = 24;
  var nowDiv;

  function startTime(format) {
    if (format) {
      timeFormat = format;
    }
    if (!nowDiv) {
      nowDiv = document.getElementById('now');
    }

    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    if (timeFormat == 12 && h > 12) {
      h = h - 12;
    }

    m = checkTime(m);
    s = checkTime(s);
    h = checkTime(h);

    nowDiv.innerHTML = h + ":" + m + ":" + s;

    var t = setTimeout(startTime, 500);
  }


  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }  // add zero in front of numbers < 10
    return i;
  }

})(window);
