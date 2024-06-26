// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:year-:month-:day", function(req,res){
  var year = req.params.year;
  var month = req.params.month;
  var day = req.params.day;
  const date = new Date(year+"-"+month+"-"+day).toUTCString();
  const unixDate = Date.parse(date);

  if(date==="Invalid Date")
    { error : "Invalid Date" }
  else
    res.json({"unix":unixDate, "utc":date})
  
});

app.get("/api/:date?", function(req,res){
  var unixDate = req.params.date;

  if(!unixDate)
  {
    var dateNow = new Date();
    var utcNow = dateNow.toUTCString();
    var unixNox = Date.parse(dateNow);
    res.json({"unix":unixNox,"utc":utcNow});
  }
  else
  {

    if (!isNaN(unixDate)) {
      //it's a number
      unixDate=unixDate*1;
    }


  var date = new Date(unixDate).toUTCString();
  if(date==="Invalid Date")
    { error : "Invalid Date" }
  else
    res.json({"unix":unixDate, "utc":date})
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
