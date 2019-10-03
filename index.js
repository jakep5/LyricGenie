const apiKey = '0590ac6e3b8a2d55f8589c81ddb2ac44';
const baseUrl = 'https://api.musixmatch.com/ws/1.1/'

function watchSubmit (){
    $("form").submit(function(e) {
        e.preventDefault();
    }
    )};

function watchFilter () {
    $("button.filterButton").on('click', function(){
        $("div.filterDisplay").toggleClass("hidden");
    });
}

















$(function () {
    watchSubmit();
    watchFilter();
})  
