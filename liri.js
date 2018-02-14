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