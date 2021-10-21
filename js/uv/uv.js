(function(window) {

  window.uv = uv;

  function uv(data) {
    var UVI = data.UVI;
    var degree = getDegree(UVI);

    if (UVI <= 2) {
      $('#uv').append($('<img>', { class: "image", src: "./images/uv_white.png", alt: "UV太陽雨傘-低量級"}));
    }
    else if(UVI <= 10) {
      $('#uv').append($('<img>', { class: "image", src: "./images/uv.png", alt: "UV太陽雨傘"}));
    }
    else {
      $('#uv').append($('<img>', { class: "image", src: "./images/uv_hot.png", alt: "UV太陽雨傘-過量級"}));
    }

    $('#uv')
      .append($('<h4>').text(data.SiteName + '・' + degree.disc)
      .append($('<i>', { class: 'info glyphicon glyphicon-question-sign' }))
      .append($('<div>', { class: 'info-content'})
        .append($('<h5>', {class: 'disc'}).text(degree.text))));
  }

  function getDegree(UVI) {
    if (UVI <= 2) {
      return { disc: '低量級', color: 'green', text: '對於一般人無危險，不需特別防護'};
    }
    else if (UVI <= 5) {
      return { disc: '中量級', color: 'yellow', text: '建議可以使用太陽眼鏡和防曬乳，並在陽光強烈時尋找遮蔽處。'};
    }
    else if (UVI <= 7) {
      return { disc: '高量級', color: 'orange', text: '建議使用太陽眼鏡和防曬乳（SPF > 15）' +
        '穿戴衣帽以保護皮膚並在陽光強烈時尋找遮蔽處，應減少暴露在陽光中。'};
    }
    else if (UVI <= 10){
      return { disc: '過量級', color: 'red', text: '建議使用太陽眼鏡和防曬乳（SPF > 15）' +
      '穿戴衣帽以保護皮膚並在陽光強烈時尋找遮蔽處，應減少暴露在陽光中。' }; 
    }
    else {
      return { disc: '危險級', color: 'purple', text: '建議採取「所有」的保護措施包括佩戴太陽鏡使用防曬乳，' + 
        '並用長袖衣服、帽子和褲子保護皮膚'}; 
    }
  }



})(window);
