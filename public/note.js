(function(window) {

  var texts ='\n\n\n### 這個頁面可以用來像這樣紀錄許多文字、連結、目標...' +
    '\n\n*Sometimes, it\'s the very people who no one imagines anything of who do the things no one can imagine.*\n' +
    '\nHave a nice day！' +
    '\nInstants';

  var edit = false;
  var simplemde;

  window.showNotes = function() {
    $('.note-edit').show();
    simplemde = new SimpleMDE({
      element: document.getElementById("note1"),
      autoDownloadFontAwesome: false,
      spellChecker: false,
      toolbar: false,
      status: false,
      tabSize: 4,
      blockStyles: {
        code: '`'
      }
    });

    getLocalStorage('note', function(data) {
      if (data === undefined) {
        data = {
          note: texts
        };
      }
      else if (!data || !data.note) {
        data = {
          note: ''
        };
      }
      simplemde.value(data.note);
    });

    simplemde.codemirror.on("change", function(){
      edit = true;
    });
  };

  // save
  window.onbeforeunload = function (e) {
    if (edit) saveToLocalStorage('note', {
      note: simplemde.value()
    });
  };

  window.onblur = function () {
    if (edit) saveToLocalStorage('note', {
      note: simplemde.value()
    });
  };
  showNotes();
})(window);
