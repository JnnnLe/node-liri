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
var songName = "";

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
      choices: ['my-tweets','spotify-this-song', 'movie-this', 'do-what-i-say'],
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
      getMovie(promptUser);
    } else if (userInput === 'do-what-i-say') {
      dwis(promptUser);
    }
  });
}

function getTweets(callbackFn) {
  var callback = callbackFn;
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the Twitter handle?',
      name: 'twitterHandle'
    }
  ]).then(function(res) {
    // console.log('Twitter:', keys.twitter)
    var twitterHandle = res.twitterHandle;
  
    //user submitted a valid string
    if (twitterHandle === '') {
      console.log('It looks like you did not enter a correct handle, here is our 44th president Twitter @BarackObama')
      twitterHandle = 'BarackObama';
      var arr = twitterHandle.split(' ');
      arr = arr.join('');
      twitterHandle = arr;
      // console.log('This is array', arr);
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
            console.log("################################################");
            console.log('                                                ');
            console.log('THE TWEET', item.text, '\nCreated at: ', item.created_at);
            console.log('                                                ');
            console.log("################################################");
          }
        })
      }
      else {
        //console.log("Twitter Error", error);
        // fs append to log the error  
        console.log("################################################");
        console.log('                                                ');
        console.log("Uh-oh something isn't right!");
        console.log('                                                ');        
        console.log("################################################");
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
    songName = res.songName;
  
    //user submitted a valid string
    if (songName === '' || songName === ' ') {
      songName = 'Hotel California';
      // console.log(songName);
    } else {
    spotify
      .search({ type: 'track', query: songName, limit: 1 })
      .then(function(res) {

        console.log('################################################');
        console.log('                                                ');
        console.log('Spotify artist name: ', res.tracks.items[0].artists[0].name);
        console.log('Spotify song name: ', res.tracks.items[0].name);
        console.log('Spotify preview link: ', res.tracks.items[0].external_urls.spotify);        
        console.log('Spotify album name: ', res.tracks.items[0].album.name);
        console.log('                                                ');        
        console.log("################################################");
        callback();

      })
      .catch(function(err) {
        console.log('Sorry that was not a valid song, please try again.');
        callback();
      });
    }
  });
}

function getMovie(callbackFn) {
  var callback = callbackFn;
  inquirer.prompt([
    {
      type: 'input',
      message: 'Inquire about your favorite movie.',
      name: 'moviePick'
    }
  ]).then(function(res) {
    var moviePick = res.moviePick;
    var queryURL = 'https://www.omdbapi.com/?t=' + moviePick + '&apikey=' + keys.omdb.id
    request(queryURL, function(err, res, body){

      var parseBody = JSON.parse(body);
      console.log("################################################");
      console.log('                                                ');
      console.log('Movie Title: ', parseBody.Title);
      console.log('Release Year: ', parseBody.Year);
      console.log('IMDB Rating: ', parseBody.Ratings[0].Value);
      console.log('Rotten Tomatoes Rating: ', parseBody.Ratings[1].Value);
      console.log('Country Produced: ', parseBody.Country);
      console.log('Language: ', parseBody.Language);
      console.log('Movie Plot: ', parseBody.Plot);
      console.log('Movie Actors: ', parseBody.Actors);
      console.log('                                                ');
      console.log("################################################");
      callback();
    });
  })
}

function dwis(callbackFn) {
  var callback = callbackFn;

  inquirer.prompt([
    {
      type: 'list',
      message: 'What are you in the mood for?',
      choices: ['Look @ someone\'s Twitter', 'I have a song I want to play.', 'I am in the mood for a good movie.'],
      name: 'userChoice'
    }
  ]).then(function(res) {
    if (res.userChoice === 'Look @ someone\'s Twitter') {
      getTweets(callbackFn);
    } else if (res.userChoice ===  'I have a song I want to play.') {
      getSong(callbackFn);
    } else if (res.userChoice === 'I am in the mood for a good movie.') {
      getMovie(callbackFn);

    }
  })
}

// jump start the game //
promptUser();

/*

TODO:
empty string case + error handling for getMovie fn
Append errors to proper log

*/