var express = require('express'),
    handler = require('./handler.js'),
    littleprinter = require('littleprinter'),
    gol = require('./gameoflife.js');


var app = express();
var port = process.env.PORT || 5000;
app.set('views');
app.set('view engine', 'ejs', 'html'); // in this example I am using ejs, feel free to use a different view engine if you wish


littleprinter.setup(app, handler);

app.listen(port);
console.log('Server started on: http://localhost:' + port);

app.locals.update = function(user, interval) {
	var data;
	// Retrieve user/ row from database

	// Retrieve new data from pedometer api

	// Update data grid with pedometer data


	// Generate a random board for first time players
	if ( ! data ) {
		data = [];
		var rows = 50, columns = rows;
    }

	for(var y = 0; y < rows; y++){
		data[y] = []
		for(var x = 0; x < columns; x++){
			data[y][x] = Math.round(Math.random());
		}
	}

	// Create game of life with data grid
	var game = gol.createGame(data);



	// Iterate game of life
	//setInterval(game.cycle, 200);
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
