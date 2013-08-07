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

//use default sample handler
handler.sample = undefined; 

handler.stepperimage = undefined,

//var html= new EJS({url: 'sample.ejs'}).render(data);

module.exports = handler;
