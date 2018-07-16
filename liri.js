require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
let Spotify = require('node-spotify-api');
var request = require('request')
var fs = require("fs");


// console.log(keys); to check if keys properly assigned

// take in commands using process.argv
var args = process.argv.slice(2);
var userCommand = process.argv[2] 
var userInput = args.slice(1).join("+");
console.log("user input: " + userInput);
console.log ("user command: " + userCommand);
// console.log(args); to see what was processed
// determine what command to execute
switch (userCommand) {
    case "movie-this":
    getMovieInfo(userInput);
    break;
    case "my-tweets":
    getTwitterInfo();
    break;
    case "do-what-it-says":
    runFS();
    break;
    case "spotify-this-song":
    songName = args.slice(1).join(" ");
    getSpotifyInfo(songName);
    break
}
// get twitter data
function getTwitterInfo() {
    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });
    var params = {screen_name: 'lokibeat'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log("TWEETS")
            tweets.forEach((tweet)=>{
                console.log("______________")
                console.log(tweet.text)
            })
        }
        
    })
}

// get spotify data
function getSpotifyInfo (songName) {
    console.log("Spotify requested for " + songName);
    var spotify = new Spotify(keys.spotify);
    spotify.search({type: 'track', query: songName}, function (err,data) {
        if(err) {
            return console.log("error occurred: " + err);
        }
    console.log("______________")
    console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
    console.log("Song Name: " + songName.toUpperCase());
    console.log("URL: " + data.tracks.items[0].album.external_urls.spotify);
    console.log("From Album: " + data.tracks.items[0].album.name)
    });
}

// get omdb data

function getMovieInfo(movieName) {
// check if user gave movie ***This doesn't work***
    if(movieName !== null) {
    console.log(movieName);
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
console.log(queryUrl);
request(queryUrl,function (error,response,body){
    // console.log('error',error);
    // console.log('statusCode:',response && response.statusCode);
    console.log('*******');
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    // console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country Produced: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
    console.log('*******');
    })}else {
    var queryUrl = "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);
    request(queryUrl,function (error,response,body){
        // console.log('error',error);
        // console.log('statusCode:',response && response.statusCode);
        console.log('*******');
        console.log("Title: " + JSON.parse(body).Title)
        console.log("Year: " + JSON.parse(body).Year)
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating)
        // console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country Produced: " + JSON.parse(body).Country)
        console.log("Language: " + JSON.parse(body).Language)
        console.log("Plot: " + JSON.parse(body).Plot)
        console.log("Actors: " + JSON.parse(body).Actors)
        console.log('*******')
    })
    }
}

// read random.txt file data
// use read best .js example uses fs
function runFS(){
    fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    var output = data.split(",");
    console.log(data)
    getMovieInfo(data[1]);//this isn't working for some reason as it's returning the character in the string. it should be the first element of the array 
    })
}
// bonus log commands


