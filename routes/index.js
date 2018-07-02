'use strict';
let express = require('express');
let router = express.Router();
// variable for rpn
const rpn = require('request-promise-native');
const key = process.env.STOCK_KEY;
const bodyParser = require("body-parser");
let city = "Chicago";



// bodyParser.urlencoded(options)
// Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
// and exposes the resulting object (containing the keys and values) on req.body
bodyParser.urlencoded({
  extended: true
});
// bodyParser.json(options)
// Parses the text as JSON and exposes the resulting object on req.body.
bodyParser.json();




// create function to call api
let options = {
  url:`http://api.wunderground.com/api/${ key }/conditions/q/IL/${ city }.json`,
  headers:  {
    'User-Agent': 'Request-Promise'
  },
  json: true
};


/* GET home page. */
router.get('/', function(req, res) {
  rpn(options).then( function(results) {
    // render profile
    const observations = results.current_observation; // Prepend for Data gathering
    // Grabbing the City, Weather, Last Update, Temperature in F, Real Feel in F, Rain in Inches, Humidity, and Heat index in F for Chicago
    res.render('index', { title: observations.display_location.full, weather: observations.weather, update: observations.observation_time,
      temp: observations.temp_f, realfeel: observations.feelslike_f, humidity: observations.relative_humidity, rain: observations.precip_today_in,
      heat: observations.heat_index_f, tempc: observations.temp_c, realfeelc: observations.feelslike_c, heatc: observations.heat_index_c});
  });
});

/* POST web page */
router.post("/", function (req, res) {
  let citySelect = req.body.city;
  console.log(citySelect);

  // create function to call api
  let options = {
    url:`http://api.wunderground.com/api/${ key }/conditions/q/IL/${ citySelect }.json`,
    headers:  {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };

  rpn(options).then( function(results) {
    // render profile
    const observations = results.current_observation; // Prepend for Data gathering
    // Grabbing the City, Weather, Last Update, Temperature in F, Real Feel in F, Rain in Inches, Humidity, and Heat index in F for Chicago
    res.render('index', { title: observations.display_location.full, weather: observations.weather, update: observations.observation_time,
      temp: observations.temp_f, realfeel: observations.feelslike_f, humidity: observations.relative_humidity, rain: observations.precip_today_in,
      heat: observations.heat_index_f, tempc: observations.temp_c, realfeelc: observations.feelslike_c, heatc: observations.heat_index_c});
  });


});

module.exports = router;

// Automate calls with a limit of 4 calls, one every 15 minutes
// function intervalFunc() {
// console.log();
// }
// setInterval(intervalFunc,5000);



// console.log('Request URL value:', request_url);
// fetch(request_url)
// .then(function(conditions) {
// // Diagnostic; output the weather value
// console.log('Weather', conditions.response);
// // TODO: Insert the parts of the JSON data we want in the `template` HTML and
// // append it to the profile `<blockquote id="profile">`
// // TODO: Display the username (`login`) in case a team member has not set a profile name
// var block = document.querySelector('#display_conditions');
// var temp = document.importNode(template.content, true);
// // Set variables for ids
// var weather = temp.querySelector('#weather');
// var temp = temp.querySelector('#temp_f');
// var realfeel = temp.querySelector('#feelslike_f');
// var humidity = temp.querySelector('#humidity');
// var wind_dir = temp.querySelector('#wind_dir');
// var wind_deg = temp.querySelector('#wind_deg');
// var wind_speed = temp.querySelector('#wind_mph');
// var wind_chill = temp.querySelector('#windchill_f');
// var dew = temp.querySelector('#dew_point');
// var heat = temp.querySelector('#heat_index_f');
// var rain = temp.querySelector('#percip_today_in');
// var visibility = temp.querySelector('#visibility');
// var uv = temp.querySelector('#uv');
// var update = temp.querySelector('#last_updated');
// // Insert datapoints into template
// weather.textContent = conditions.weather;
// temp.textContent = conditions.temp_f;
// realfeel.textContent = conditions.feelslike_f;
// humidity.textContent = conditions.relative_humidity;
// wind_dir.textContent = conditions.wind_dir;
// wind_deg.textContent = conditions.wind_degrees;
// wind_speed.textContent = conditions.wind_mph;
// wind_chill.textContent = conditions.windchill_f;
// dew.textContent = conditions.dewpoint_f;
// heat.textContent = conditions.heat_index_f;
// rain.textContent = conditions.percip_today_in;
// visbility.textContent = conditions.visibility_mi;
// uv.textContent = conditions.uv;
// update.textContent = conditions.observation_time;
// // Append text
// block.appendChild(temp);
// //
// });

// router.post("/", function (req, res, next) {
// rpn(options).then( function(results) {
// // render profile
// const observations = results.current_observation; //Prepend for Data gathering
// // Grabbing the City, Weather, Last Update, Temperature in F, Real Feel in F, Rain in Inches, Humidity, and Heat index in F for Chicago
// res.render('index', { title: observations.display_location.full, weather: observations.weather, update: observations.observation_time,
// temp: observations.temp_f, realfeel: observations.feelslike_f, humidity: observations.relative_humidity, rain: observations.precip_today_in,
// heat: observations.heat_index_f, tempc: observations.temp_c, realfeelc: observations.feelslike_c, heatc: observations.heat_index_c});
// });
// });
