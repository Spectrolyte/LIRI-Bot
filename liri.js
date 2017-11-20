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
	console.log('Sorry, I don\'t recognize that input.');
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
	var song;

	if (!searchQuery) {
		song = 'The Sign Ace of Base';
	}
	else {
		song = searchQuery;
	}

	// log: artist(s), song's name, preview link of the song from Spotify, album that the song is from
	spotifyClient.search({ type: 'track', query: song }, function(error, data) {
	  if (error) {
	    return console.log('Error occurred: ' + error);
	  }
	 
	 console.log('Artist(s): ' + data.tracks.items[0].artists[0].name);
	 console.log('Song: ' + data.tracks.items[0].name);
	 console.log('Preview Link: ' + data.tracks.items[0].preview_url);
	 console.log('Album: ' + data.tracks.items[0].album.name);
	 console.log('-------------------------');

	})
	

}

// shows information about specified movie
function getMovie () {
	var movie;

	if (!searchQuery) {
		movie = 'Mr. Nobody';
	}
	else {
		movie = searchQuery;
	}

	request('http://www.omdbapi.com/?apikey=trilogy&t=' + movie, function (error, response, body) {
		if (!error || response.statusCode === 200) {
			var data = JSON.parse(body);
			console.log('Title: ' + data.Title);
			console.log('Release Year: ' + data.Released);
			console.log('IMBD Rating: ' + data.Ratings[0].Value);
			console.log('Rotten Tomatoes: ' + data.Ratings[1].Value);
			console.log('Country: ' + data.Country);
			console.log('Language: ' + data.Language);
			console.log('Plot: ' + data.Plot);
			console.log('Actors: ' + data.Actors);
			console.log('-------------------------');
		}
	
	})

}

// runs command from random.txt file
function runTxtCommand () {

}