 var express = require('express'),
    handler = require('./handler.js'),
    littleprinter = require('littleprinter');
   	gol = require('./gameoflife.js');
 //	fitbit =require('./node_modules/fitbit-js/example/test.js');


var app = express();
var port = process.env.PORT || 5000;
app.set('views');
app.set('view engine', 'ejs', 'html'); // in this example I am using ejs, feel free to use a different view engine if you wish

handler.userdata = function(user){
	return getuserdata(user);
}


//Installing date
	littleprinter.setup(app, handler);
	app.listen(port);
	console.log('Server started on: http://localhost:' + port);


fitbitkey = '5eb133f3d5c4423582d1546f50ce3151';
fitbitsecret = '8d7e169145b543a2b29759ea4b3c498b';

//Getting data from fitbit for today's date
function getuseractivity (token) {
	console.log('called server/getuseractivity');

	var fitbitClient = require('fitbit-js')(fitbitkey, fitbitsecret);

 	fitbitClient.apiCall('GET','/user/-/activities/steps/date/today/1d.json',
    	{token: token},
    	function(err, resp, json) 
    	{
	      	if (err)  
	      	{
	      	return 0; 
	      	} 
	      	else 
	      	{
	      	console.log ('retrieved apiCall');
	      	console.log(JSON.stringify(json));
	      	return json['activities-steps'][0].value;
	      	}
  		} 
  	);
}

function getuserdata(user) {
	var data = [
    	[0,1,1,0],
    	[1,1,1,1]
    ];
    return data;

}

//Updating app data for new data of oncoming dates
 app.locals.update = function(user, interval) {
	var data;
	console.log('called app.locals.update')
	var token = {oauth_token_secret: '2a867b77ab87eae0ae30d0d2f2c22726', oauth_token: '58a74a8f3ea41c7509004b113001ba81'};
 	var steps = getuseractivity(token);
 	console.log(steps);
 	steps = false;
	// Retrieve user/ row from database

	// Retrieve new data from pedometer api
	getuseractivity(token, function(err, resp, json) {		
		console.log("api returned");
  		if (!steps) {
  			clearTimeout(timer);
  			callback(response);
  		}

  		if (err) {
  			console.log(err);
  			steps = 1;
  		} else {
  			console.log(JSON.stringify(json));
  			steps = json['activities-steps'][0].value;
  		}
	})
 }
	
	 

	
	var data; 

// Generate a random board for first time players
  if ( ! data ) {
    data = [];
    var rows = 50, columns = rows;
    }

  for(var y = 0; y < rows; y++){
      data [y] = [];
    for(var x = 0; x < columns; x++){
      data[y][x]  = (Math.round(Math.random()));
    }
  }
	
    // Create game of life with data grid
	var game = gol.createGame(data);

	// Iterate game of life
	
	setInterval(game.cycle, 200);
	var often = 3600; // Seconds per iteration
	var cycles = setInterval/often; 
	while (cycles){
		game.cycle();
		cycles--;

	}
	 data = game.grid;

	//Store data grid and update mod date

	//Return data grid 
	return data;
//}



