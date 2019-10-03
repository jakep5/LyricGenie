const myApiKey = '9c926ea14e70b0a8a01451f9b1e9a4c2';
const baseUrl = 'https://api.audd.io/findLyrics/'


/* EVENT LISTENERS */
/* function watchButton () {
    $("button.submitButton").on('click', function() {
        $("form").submit();
    })
} */
function watchSubmit (){
    $("form").submit(function(e) {
        e.preventDefault();
        const snippet = $("#songLyric").val();
        getLyrics(snippet);
    }
    )};

function watchFilter () {
    $("button.filterButton").on('click', function(){
        $("div.filterDisplay").toggleClass("hidden");
    });
}

function watchFilterSelect() {

}
//

/* CONSTRUCT URL */
function constUrl (params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&'); //==>queryItems.join == queryString
}
//

/* GET FUNCTION */
function getLyrics(snippet) {
    const params = {
        q: snippet,
        /* s_artist_rating: 'DESC', */
        api_token: myApiKey,
        /* format:"jsonp", */
    }
    const queryString = constUrl(params)
    const url = baseUrl + '?' + queryString;
    console.log(url);
    fetch (url)
        .then (response => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error(response.statusText);
            }
            })
        .then (responseJson => generateResults(responseJson))
       /*  .then (responseJson => createLyricsSnippet(responseJson)) */
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        })
    };
//

/* LYRICS SNIPPET CREATOR */
/* function createLyricsSnippet(responseJson) {
    const lyricArray = [];
    for (let i=0; i<(responseJson.result).length;i++){


    }
} */
/* MANIPULATE DOM */
function generateResults(responseJson, lyricArray) {
    console.log(responseJson);
    $("div.resultsHolder").empty();
    $("div.searchBarHolder").toggleClass("hidden");
    for (let i = 0; i<(responseJson.result).length;i++) {
        $("div.resultsHolder").append(`
            <div class="resultItem">
                <h1 class="songTitleHeader">Song title: ${responseJson.result[i].full_title}</h1>
                <button class="resultsButton spotify">Spotify</button>
                <button class="resultsButton youtube">YouTube</button>
                <button class="resultsButton wiki">Artist Wiki</button>
            </div>
        `)
}





}

$(function () {
  /*   watchButton(); */
    watchSubmit();
    watchFilter();
    watchFilterSelect();
    console.log('Ready! Waiting for submit.');
})  
