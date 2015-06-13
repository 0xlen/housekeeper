$(function () {
    var finder = window.finder = new Finder();
    $('#container .content').empty();
    $('#container .content').append(finder.$view);
    finder.$address.focus();
});
