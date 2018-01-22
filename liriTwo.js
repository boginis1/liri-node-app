require("dotenv").config();
const keys = require("./keys.js");
const fs = require('fs')
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const Omdb = require('omdb');

var movies = new Omdb;

// for (var twitter in keys)
// var spotify = new spotify(keys.spotify);
//   var client = new twitter(keys.twitter);

var actionA = process.argv[2];
var actionB = process.argv[3];

// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.
switch (actionA) {
    case "my-tweets":
        tweets();
        break;

    case "spotify-this-song":
        spotifyIt();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        lotto();
        break;
}

// If the "my-tweets" function is called...
function tweets() {

    var params = {
        q: 'hzoba',
        count: 2

    } // this is the param variable which will have key and value 
    // ,the key is the keyword which we are interested in searching and count 
    // is the count of it
    client.get('search/tweets', params, searchedData); // get is the 
    // function to search the tweet which three paramaters 'search/tweets'
    // ,params and a callback function.
    function searchedData(err, data, response) {

        console.log(JSON.stringify(data.statuses));
    }

}

function spotify() {

    var SpotifyWebApi = require('spotify-web-api-node');

    // credentials are optional
    var spotifyApi = new SpotifyWebApi({
            id: process.env.SPOTIFY_ID,
            secret: process.env.SPOTIFY_SECRET
        };

    }



    function movie() {
        //   // import
        var title = process.argv[3]
        movies.search("title", function(err, movies) {
            if (err) {
                return console.error(err);
            }

            if (movies.length < 1) {
                return console.log('No movies were found!');
            }

            movies.forEach(function(movie) {
                console.log('%s (%d)', movie.title, movie.year);
            });


        });
    }