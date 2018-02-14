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

promptUser();