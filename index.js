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


function watchReturnButton() {
    $("div.wrapper").on('click','button.returnButton', function(){
        $("div.resultsHolder").empty();
        $('button.returnButton').toggleClass('hidden');
        $("div.resultsHolder").toggleClass('hidden');
        $("div.searchBarHolder").toggleClass('hidden');
        $("div.subTitle").toggleClass("hidden");
        $("div.center-inner").toggleClass("hidden");
        $("div.bubbles").toggleClass("hidden");
        $("div.title").toggleClass('hidden');
        $('body').toggleClass('plain');
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
    console.log(lyricObject);
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
    console.log(snippetArray);
    generateLinks(lyricObject, snippetArray, snippet);
}
    

function generateLinks (lyricObject, snippetArray, snippet) {
    console.log(lyricObject)
    let linkArray = [];
    for (let i=0; i<(lyricObject.result).length; i++) {
        let indexLink = ((lyricObject.result[i].media).indexOf('watch?') );
        if (indexLink !== -1) {
            let spliceArray = (lyricObject.result[i].media).slice(indexLink-26, indexLink+19);
            /* linkArray.push(spliceArray); */
            linkArray.push(spliceArray);
        }
        else {
            linkArray.push('undefined');
        }
    }
    generateResults(lyricObject, snippetArray, linkArray, snippet);
}



/* MANIPULATE DOM */
function generateResults(lyricObject, snippetArray, linkArray, snippet) {
    console.log(snippetArray);
    console.log(lyricObject);
    $("div.resultsHolder").toggleClass("hidden");
    $("div.resultsHolder").toggleClass("resultsHolderBlock");
    $("button.returnButton").toggleClass("hidden");
    $("div.searchBarHolder").toggleClass("hidden");
    $("div.subTitle").toggleClass("hidden");
    $("div.center-inner").toggleClass("hidden");
    $("div.bubbles").toggleClass("hidden");
    $("div.title").toggleClass("hidden");
    $("div.resultsHolder").append(`
        <h2 class="reference" role="searchTermHolder">Showing results for: "${snippet}"</h2>
        `)
    $('body').toggleClass('plain');
    for (let i = 0; i<(lyricObject.result).length;i++) {
        if (linkArray[i] !== 'undefined') {
            $("div.resultsHolder").append(`
                <div class="resultItem">
                    <h1 class="songTitleHeader">${lyricObject.result[i].full_title}</h1>
                    <a href=${linkArray[i]} target="_blank" class="youTube"><img src="https://www.freepnglogos.com/uploads/youtube-vector-logo-png-9.png" class="youTubeImage" alt="YouTube Link"></a>
                    <h2 class="songSnippet">"...${snippetArray[i]}..."</h2>
                </div>
            `)
        }
        else {
            $("div.resultsHolder").append(`
                <div class="resultItem">
                    <h1 class="songTitleHeader">${lyricObject.result[i].full_title}</h1>
                    <p class="youtubeAlt">YouTube video not found</p>
                    <h2 class="songSnippet">"...${snippetArray[i]}..."</h2>
                </div>
            `)
        }
    }
};

/* BUBBLE EFFECT */
jQuery(document).ready(function($){
 
    var bArray = [];
    var sArray = [4,6,8,10];
 
    for (var i = 0; i < $('.bubbles').width(); i++) {
        bArray.push(i);
    }
     
    function randomValue(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
 
    setInterval(function(){
         
        var size = randomValue(sArray);
    
        $('.bubbles').append('<div class="individual-bubble" style="left: ' + randomValue(bArray) + 'px; width: ' + size + 'px; height:' + size + 'px;"></div>');
         
        
        $('.individual-bubble').animate({
            'bottom': '100%',
            'opacity' : '-=0.7'
        }, 3000, function(){
            $(this).remove()
        }
        );
 
 
    }, 350);
 
});

/*/*/

$(function () {
    watchSubmit();
    watchReturnButton();
    console.log('Ready! Waiting for submit.');
}); 

