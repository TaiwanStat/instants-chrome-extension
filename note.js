(function(window) {

  // save
  window.onbeforeunload = function() {
    saveNote(false);
  };
  window.onblur = function() {
    saveNote(true);
  };
  window.onfocus = syncNote;
  window.simplemdeList = [];

  var texts ='\n### 嗨，您好，感謝您使用Instants\n\n這個頁面可以用來像這樣紀錄許多文字、連結、目標...' +
    '\n\n' + '**Instants 功能小提示：**'  +
    '\n\n* 大部分的資訊可以透過右上角的「設定」按鈕進入設定頁面自訂功能。' +
    '\n* 右側選單有許多常用的小功能。' +
    '\n* 左側的選單按鈕可以直接拖移排序。' +
    '\n* 書籤頁面的書籤也可以透過拖移排序。' +
    '\n* 筆記區域的內容，若有重要資訊，請盡量備份於其他地方。' +
    '\n* 有任何問題回饋可以透過右下角的訊息圖示聯繫我們。' +
    '\n\n\nHave a nice day : )' +
    '\nBy Instants 團隊';

  var edit = false;
  var isBlur = false;
  var simplemde;
  var simpleArg = {
    autoDownloadFontAwesome: false,
    spellChecker: false,
    toolbar: false,
    status: false,
    tabSize: 4,
    blockStyles: {
      code: '`'
    }
  };

  showNotes();

  function initNotePad(id, content, cls) {
    $('.notes').append(
      $('<div>', {id: id+'-wrapper', class: cls})
        .append($('<textarea>', {id: id, class: 'note-edit'}))
    );

    var opt =  $.extend({ element: document.getElementById(id) }, simpleArg);
    simplemde = new SimpleMDE(opt);
    simplemde.value(content);

    simplemde.codemirror.on("change", function(){
      edit = true;
    });
    simplemdeList.push({
      id: id,
      simplemde: simplemde
    });
  }

  function showNotes() {
    getLocalStorage('note', function(data) {
      getLocalStorage('note', function(localData) {

        if (data === undefined) {
          data = {
            note: texts
          };
        }

        if (!data || !data.items) {
          /*if (data.updateAt && data.updateAt < localData.updateAt) { */
            initNotePad('note1', localData.note, 'note-wrapper');
          /*}
          else {
            initNotePad('note1', data.note, 'note-wrapper');
          }*/
        }
        else {
          var len;
          /*if (data.updateAt && data.updateAt < localData.updateAt) { */
            len = data.items.length;
            localData.items.forEach(function(item) {
              initNotePad(item.id, item.content, 'note-wrapper n_' + len);
            });
          /*}
          else {
            len = data.items.length;
            data.items.forEach(function(item) {
              initNotePad(item.id, item.content, 'note-wrapper n_' + len);
            });
          }*/

          if (window.simplemdeList && window.simplemdeList.length >= 4) {
            $('#plus').hide();
          }
        }

      }, {}, 'local');
    });
  }

  function saveNote(blur) {
    if (edit) {
      var note = {
        updateAt: +new Date(),
        items: []
      };

      simplemdeList.forEach(function(obj) {
        note.items.push({
          content: obj.simplemde.value(),
          id: obj.id
        });
      });
      saveToLocalStorage('note', note);
      saveToLocalStorage('note', note, 'local');
    }
    if (blur)
      isBlur = true;
  }

  $('#plus').click(function() {
    if (simplemdeList >= 4) {
      return;
    }


    $('.note-wrapper').removeClass('n_'+simplemdeList.length);
    var len = simplemdeList.length + 1;
    $('.note-wrapper').addClass('n_'+len);
    initNotePad('note' + len, '', 'note-wrapper n_' + len);

    edit = true;
    if (simplemdeList.length >= 4) {
      $(this).hide();
    }
  });

  $('#minus').click(function() {
      var len = simplemdeList.length;
      if (len === 0)
        return;

      var removeNote = simplemdeList[len-1];
      var r = true;

      if (removeNote.simplemde.value() !== '')
        r = confirm("注意：目前還有內容存在，是否要更改成回" + (len - 1) + '個區塊');

      if (r === true) {
        $('.note-wrapper').removeClass('n_'+len);

        simplemdeList.pop();
        $('#'+removeNote.id+'-wrapper').remove();
        edit = true;

        $('.note-wrapper').addClass('n_'+simplemdeList.length);

        if (simplemdeList.length < 4) {
          $('#plus').show();
        }
      }
  });

  function syncNote() {
    if (!isBlur)
      return;

    edit = false;
    simplemdeList = [];
    simplemde = null;
    $('.notes').empty();
    setTimeout(function () {
      showNotes();
    }, 300);
  }

})(window);
