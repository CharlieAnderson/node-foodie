import React, { Component } from 'react';
import '../stylesheets/SearchBar.css';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // default to chicago, can't use 0 latitude or longitude
      latitude:41.8781,
      longitude:-87.6298,
      title:"",
      imgUrl:""
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

  setPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    this.setState({latitude: latitude, longitude: longitude});
    console.log(position);
  }

  handleSubmit(event) {
    event.preventDefault();
    var query = this.refs.query.value;
    console.log("searchquery");
    console.log(query);
    event.currentTarget.value = "";
    
    fetch('/api/search/'+this.state.latitude+"/"+this.state.longitude+"/"+query)
      .then(response=>response.json())
      .then(function(json) {
        console.log("json");
        console.log(json.businesses[0]);
        console.log(json.businesses[0].id);
        return json;
      })
      .then(json => this.setState({ title: json.businesses[0].id, imgUrl: json.businesses[0].image_url}))
      .catch(function(error) {
         console.log(error);
      });
     console.log(this.state);
  }

  render() {
    return (
      <div className="SearchBar-wrapper">
        <div className="SearchBar">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input className="SearchBar-input" placeholder="What do you feel like eating?" ref="query"/>
            <button type="submit" className="SearchBar-submit">Food me</button>
          </form>
        </div>
      </div>
    );
  }

}

export default SearchBar;
