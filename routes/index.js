var express = require('express');
var router = express.Router();
//variable for rpn
const rpn = require('request-promise-native');

//create function to call api
const options = {
  url:"http://api.wunderground.com/api/cf0c3a866fbf51c3/conditions/q/IL/Chicago.json",
  headers:  {
    'User-Agent': 'Request-Promise'
  },
  json: true
};

/* GET home page. */
router.get('/', function(req, res, next) {
  rpn(options).then( function(results) {
    //render profile
    res.render('index', { title: 'Weather Conditions in Chicago', weather: results.current_observation.weather, update: results.current_observation.observation_time });
});
  });


module.exports = router;


/*
console.log('Request URL value:', request_url);


    fetch(request_url)
      .then(function(conditions) {
        // Diagnostic; output the weather value
        console.log('Weather', conditions.response);

        // TODO: Insert the parts of the JSON data we want in the `template` HTML and
        // append it to the profile `<blockquote id="profile">`
        // TODO: Display the username (`login`) in case a team member has not set a profile name
        var block = document.querySelector('#display_conditions');
        var temp = document.importNode(template.content, true);
        // Set variables for ids
        var weather = temp.querySelector('#weather');
        var temp = temp.querySelector('#temp_f');
        var realfeel = temp.querySelector('#feelslike_f');
        var humidity = temp.querySelector('#humidity');
        var wind_dir = temp.querySelector('#wind_dir');
        var wind_deg = temp.querySelector('#wind_deg');
        var wind_speed = temp.querySelector('#wind_mph');
        var wind_chill = temp.querySelector('#windchill_f');
        var dew = temp.querySelector('#dew_point');
        var heat = temp.querySelector('#heat_index_f');
        var rain = temp.querySelector('#percip_today_in');
        var visibility = temp.querySelector('#visibility');
        var uv = temp.querySelector('#uv');
        var update = temp.querySelector('#last_updated');

        // Insert datapoints into template
        weather.textContent = conditions.weather;
        temp.textContent = conditions.temp_f;
        realfeel.textContent = conditions.feelslike_f;
        humidity.textContent = conditions.relative_humidity;
        wind_dir.textContent = conditions.wind_dir;
        wind_deg.textContent = conditions.wind_degrees;
        wind_speed.textContent = conditions.wind_mph;
        wind_chill.textContent = conditions.windchill_f;
        dew.textContent = conditions.dewpoint_f;
        heat.textContent = conditions.heat_index_f;
        rain.textContent = conditions.percip_today_in;
        visbility.textContent = conditions.visibility_mi;
        uv.textContent = conditions.uv;
        update.textContent = conditions.observation_time;
        // Append text
        block.appendChild(temp);

        //
      });
      */
