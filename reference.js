require("dotenv").config();
const keys = require("./keys.js");
const fs = require('fs')
var Omdb = require('omdb');
var OmdbApiClient = require("OmdbApiClient");
var client = new Omdb({
    APIKey: process.env.OMDB_APIKey

});



function movie() {
    //   // import
    var title = process.argv[3]
    client.search("Camelot", function(err, movies) {
        if (err) {
            return console.error(err);
        }

        if (movies.length < 1) {
            return console.log('No movies were found!');
        }

        movies.forEach(function(movie) {
            console.log('%s (%d)', movie.title, movie.year);
        });

        // Saw (2004) 
        // Saw II (2005) 
        // Saw III (2006) 
        // Saw IV (2007) 
        // ... 
    });
  }