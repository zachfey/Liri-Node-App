require('dotenv').config();
var keys = require("./keys.js");
var axios = require('axios')
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);
var moment = require('moment');

var bandsInTown = function (artist) {
    const queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    console.log(queryUrl);
    axios.get(queryUrl).then(
        function (response) {
            console.log(response.data[0].venue.name);
            console.log(response.data[0].venue.city + ', ' + response.data[0].venue.region);
            console.log(moment(response.data[0].datetime).format('MM/DD/YY'));

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

var omdbLookup = function (movie) {
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            // console.log(response);
            const check = response.data.Ratings[0].Value; //checking for this value throws an error if movie does not exist (moves to catch); title and year just return undefined
            console.log('Title: ' + response.data.Title);
            console.log('Release year: ' + response.data.Year);
            console.log('IMDB Rating: ' + response.data.Ratings[0].Value)
            console.log('Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value)
            console.log('Country: ' + response.data.Country);
            console.log('Language: ' + response.data.Language);
            console.log('Plot: ' + response.data.Plot);
            console.log('Actors: ' + response.data.Actors);
        }
    ).catch(
        function (err){
            console.log('oops');
            // omdbLookup('Mr. Nobody');
            console.log('Title: Mr. Nobody');
            console.log('Release year: 2009');
            console.log('IMDB Rating: 7.8/10');
            console.log('Rotten Tomatoes Rating: 67%')
            console.log('Country: Belgium, Germany, Canada, France, USA, UK');
            console.log('Language: English, Mohawk');
            console.log("Plot: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.");
            console.log('Actors: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham');
        }
    )
};

const input = process.argv

let arg1 = input[2]
let arg2 = input[3]
for (let i = 4; i < input.length; i++) {
    arg2 += ' ' + input[i];
}

console.log(arg1 + ' ' + arg2);

if (arg1 === 'concert-this') { //TODO: Make this a switch command.
    console.log('bands in towning.....')
    bandsInTown(arg2);

} else if (arg1 === 'spotify-this-song') {
    console.log('spotifying.....')
    spotifyLookup(arg2);

} else if (arg1 === 'movie-this') {
    console.log('ombding......')
    omdbLookup(arg2);

} else if (arg1 === 'do-what-it-says') {
    console.log('do-what-it-says')

} else {

}


// What Each Command Should Do


// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'


// node liri.js do-what-it-says


// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.


// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.


// Edit the text in random.txt to test out the feature for movie-this and concert-this.







// BONUS


// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.


// Make sure you append each command you run to the log.txt file.


// Do not overwrite your file each time you run a command.