const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const request = require('request');
const apiKey = '5d5dd6f4d3b4a64d123e349e2e36b4c6';
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
  res.render('index', {
    weather: null,
    error: null
  });
});

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`);
});

app.post('/', function(req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  request(url, function(err, response, body) {
    if (err) {
      res.render('index', {
        weather: null,
        error: 'Error, please try again'
      });
    } else {
      let weather = JSON.parse(body);
      if (weather.main == undefined) {
        res.render('index', {
          weather: null,
          error: "Error please try again"
        });
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {
          weather: weatherText,
          error: null
        });
      }
    }
  });
});