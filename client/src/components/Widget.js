import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import '../stylesheets/Widget.css';

class Widget extends Component {
  state = {
    class:"invisible"
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
  

  render() {

    return (
      <div className={"Widget "+(this.props.title ? "visible" : "invisible")}>
        <div className={"Widget-header"}>{this.props.title}</div>
        <img className="Widget-img" src={this.props.imgUrl} alt="" />
        <div className="Widget-content"></div>
      </div>
    );
  }
}

export default Widget;
