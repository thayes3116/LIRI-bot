var Twitter = require('twitter');

var twitterKeys = require('./key')
  	 	
var client = new Twitter(
	twitterKeys
	);

var action = process.argv[2];
var userInput = process.argv[3];

switch (action) {
	case "my-tweets":
	case "t":
		tweet();
		break;
	case "spotify-this-song":
	case "s":
		spotify();
		break;
	case "movie-this":
	case "m":
		movie();
		break;
	case "do-what-it-says":
	case "d":
		doIt();
		break;		
};

	function tweet(){
		
		var params = {screen_name: 'ljkhfla'};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
			//console.log(tweets);

		  if (!error) {

		  	for( var i = 0 ; i < tweets.length ; i++){
		    	console.log(tweets[i].text);
			}

			for( var i = 0 ; i < tweets.length ; i++){
		    	console.log(tweets[i].created_at);
			}

			  if (error){
			  	throw error;
			  }
		  }
		});
	};

	function spotify(){
		var spotify = require('spotify');
 		
		spotify.search({ type: 'track', query: userInput }, function(error, data) {
    	if ( !error )  {
    		console.log(data);	        
	    }
	    if (error) {
	    	throw error;
	    }
 
    // Do something with 'data' 
});
	}