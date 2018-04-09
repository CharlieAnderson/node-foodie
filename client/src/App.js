import React, { Component } from 'react';
import logo from './donut1.svg';
import './stylesheets/App.css';
import Dashboard from './components/Dashboard.js';

class App extends Component {
  state = {
    title: '',
    imgUrl: ''
  };

  componentDidMount() {
  }

  postQuery = async () => {
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to Foodie</h1>
        <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Dashboard title={this.state.title} imgUrl={this.state.imgUrl}/>
      </div>
    );
  }
}

export default App;
