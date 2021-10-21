(function(window) {

  window.air = air;
  function air(data) {
    var siteName = data.SiteName;
    var pm25 = parseInt(data.PM2_5);
    var info = '';

    $('#air')
      .append($('<div>', { class: 'site_name'}).html($('<h4>').text(siteName + '測站')))
      .append($('<div>', { class: 'status'}))
      .append($('<span>', { class: 'pm25' }));

    $('.pm25')
      .append($('<h4>', { class: 'pm-value'}));

    if (pm25 <= 11) {
      $('#air .status').attr('class', 'ui green tag label status').text('良好');
      info = '可以正常戶外活動';
    }
    else if (pm25 <= 23) {
      $('#air .status').attr('class', 'ui green tag label status').text('正常');
      img = './images/PM2.5-2.png';
      info = '可以正常戶外活動';
    }
    else if (pm25 <= 35) {
      $('#air .status').attr('class', 'ui green tag label status').text('正常');
      info = '可以正常戶外活動';
    }
    else if (pm25 <= 41) {
      $('#air .status').attr('class', 'ui yellow tag label status').text('普通');
      info = '一般人可正常戶外活動。心血管疾病的成人與孩童若有徵狀時應考慮減少戶外活動';
    }
    else if (pm25 <= 47) {
      $('#air .status').attr('class', 'ui orange tag label status').text('稍差');
      info = '一般人可正常戶外活動。心血管疾病的成人與孩童若有徵狀時應考慮減少戶外活動';
    }
    else if (pm25 <= 53) {
      $('#air .status').attr('class', 'ui orange tag label status').text('稍差');
      info = '一般人可正常戶外活動。心血管疾病的成人與孩童若有徵狀時應考慮減少戶外活動';
    }
    else if (pm25 <= 58) {
      $('#air .status').attr('class', 'ui red tag label status').text('不良');
      info = '任何人如果有不適，應該考慮減少戶外活動。心血管疾病的成人與孩童與年長者考慮減少體力消耗。';
    }
    else if (pm25 <= 64) {
      $('#air .status').attr('class', 'ui red tag label status').text('不良');
      info = '任何人如果有不適，應該考慮減少戶外活動。心血管疾病的成人與孩童與年長者考慮減少體力消耗。';
    }
    else if (pm25 <= 70) {
      $('#air .status').attr('class', 'ui red tag label status').text('非常不良');
      info = '任何人如果有不適，應該考慮減少戶外活動。心血管疾病的成人與孩童與年長者考慮減少體力消耗。具有氣喘的人可能需增加使用吸入劑頻率。';
    }
    else if (pm25 >= 71) {
      $('#air .status').attr('class', 'ui purple tag label status').text('有害');
      info = '任何人如果有不適，應減少體力消耗，特別是減少戶外活動。' +
        '心血管疾病的成人與孩童與年長者應減少體力消耗。具有氣喘的人可能需增加使用吸入劑頻率。';
    }
    
    if (isNaN(pm25) || pm25 === -1) {
      $('#air .pm25').children('h4').text(" PM2.5濃度：待更新");
      $('#air .status').attr('class', 'ui tag label status').text('測站維護中');
      $('#air .status').css('text-shadow', 'none');
    }
    else {
      $('.pm25 h4').text(" PM2.5濃度 ")
      .append($('<span>', { class: 'en' }).text(pm25 + ' μg/m'))
      .append($('<sup>').text(3))
      .append($('<i>', { class: 'info glyphicon glyphicon-question-sign' }))
      .append($('<div>', { class: 'info-content'} )
              .append($('<h5>').text(info)));
    }
  }

})(window);
