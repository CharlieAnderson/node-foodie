import React, { Component } from 'react';
import Widget from './Widget.js';
import SearchBar from './SearchBar.js';
import '../stylesheets/Dashboard.css';
import '../stylesheets/SearchBar.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // default to chicago, can't use 0 latitude or longitude
      latitude:41.8781,
      longitude:-87.6298,
      title1:"",
      title2:"",
      title3:"",
      imgUrl1:"",
      imgUrl2:"",
      imgUrl3:"",
      categories1:"",
      categories2:"",
      categories3:"",

    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setPosition = this.setPosition.bind(this);
  }

  componentDidMount() {   
    if ("geolocation" in navigator) {
      /* geolocation is available */
      if (!navigator.geolocation){
        console.log('Your browser does not support geolocation...');
      }
      else{
          navigator.geolocation.getCurrentPosition(this.setPosition, this.errorPosition);
      }
    } 
  }

  componentDidUpdate() {
    console.log(this.state.categories1);
  }

  setPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    this.setState({latitude: latitude, longitude: longitude});
  }

  handleSubmit(event) {
    event.preventDefault();
    var query = this.refs.query.value;
    event.currentTarget.value = "";
    
    fetch('/api/search/'+this.state.latitude+"/"+this.state.longitude+"/"+query+" food")
      .then(response=>response.json())
      .then(function(json) {
        return json;
      })
      .then(json => this.setState({ title1: json.businesses[0].name, imgUrl1: json.businesses[0].image_url,
                                    title2: json.businesses[1].name, imgUrl2: json.businesses[1].image_url,
                                    title3: json.businesses[2].name, imgUrl3: json.businesses[2].image_url,
                                  categories1:json.businesses[0].categories}))
      .catch(function(error) {
         console.log(error);
      });
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
            
            <Widget title={this.state.title1} imgUrl={this.state.imgUrl1}> </Widget>
            <Widget title={this.state.title2} imgUrl={this.state.imgUrl2}> </Widget>
            <Widget title={this.state.title3} imgUrl={this.state.imgUrl3}> </Widget>
          </div>
      </div>
    );
  }
}

export default Dashboard;
