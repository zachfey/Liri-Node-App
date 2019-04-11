require('dotenv').config();
var keys = require("./keys.js");
var axios = require('axios')
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);

var bandsInTown = function (artist) {
    const queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    console.log(queryUrl);
    axios.get(queryUrl).then(
        function (response) {
            console.log(response.data[0].venue.name);
            console.log(response.data[0].venue.city + ', ' + response.data[0].venue.region);
            console.log(response.data[0].datetime); //TODO format as MM/DD/YY

            // for (let i = 0; i < 5; i++){ //TODO list first 5 results
            //     console.log(resopnse.data[i].Venue)
            // }
        }
    );
}

var spotifyLookup = function (track) {
    spotify.search({
        type: 'track',
        query: track
    }, function (err, data) {
        if (err) {
            console.log('artist: Ace of Base')
            console.log('song: The Sign')
            console.log('album: The Sign (US Album) [Remastered]')
            console.log('preview: https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=2c2e8f7e8eec4deca2d30b5e6ab2c982')
            return console.log('Error occurred: ' + err);
        }

        console.log('artist: ' + data.tracks.items[0].artists[0].name);
        console.log('song: ' + data.tracks.items[0].name);
        console.log('album: ' + data.tracks.items[0].album.name);
        console.log('preview: ' + data.tracks.items[0].preview_url);
    });
}

const input = process.argv

let arg1 = input[2]
let arg2 = input[3]
for (let i = 4; i < input.length; i++) {
    arg2 += ' ' + input[i];
}

// console.log(args);

// Make it so liri.js can take in one of the following commands:
console.log(arg1 + ' ' + arg2);

if (arg1 === 'concert-this') { //TODO: Make this a switch command.

    bandsInTown(arg2);

} else if (arg1 === 'spotify-this-song') {
    console.log('spotifying.....')
    spotifyLookup(arg2);

} else if (arg1 === 'movie-this') {
    console.log('movie-this')

} else if (arg1 === 'do-what-it-says') {
    console.log('do-what-it-says')

} else {

}


// What Each Command Should Do


// node liri.js spotify-this-song '<song name here>'


// This will show the following information about the song in your terminal/bash window


// Artist(s)


// The song's name


// A preview link of the song from Spotify


// The album that the song is from


// If no song is provided then your program will default to "The Sign" by Ace of Base.


// node liri.js movie-this '<movie name here>'


// This will output the following information to your terminal/bash window:
//   * Title of the movie.
//   * Year the movie came out.
//   * IMDB Rating of the movie.
//   * Rotten Tomatoes Rating of the movie.
//   * Country where the movie was produced.
//   * Language of the movie.
//   * Plot of the movie.
//   * Actors in the movie.


// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'


// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/


// It's on Netflix!




// You'll use the axios package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.




// node liri.js do-what-it-says


// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.


// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.


// Edit the text in random.txt to test out the feature for movie-this and concert-this.







// BONUS


// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.


// Make sure you append each command you run to the log.txt file.


// Do not overwrite your file each time you run a command.