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

app.get ("/api/:data?", (req,res) => {
  const {data} = req.params

  if(data == null){
    let time = parseInt(Date.now());
    res.json({ "unix" : time, "utc": new Date(time).toUTCString()});
    return
  }
  
  if(Date.parse(data)){
    const time = Date.parse(data);
    res.json({ unix: time, utc: new Date(time).toUTCString()});
    return
  }else{
    let intTime = parseInt(data);
    let newTime = new Date(intTime).toUTCString();
    if (newTime == 'Invalid Date' || intTime / 1000 > 2147483647 ) {
      res.json({ error: "Invalid Date" });
      return;
    }
    res.json({ unix: intTime, utc: new Date(intTime).toUTCString() });
    return;
  }
  

})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
