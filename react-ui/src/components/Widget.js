import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import '../stylesheets/Widget.css';

class Widget extends Component {
  state = {
    class:"invisible",
    destination:"",
    latitude:"",
    longitude:""
  };

  componentDidMount() {
    console.log("widget title");
    console.log(this.props.title);
    if(this.props.title!==undefined)
      this.setState({class: 'visible'});
  }

  componentDidUpdate (prevProps, prevState) {
    console.log("widget props:");
    console.log(this.props.imgUrl);
    console.log(this.props.title);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);

    this.setState({ destination: nextProps.children[5], latitude: nextProps.children[1], longitude: nextProps.children[3] });  
  }
  

  render() {
    console.log("widhet lat"+this.state.latitude);
    return (
      <div  className={"Widget "+(this.props.title ? "visible" : "invisible")}>
        <div className={"Widget-header"}>{this.props.title}</div>
        <img id={this.props.id} className="Widget-img" src={this.props.imgUrl} alt="" />
        <div className="Widget-content">
          <iframe className="Widget-map" frameborder="0" src={"https://www.google.com/maps/embed/v1/directions?origin="+this.state.latitude+","+this.state.longitude+"&destination="+this.state.destination.latitude+","+this.state.destination.longitude+"&key=AIzaSyCXnel1Bl4CS_Vbrj7s2DEBK4n9AhRErwk&mode=walking"} allowfullscreen=""></iframe>
        </div>
      </div>
    );
  }
}

export default Widget;
