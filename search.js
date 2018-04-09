'use strict';

const fetch = require('node-fetch');

var yelpSearch = function(apiKey, url) {
  return fetch( url,   
    { method: 'GET',
      headers: { 'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+apiKey},
  })
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    }) 
    .then(json => {
      //  console.log(json);
      return json;
    })
    .catch(error => {
      console.log(error);
    });
}

var googleSearch = function(url) {
  return fetch( url,   
    { method: 'GET',
      headers: { 'Content-Type': 'application/json'},
  })
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    }) 
    .then(json => {
     // console.log(json);
      return json;
    })
    .catch(error => {
      console.log(error);
    });
  }

module.exports = {
  yelpSearch: yelpSearch,
  googleSearch: googleSearch,

};