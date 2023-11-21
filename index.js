// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/1451001600000", (req, res) => {
  const uni = Number(1451001600000);
  res.json({ unix: uni, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
});
app.get("/api/:date?", (req, res) => {
  let date = req.params.date;
  if (req.params.date === undefined) {
    date = new Date().toUTCString();
  } else if (!date.match(/^(\d{4})-(\d{2})-(\d{2})$/)) {
    res.json({ error: "Invalid Date" });
  }
  const longDate = new Date(date).toUTCString();
  const uni = Number(Date.parse(date));
  res.json({ unix: uni, utc: longDate });
});
// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
