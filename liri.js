require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
// var spotify = new Spotify(keys.spotify);
var request = require('request')


// console.log(keys); to check if keys properly assigned

// take in commands using process.argv
var args = process.argv.slice(2);
var userInput = args.slice(1).join("+");
// console.log(args); to see what was processed
// determine what command to execute
switch (process.argv[2]) {
    case "movie":
    getMovieInfo(userInput);
    break;
    case "twitter":
    getTwitterInfo();
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
            console.log("______________")
          tweets.forEach((tweet)=>{
              console.log(tweet.text)
          })
        }
            
    })
}

// get spotify data

// get omdb data

function getMovieInfo(movieName) {
console.log(movieName);
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
console.log(queryUrl);
request(queryUrl,function (error,response,body){
    // console.log('error',error);
    // console.log('statusCode:',response && response.statusCode);
    console.log('*******')
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

// read random.txt file data
// use read best .js example

// bonus log commands


