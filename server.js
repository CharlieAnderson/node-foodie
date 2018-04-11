const express = require('express');
const fetch = require('node-fetch')
const app = express();
const port = process.env.PORT || 8000;
const search = require('./search.js'); 
require('dotenv').config();
const yelpKey = process.env.YELP_API_KEY;
const googlePlacesKey = process.env.GOOGLE_PLACES_API_KEY;
const googleMapsKey = process.env.GOOGLE_MAPS_EMBED_KEY;
const bodyParser = require('body-parser');
const yelpSearch = "https://api.yelp.com/v3/businesses/search?";
const googlePlacesSearch = "https://maps.googleapis.com/maps/api/place/textsearch/json?&key="+googlePlacesKey;
const googleMapsSearch = "https://www.google.com/maps/embed/v1/directions?key="+googleMapsKey;

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

if (process.env.NODE_ENV === 'production') {
}

app.use(express.static('react-ui/build'));


app.get('/api/search/:latitude/:longitude/:query', (req, res) => {
  var query = "term="+req.params.query;
  var latitude = "latitude="+req.params.latitude+"&";
  var longitude = "longitude="+req.params.longitude+"&";
  console.log(latitude);
  console.log(longitude);
  var googlePlacesUrl =  googlePlacesSearch + "&query="+req.params.query+"&location="+req.params.latitude+","+req.params.longitude+"&radius=1600";
  var googlePlacesResults = search.googleSearch(googlePlacesUrl).then(function(results) {
    return results;
  })

  var yelpResults = search.yelpSearch(yelpKey, yelpSearch+latitude+longitude+query).then(function(results) {
    return results;
  })

  var combinedData = {"googlePlacesResults":{},"yelpResults":{}};
  Promise.all([googlePlacesResults,yelpResults]).then(function(values){
      combinedData["googlePlacesResults"] = values[0];
      combinedData["yelpResults"] = values[1];
      res.json(combinedData); 
      return combinedData;
  });
});

app.get('/api/:search', (req, res) => {
  var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  
  var fileName = req.params.search;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));