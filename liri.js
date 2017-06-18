//Twitter client constants
const Twitter = require('twitter');
const twitterKeys = require('./key')  	 	
const client = new Twitter(twitterKeys);

//Spotify client constants
const Spotify = require('node-spotify-api');
const spotifyKeys = require('./spotify-id');
const spotify = new Spotify(spotifyKeys);

//terminal entry variables
var action = process.argv[2],
	userInput,
	logNumber = 1,
	//require request for omdb
	request = require("request"),

	//require fs for readFile and writeFile
	fs = require('fs');

//switch statements for action inputs
switch (action) {
	case "my-tweets":
	case "tweet":
	case "tweets":
	case "t":
		fireTweets();
		break;
	case "spotify-this-song":
	case "spotify":
	case "spot":
	case "s":
		userInput = process.argv[3],
		fireSpotify();
		break;
	case "movie-this":
	case "movie":
	case "movies":
	case "m":
		userInput = process.argv[3],
		fireMovie();
		break;
	case "do-what-it-says":
	case "do-it":
	case "do":
	case "d":
		fireDoIt();
		break;	

	default:
		console.log("===============================================");
		console.log("Error, please follow one of these formats.");
		console.log("=============");
		console.log("node liri.js my-tweets");
		console.log("=============");
		console.log("node liri.js spotify-this-song '<song name here>'");
		console.log("=============");
		console.log("node liri.js movie-this '<movie name here>'");
		console.log("=============");
		console.log("node liri.js do-what-it-says");
		console.log("===============================================");	
};

	//Function to show tweets
	function fireTweets(){
		
		var params = {screen_name: 'ljkhfla',
					  count: 20
					};

		client.get('statuses/user_timeline', params, function(error, tweets, response) {

		  if (!error) {
		  	console.log("========================= Start of Tweets ============================");
		  	
		  	for( var i = 0 ; i < tweets.length ; i++){
		  		console.log("=================================");
		    	console.log("Tweet Number " + i + " " +tweets[i].text);
		    	console.log(tweets[i].created_at);
		    	console.log("=================================");
			}

		  	console.log("========================= End of Tweets ============================");

			  if (error){
			  	throw error;
			  }
		  }
		});
	};

	//Function to show spotify search results
	function fireSpotify(){
		
		if (userInput === undefined){
			console.log("Error, no song entered.");
			userInput = "The Sign Ace of Base";
		}

		spotify.search({ type: 'track', query: userInput }, function(error, data) {

	    	if ( !error )  {

	    		console.log("========================= Start of Spotify Matches ============================");
	  			
	  			for (var i = 0 ; i < data.tracks.items.length ; i ++){

	    			for(var j = 0 ; j < data.tracks.items[i].album.artists.length ; j ++){
	    				
	    				console.log("=================================");
	    				if (data.tracks.items[i].album.artists[j].name == null ||data.tracks.items[i].album.artists[j].name == ""){
	    					console.log("No Artist Data Available");
	    				}else{
	    					console.log("Artist: " + data.tracks.items[i].album.artists[j].name);
	    				}
	    			}

	    				if (data.tracks.items[i].name == null || data.tracks.items[i].name == ""){
	    					console.log("No Song Name Data Available");
	    				}else{
	    					console.log("Song Name: " + data.tracks.items[i].name);
	    				}

	    				if (data.tracks.items[i].preview_url == null || data.tracks.items[i].preview_url == ""){
	    					console.log("No Preview URL Available");
	    				}else{
		    			console.log("Preview Link: " + data.tracks.items[i].preview_url);
		    			}

		    			if (data.tracks.items[i].album.name == null || data.tracks.items[i].album.name == ""){
		    				console.log("No Album Name Data Available");
		    			}else{
		    				console.log("Album Name: " + data.tracks.items[i].album.name);
		    			}

		    			console.log("=================================");  
		    	}
	    	}		
	    		console.log("============================== End of Spotify Matches ===================================");

		    if (error) {
		    	throw error;
		    }
		});
	};

	function fireMovie(){

		if (userInput == undefined){
			console.log("Error, no movie entered");

		}else{

		request("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

			if (!error){
				console.log(JSON.parse(body));
				console.log("=====================================");
				console.log("Title: " + JSON.parse(body).Title);
				console.log("Year Released: " + JSON.parse(body).Year);
				console.log("imdbRating: " + JSON.parse(body).imdbRating);
				console.log("Language: " + JSON.parse(body).Language);
				console.log("Plot: " + JSON.parse(body).Plot);
				console.log("Actors: " + JSON.parse(body).Actors);
				console.log("=====================================");
			}
			if (error) {
		    	throw error;
		    }

		});
		}
	}

	//Function to read random.txt file
	function fireDoIt(){
		
		fs.readFile('random.txt','utf8', function(err,data){

  			if(!err){

  				var split = data.split(",");
  				var action = split[0];
  				userInput = split[1];
  				fireSpotify();

  			}

      		if(err) {
      			throw err;
      		}
      	});
	}

	//Function to log user commands
	function writeFile(){
		logNumber++;

		fs.writeFile("log.txt","Search Number: "+logNumber+"--"+action+" "+userInput , function(err) {

  		if (err) {
    		return console.log(err);
  		}
  	}

