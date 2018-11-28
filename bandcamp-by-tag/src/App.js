import React, { Component } from 'react';
import { Input } from 'antd';

const Search = Input.Search;

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
      <Search
        placeholder="input search text"
        size="large"
        onSearch={value => console.log(value)}
        enterButton
      />
    );
  }
}

export default App;
