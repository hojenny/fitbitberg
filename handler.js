var handler = { };


// change this meta for your publication
handler.meta = {
  "owner_email":"jenny@houseoflaudanum.com",
  "publication_api_version":"1.0",
  "name": "Example Node.js Server",
  "description": "Example publication for Little Printer",
  "delivered_on":"every day",
  "external_configuration": false,
  "send_timezone_info": true,
  "send_delivery_count": true,
},
 //use default edition handler
handler.edition = undefined;
handler.userdata=[[]];

//use default sample handler
handler.sample = function(done) {
  var e = null;
  var obj = {};
  obj.view = null;

  var data = this.userdata(null);

 
  // 	var data= arg1;
 	// var arg1= function(res){
  // 	var steps = math.random(x);
  	
  // 	res.json;
  // }

  // var args= Array.
  //need to connect to gameoflife.js

  obj.meta = {
    data: data,
    user: 'Jenny',
    foo: 'bar'
  };
  done(e, obj);
}


handler.stepperimage = undefined,

module.exports = handler;
