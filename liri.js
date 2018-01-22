require("dotenv").config();
const keys = require("./keys.js");
const fs = require('fs')


var actionA = process.argv[2];
var actionB = process.argv[3];


// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.
switch (actionA) {
    case "my-tweets":
        tweets();

        break;

    case "spotify-this-song":
        spotifyIt(actionB);
        break;

    case "movie-this":
        movieThis(actionB);
        break;

    case "do-what-it-says":
        lotto();
        break;
}

// If the "my-tweets" function is called...
function tweets() {
    var Twitter = require('twitter');

    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });
    var params = {
        q: 'hzoba',
        count: 20

    } // this is the param variable which will have key and value 
    // ,the key is the keyword which we are interested in searching and count 
    // is the count of it
    client.get('search/tweets', params, searchedData); // get is the 
    // function to search the tweet which three paramaters 'search/tweets'
    // ,params and a callback function.
    function searchedData(err, data, response) {
        var tweets = data.statuses;
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].created_at);
            console.log(tweets[i].text);
        }


    }

}

function spotifyIt(song) {
    var Spotify = require('node-spotify-api');
    // Add code the code required to import the `keys.js` file and store it in a variable
    var keys = require("./keys.js");

    var spotify = new Spotify(keys.spotify);
    //Create a default song to search for if none are passed
    // console.log(song)



    spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        if (data.tracks.items[0].preview_url !== null) { console.log("Preview: " + data.tracks.items[0].preview_url); }
        console.log('From the album "' + data.tracks.items[0].album.name + '"');

    });

}


function movieThis(movie) {
    var omdb = require("omdb");
    var request = require('request');
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";


    request(queryURL, function(error, response, body) {
        
        console.log('body:', body); // Print the HTML for the movie
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); 
        // Print the response status code if a response was received

    });
    // movies.search(movie, function(err, movies) {
    //     if (err) {
    //         return console.error(err);
    //     }

    //     if (movies.length < 1) {
    //         return console.log('No movies were found!');
    //     }

    //     movies.forEach(function(movie) {
    //         console.log('%s (%d)', movie.title, movie.year);
    //     });


}

//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.