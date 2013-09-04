var express = require('express'),
    handler = require('./handler.js'),
    littleprinter = require('littleprinter'),
    gol = require('./gameoflife.js');
 //   fitbit =require('./node_modules/fitbit-js/example/test.js');


var app = express();
var port = process.env.PORT || 5000;
app.set('views');
app.set('view engine', 'ejs', 'html'); // in this example I am using ejs, feel free to use a different view engine if you wish

//Installing date
	littleprinter.setup(app, handler);
	app.listen(port);
	console.log('Server started on: http://localhost:' + port);


fitbitkey = '5eb133f3d5c4423582d1546f50ce3151';
fitbitsecret = '8d7e169145b543a2b29759ea4b3c498b';

var steps = false;

function getuseractivity (token, callback) {
	console.log('called server/getuseractivity');

	var fitbitClient = require('fitbit-js')(fitbitkey, fitbitsecret);

 	fitbitClient.apiCall(
 		'GET', 
 		'/user/-/activities/steps/date/today/1d.json',
    	{ token: token },
    	callback
  	);
  	console.log("Kicked off api call");
  	return;
}


app.locals.update = function(user, interval, callback) {
	var data;
	console.log('called app.locals.update')
	var token = {oauth_token_secret: '2a867b77ab87eae0ae30d0d2f2c22726', oauth_token: '58a74a8f3ea41c7509004b113001ba81'};
	
	steps = false;
	var timer = setTimeout(function() {

		callback('it timed out!');
		steps= true;
	}, 10000);

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
  			console.log(JSON.stringify(json))
  			steps = json['activities-steps'][0].value;
  		}
	})
	};

	
		// console.log(steps);
		setTimeout(
		(function() {
				console.log('waiting...');
		}), 1000);
	

	console.log(steps);
	
	// Retrieve user/ row from database

	// Retrieve new data from pedometer api

	//I added this text//

/*function loadScript(url, callback)
{
   // adding the script tag to the head as suggested before
   var head = document.getElementsByTagName('head')[0];
   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = "/Users/JennyHo/node-littleprinter-final/node_modules/fitbit-js/example/test.js";

   // then bind the event to the callback function 
   // there are several events for cross browser compatibility
  script.onreadystatechange = callback;   
  script.onload = callback;

   // fire the loading
  head.appendChild(script);
}
	//added text ends here//

	// Update data grid with pedometer data

//	function gol.callback{
//		$('#dg').datagrid({
    	url:'/user/-/activities/steps/date/today/1d.json',
    	this.cycle = function(){
		var dying = [], born = []
		grid.forEach(function(row, rowIndex) {
			row.forEach(function(cell, cellIndex) {
				var neighbors = getNeighbors(rowIndex, cellIndex)
				var sum = neighbors.reduce(function(sum,coord){
					return getCell(coord) + sum
				}, 0)
				if (sum < 2 || sum > 3) {
					dying.push([rowIndex,cellIndex])
				} else if(sum == 3 && cell ==0){
					born.push([rowIndex, cellIndex])
				}
					
			});
		});
	}
    
    $('#dg').datagrid('reload'); 
	});
		
		

 */
	// Generate a random board for first time players
	if ( ! data ) {
		data = [];
		var rows = 50, columns = rows;
    }

	for(var y = 0; y < rows; y++){
		data[y] = [];
		for(var x = 0; x < columns; x++){
			data[y][x]  = (Math.round(Math.random()));
		}
	}

	// Create game of life with data grid
	var game = gol.createGame(data);



	// Iterate game of life
	
	var often = 3600; // Seconds per iteration
	var cycles = interval ? interval/often : 240;
	while (cycles) {
		game.cycle();
		cycles--;
	}
	data = game.grid;

	// Store data grid and update mod date

	// Return data grid 
	return data;
}



