require('dotenv').config();
var keys = require("./keys.js"); //requires the js file which contains the key for the spotify API. That js file will not be uploaded to github
var Spotify = require('node-spotify-api') //requries the spotify API
var spotify = new Spotify(keys.spotify); //creates a new Spotify object using the keys in the above file
var axios = require('axios') //used for the omdb and bandsInTown APIs
var moment = require('moment'); //used to convert the concert date from badnsInTown API
var fs = require('fs'); //used to read random.txt in do-what-it-says command

///////////////////////Function declarations///////////////////////////////////////////////
var bandsInTown = function (artist) {
    const queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    // console.log(queryUrl);
    axios.get(queryUrl).then(
        function (response) {

            // console.log(response.data[0].venue.name);
            // console.log(response.data[0].venue.city + ', ' + response.data[0].venue.region);
            // console.log(moment(response.data[0].datetime).format('MM/DD/YY'));

            for (let i = 0; i < 5; i++){ //list first 5 results
                let tourInfo = {
                    venue: response.data[i].venue.name,
                    city: response.data[i].venue.city + ', ' + response.data[i].venue.region,
                    date: moment(response.data[i].datetime).format('MM/DD/YY')
                }
                // console.log(JSON.stringify(tourInfo,null,2));
                console.table(tourInfo);
            }
        }
    ).catch(function(err){
        console.log('oops: ' + err);
    })
}

var spotifyLookup = function (track) {
    if(!track){track = 'The Sign Ace of Base'}
    spotify.search({
        type: 'track',
        query: track
    }, function (err, data) {
        if (err) { //default to The Sign by Ace of Base
            spotifyLookup('The Sign Ace of Base')
            // console.log('artist: Ace of Base')
            // console.log('song: The Sign')
            // console.log('album: The Sign (US Album) [Remastered]')
            // console.log('preview: https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=2c2e8f7e8eec4deca2d30b5e6ab2c982')
            return console.log('Error occurred: ' + err);
        }
        const returnedSong = {
            Artist: data.tracks.items[0].artists[0].name,
            Song: data.tracks.items[0].name,
            Album: data.tracks.items[0].album.name,
            Preview: data.tracks.items[0].preview_url
        }
        // console.log(JSON.stringify(returnedSong,null,2));
        console.table(returnedSong);

        // console.log('artist: ' + data.tracks.items[0].artists[0].name);
        // console.log('song: ' + data.tracks.items[0].name);
        // console.log('album: ' + data.tracks.items[0].album.name);
        // console.log('preview: ' + data.tracks.items[0].preview_url);
    });
}

var omdbLookup = function (movie) {
    if(!movie){movie = 'Mr. Nobody'}
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            // console.log(response);
            response.data.Ratings[0].Value; //checking for this value throws an error if movie does not exist (moves to catch); title and year just return undefined
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
        function (err) { //default to Mr. Nobody
            console.log('oops: ' + err);
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

var interpret = function (arg1, arg2) {
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
        console.log('randomizing....')
        console.log(fs.readFile('random.txt', 'utf8', function (err, data) {
            if (err) {
                return console.log('oops')
            } else {
                const splitData = data.split(',');
                // console.log(splitData)
                arg1 = splitData[0];
                arg2 = splitData[1].split('"')[1];
                interpret(arg1, arg2);
            }
        }));
    } else {
        console.log('Invalid input. Try: concert-this, spotify-this-song, movie-this, or do-what-it-says')
    }
}

///////////////////////////////End function Declarations///////////////////////////////////////

///////////////////////////////Input parsing////////////////////////////////////////////
const input = process.argv //takes in all command line arguments

let arg1 = input[2] // the first command line argument
let arg2 = input[3] //initialize the variable used in the for loop for the rest of hte command line arguments
for (let i = 4; i < input.length; i++) {
    arg2 += ' ' + input[i];
}

// console.log(arg1 + ' ' + arg2);
/////////////////////////////End Input Parsing////////////////////////////////////////////

interpret(arg1, arg2)





// BONUS


// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.


// Make sure you append each command you run to the log.txt file.


// Do not overwrite your file each time you run a command.