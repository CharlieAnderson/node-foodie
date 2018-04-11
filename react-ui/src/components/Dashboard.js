import React, { Component } from 'react';
import Widget from './Widget.js';
import SearchBar from './SearchBar.js';
import '../stylesheets/Dashboard.css';
import '../stylesheets/SearchBar.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {

      latitude:"37.796322",
      longitude:"-122.412521",
      title1:"",
      title2:"",
      title3:"",
      imgUrl1:"",
      imgUrl2:"",
      imgUrl3:"",
      destination1:"",
      destination2:"",
      destination3:""
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  componentDidMount() {   
   this.getLocation();
  }

  componentDidUpdate() {
  }

  getLocation() {
    if ("geolocation" in navigator) {
      /* geolocation is available */
      if (!navigator.geolocation){
        console.log('Your browser does not support geolocation...');
      }
      else{
          console.log('Your browser supports geolocation...');
          navigator.geolocation.getCurrentPosition(this.setPosition, this.errorPosition);
      }
    } 
  }

  setPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log("setposition lat long: "+latitude+" "+longitude);
    this.setState({latitude: latitude, longitude: longitude});
  }

  handleSubmit(event) {
    event.preventDefault();
    var query = this.refs.query.value;
    event.currentTarget.value = "";
    
    fetch('/api/search/'+this.state.latitude+"/"+this.state.longitude+"/"+query+" food")
      .then(response=>response.json())
      .then(function(json) {
        console.log(json);
        return json;
      })
      .then(json => this.setState({ title1: json.yelpResults.businesses[0].name, imgUrl1: json.yelpResults.businesses[0].image_url, destination1: json.yelpResults.businesses[0].coordinates,
                                    title2: json.yelpResults.businesses[1].name, imgUrl2: json.yelpResults.businesses[1].image_url, destination2: json.yelpResults.businesses[1].coordinates,
                                    title3: json.yelpResults.businesses[2].name, imgUrl3: json.yelpResults.businesses[2].image_url, destination3: json.yelpResults.businesses[2].coordinates,}))
      .catch(function(error) {
         console.log(error);
      })
  }

  render() {
    return (
      <div className="Dashboard">
          <div className="Dashboard-header">
            <div className="SearchBar">
              <form onSubmit={this.handleSubmit.bind(this)}>
                <input className="SearchBar-input" placeholder="What do you feel like eating?" ref="query"/>
                <button type="submit" className="SearchBar-submit">Food me</button>
              </form>
            </div>
          </div>
          <div className="Dashboard-content">
            <Widget id="widget1" title={this.state.title1} imgUrl={this.state.imgUrl1}> latitude={this.state.latitude} longitude={this.state.longitude} destination={this.state.destination1} </Widget>
            <Widget id="widget2" title={this.state.title2} imgUrl={this.state.imgUrl2}> latitude={this.state.latitude} longitude={this.state.longitude} destination={this.state.destination2} </Widget>
            <Widget id="widget3" title={this.state.title3} imgUrl={this.state.imgUrl3}> latitude={this.state.latitude} longitude={this.state.longitude} destination={this.state.destination3} </Widget>
          </div>
      </div>
    );
  }
}

export default Dashboard;
