require("dotenv").config();
var keys = require('./keys.js');

console.log("Spot: ", keys.spotify);
console.log("Twit: ", keys.twitter);


// var db = require('db')
// db.connect({
//   twitterConsumerKey: process.env.TWITTER_CONSUMER_KEY,
//   twitterConsumerSecret: process.env.TWITTER_CONSUMER_SECRET,
//   twitterAccessToken: process.env.TWITTER_ACCESS_TOKEN_KEY,
//   twitterTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
// });

// Attempting to import api keys from keys.js

// npm dependencies 
// var spotify = require('spotify');
// var twitter = require('twitter');

// var Spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);
