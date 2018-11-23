import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
        super(props);
        this.state = {
          json: ""
        };
  }

  handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ': ' + response.statusText);
    return response;
  }


  componentDidMount() {
    var albumUrl = 'https://patthebunny.bandcamp.com/album/ceschi-pat-the-bunny-split-12-and-zine';
    fetch('http://localhost:4000/albuminfo/' + albumUrl)
      .then(response => this.handleHTTPErrors(response))
      .then(response => response.text())
      .then(result => this.setState({json: result}))
      .catch(error=> {
          console.log('Fetch API Error: ' + error);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.state.json}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
