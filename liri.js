// accessing twitter, spotify, and request modules
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

// importing twitter and spotify keys from key.js
var twitterClient = new Twitter(require('./keys.js').twitterKeys);
var spotifyClient = new Spotify(require('./keys.js').spotifyKeys);

// capture user input in the command line
var command = process.argv[2];
// turns user input into a single string for search query
var searchQuery = process.argv.slice(3).join(' ');

// checking what command the user put in
if (command === 'my-tweets') {
	getTweets();
}
else if (command === 'spotify-this-song') {
	getSong();
}
else if (command === 'movie-this') {
	getMovie();
}
else if (command === 'do-what-it-says') {
	runTxtCommand();
}
else {
	console.log('Sorry, I don\'nt recognize that input.');
}

// grabs the last 20 tweets from Twitter account
function getTweets () {
	twitterClient.get('statuses/user_timeline', {'user_id': '718904424848957440', 'count': 20}, function (error, tweets, response) {
		if (error) {
			return console.log(error);
		}

		// iterates through tweets and prints out the text and the creation date
		for (var i=0; i < tweets.length; i++) {
			var tweet = tweets[i].text;
			var date = tweets[i].created_at;

			console.log(tweet + '\n' + date + '\n' + '--------------------------' + '\n');
		}
	})
}

// shows information about the specified song
	// if song isn't defined, default to "The Sign" by Ace of Base;
function getSong() {
	if (!searchQuery) {
		// look up "The Sign" by Ace of Base;
		spotifyClient.search({ type: 'track', query: 'The Sign', limit: 1 }, function(error, data) {
		  if (error) {
		    return console.log('Error occurred: ' + error);
		  }
		
		console.log('information about "The Sign" by Ace of Base goes here');
		
		})
	}
	else {
		// log: artist(s), song's name, preview link of the song from Spotify, album that the song is from
		spotifyClient.search({ type: 'track', query: searchQuery }, function(error, data) {
		  if (error) {
		    return console.log('Error occurred: ' + error);
		  }
		 
		 console.log('Artist(s): ' + data.tracks.items[0].artists[0].name);
		 console.log('Song: ' + data.tracks.items[0].name);
		 console.log('Preview Link: ' + data.tracks.items[0].preview_url);
		 console.log('Album: ' + data.tracks.items[0].album.name);

		})
	}

}

// shows information about specified movie
function getMovie () {
// * Title of the movie.
//  * Year the movie came out.
//  * IMDB Rating of the movie.
//  * Rotten Tomatoes Rating of the movie.
//  * Country where the movie was produced.
//  * Language of the movie.
//  * Plot of the movie.
//  * Actors in the movie.

}

// runs command from random.txt file
function runTxtCommand () {

}