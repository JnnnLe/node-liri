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
      //
    } else if (userInput === 'movie-this') {
      //
    } else if (userInput === 'do-what-it-says') {
      //
    }
  });
}

function getTweets(callbackfunction) {
  var callback = callbackfunction;
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is your Twitter handle?',
      name: 'twitterHandle'
    }
  ]).then(function(res) {
    console.log('Twitter:', keys.twitter)
    var twitterHandle = res.twitterHandle;
  
    //user submitted a valid string
    if (twitterHandle === '') {
      twitterHandle = 'sgrstk';
      var arr = twitterHandle.split(' ');
      arr = arr.join('');
      twitterHandle = arr;
      console.log('THis is ARRR', arr);
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
        console.log("uh-oh something isn't right!")
      }
      callback();
    }); 
  });
}

promptUser();