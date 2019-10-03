const auddKey = '9c926ea14e70b0a8a01451f9b1e9a4c2';
const baseUrlAudd = 'https://api.audd.io/findLyrics/'

const youtubeKey = 'AIzaSyCyroCucfStpe8Q9K1Low1zhSXsFAtHE9M'


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

function watchReturnButton() {
    $("div.wrapper").on('click','button.returnButton', function(){
        $("div.resultsHolder").empty();
        $('button.returnButton').toggleClass('hidden');
        $("div.resultsHolder").toggleClass('hidden');
        $("div.searchBarHolder").toggleClass('hidden');
    })
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
        api_token: auddKey,
        /* format:"jsonp", */
    }
    const queryString = constUrl(params)
    const url = baseUrlAudd + '?' + queryString;
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
        .then (responseJson => getWikiLinks(reponseJson))
       /*  .then (responseJson => createLyricsSnippet(responseJson)) */
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        })
    };
//

/* GET YOUTUBE LINKS */

function getYoutubeLink (resultsJson) {
    const youtubeLinks= [];
    for (let i = 0; i<resultsJson.result.length; i++) {
        fetch ('https://www.googleapis.com/youtube/v3')
    }

}


/* MANIPULATE DOM */
function generateResults(responseJson, youtubeLinks) {
    console.log(responseJson);
    $("div.resultsHolder").toggleClass("hidden");
    $("button.returnButton").toggleClass("hidden");
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
};


$(function () {
    watchSubmit();
    watchFilter();
    watchFilterSelect();
    watchReturnButton();
    console.log('Ready! Waiting for submit.');
})  
