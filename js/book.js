(function(window) {

  window.showBook = showBook;

  function showBook(data) {
    $('#oil').empty();
    $('#oil-title').text('每日一書');
    $('#oil').append($('<div>', { class : 'book', id: 'book' })
      .append($('<a>', { href: data.link }).click(function() {
        mixpanel.track("book click");
      })
        .append($('<img>', { class: 'book-img', src: data.img, title: data.title })))
      .append($('<a>', { href: data.link })
        .append($('<p>', { class: 'book-title'}).text(data.title))));
  }

})(window);
