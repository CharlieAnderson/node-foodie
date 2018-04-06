const express = require('express');
const fetch = require('node-fetch')
const app = express();
const port = process.env.PORT || 8000;
const search = require('./search.js'); 
require('dotenv').config();
const apiKey = process.env.YELP_API_KEY;
const bodyParser = require('body-parser');
const yelpSearch = "https://api.yelp.com/v3/businesses/search?";

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/api/search/:latitude/:longitude/:query', (req, res) => {
  var query = "term="+req.params.query;
  console.log(query);
  var latitude = "latitude="+req.params.latitude+"&";
  var longitude = "longitude="+req.params.longitude+"&";

  search.mySearch(apiKey, yelpSearch+latitude+longitude+query).then(function(results) {
    res.json(results);
  })
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