const auddKey = '9c926ea14e70b0a8a01451f9b1e9a4c2';
const baseUrlAudd = 'https://api.audd.io/findLyrics/'

const youtubeKey = 'AIAIzaSyDc6rGhs8xLlq7WcgU3eTae0i-bT5kJRxs'


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
        $("div.title").toggleClass('hidden');
    })
}
//

/* CONSTRUCT URL */
function constUrl (params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&'); //==>queryItems.join == queryString
};
//

/* GET FUNCTION */
function getLyrics(snippet) {
    const params = {
        q: snippet,
        s_artist_rating: 'DESC',
        api_token: auddKey,
        /* format:"jsonp", */
    }
    const queryString = constUrl(params);
    const url = baseUrlAudd + '?' + queryString + '&return=spotify';
    console.log(url);
    fetch (url)
        .then (response => {
            if (response.ok) {
                let lyricObject = response.json();
                return lyricObject;
            }
            else {
                throw new Error(response.statusText);
            }
            })
        .then (lyricObject => createLyricsSnippet(lyricObject, snippet))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        })
};


/* CREATE LYRIC SNIPPET */
function createLyricsSnippet(lyricObject, snippet) {
    const snippetArray = [];
    for (let i = 0; i<(lyricObject.result).length;i++) {
        index = (lyricObject.result[i].lyrics).indexOf(snippet)
        if(index >= 0)
        {
            var _ws = [" ","\t"]

            var whitespace = 0
            var rightLimit = 0
            var leftLimit = 0

            // right trim index
            for(rightLimit = index + snippet.length; whitespace < -2; rightLimit++)
            {
                if(rightLimit >= (lyricObject.result[i].lyrics).length){break}
                if(_ws.indexOf((lyricObject.result[i].lyrics).charAt(rightLimit)) >= 0){whitespace += 1}
            }

            whitespace = 0
            // left trim index
            for(leftLimit = index; whitespace < 6; leftLimit--)
            {
                if(leftLimit < 0){break}
                if(_ws.indexOf((lyricObject.result[i].lyrics).charAt(leftLimit)) >= 0){whitespace += 1}
            }
            snippetArray.push((lyricObject.result[i].lyrics).substr(leftLimit + 1, rightLimit)) // return match
        }
    }
    generateResults(lyricObject, snippetArray);
}
    

/* function generateLinks (lyricObject, snippetArray) {
    console.log(lyricObject)
    for (let i=0; i<(lyricObject.result).length; i++) {
        let indexLink = ((lyricObject.result[i].media).indexOf('youtube.com') - 11);
        (lyricObject.result[i].media).splice
    }
} */



/* MANIPULATE DOM */
function generateResults(lyricObject, snippetArray) {
    console.log(snippetArray);
    console.log(lyricObject);
    $("div.resultsHolder").toggleClass("hidden");
    $("button.returnButton").toggleClass("hidden");
    $("div.resultsHolder").empty();
    $("div.searchBarHolder").toggleClass("hidden");
    $("div.title").toggleClass("hidden");
    for (let i = 0; i<(lyricObject.result).length;i++) {
        $("div.resultsHolder").append(`
            <div class="resultItem">
                <h1 class="songTitleHeader">Song title: ${lyricObject.result[i].full_title}</h1>
                <a href=${lyricObject.result[i].media[1].url}>YouTube</a>
                <h2 class="songSnippet">"...${snippetArray[i]}..."</h2>
            </div>
        `)
        console.log(Object.keys(lyricObject.result[i].media[1]));
    }
};



$(function () {
    watchSubmit();
    watchFilter();
    watchFilterSelect();
    watchReturnButton();
    console.log('Ready! Waiting for submit.');
}); 
