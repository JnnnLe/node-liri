require("dotenv").config();

//required key file 
var keys = require('./keys.js');


//npm dependencies 
var fs = require('fs');
var request  = require('request');
var Spotify  = require('node-spotify-api');
var Twitter  = require('twitter');
var inquirer = require('inquirer');


//Accessing api keys
var spotify = new Spotify(keys.spotify);
var client  = new Twitter(keys.twitter);

// console.log('Spotify:', keys.spotify);
// console.log('Twitter:', keys.twitter);
// console.log('OMDB:', keys.omdb);


/* 
  High level: 
    fn tweet(A)
    fn song(A)
    fn movie(A)
    fn liriCommand() => runs fn song

    fn promptUse()
    fn promptLogic(A)
*/


function promptUser() {
  inquirer.prompt([
    {
      type: 'list',
      message: 'Choose a LIRI command.',
      choices: ['my-tweets','spotify-this-song', 'movie-this', 'do-what-it-says'],
      name: 'userCommand'
    }

  ]).then(function(res) {
    var userInput = res.userCommand;
    // fs append user input to user log
    if (userInput === 'my-tweets') {
      getTweets(promptUser);
    } else if (userInput === 'spotify-this-song') {
      getSong(promptUser);
    } else if (userInput === 'movie-this') {
      //
    } else if (userInput === 'do-what-it-says') {
      //
    }
  });
}

function getTweets(callbackFn) {
  var callback = callbackFn;
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is your Twitter handle?',
      name: 'twitterHandle'
    }
  ]).then(function(res) {
    // console.log('Twitter:', keys.twitter)
    var twitterHandle = res.twitterHandle;
  
    //user submitted a valid string
    if (twitterHandle === '') {
      twitterHandle = 'sgrstk';
      var arr = twitterHandle.split(' ');
      arr = arr.join('');
      twitterHandle = arr;
      console.log('This is array', arr);
    }

    var params = {screen_name: twitterHandle};
    console.log('PARAMS', params);
    client.get('statuses/user_timeline', params, function(error, tweets, response) {

      if (!error) {
         var count = 0;
        //iterate up to 20 
        tweets.forEach(function(item) {
          if (count < 20) {
            count++;
            console.log('THE TWEET', item.text, '\nCreated at: ', item.created_at);
          }
        })
      }
      else {
        //console.log("Twitter Error", error);
        // fs append to log the error  
        console.log("Uh-oh something isn't right!")
      }
      callback();
    }); 
  });
}

function getSong(callbackFn) {
var callback = callbackFn;

  inquirer.prompt([
    {
      type: 'input',
      message: 'What song are you looking for?',
      name: 'songName'
    }
  ]).then(function(res) {
    // console.log("Spotify key: ", keys.spotify);
    var songName = res.songName;
  
    //user submitted a valid string
    if (songName === '' || songName === ' ') {
      songName = 'Hotel California';
      // console.log(songName);
    } else {
    spotify
      .search({ type: 'track', query: songName, limit: 1 })
      .then(function(res) {
        console.log("################################################");
        console.log('Spotify artist name: ', res.tracks.items[0].artists[0].name);
        console.log('Spotify song name: ', res.tracks.items[0].name);
        console.log('Spotify preview link: ', res.tracks.items[0].external_urls.spotify);        
        console.log('Spotify album name: ', res.tracks.items[0].album.name);
        console.log("################################################");
        // callback();

      })
      .catch(function(err) {
        console.log('Sorry that was not a valid song, please try again.');
        // callback();

      });

    }
  });
}

promptUser();