import React, { Component } from 'react';
import { Input } from 'antd';

const Search = Input.Search;

export default class SearchBar extends Component {
  onSearch(tagName) {
    fetch('http://localhost:4000/albumsWithTag/' + tagName + '/' + 1)
      .then(response => this.handleHTTPErrors(response))
      .then(response => response.json())
      .then(result => {
        
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ': ' + response.statusText);
    return response;
  }

  render() {
    return (
        <Search
          placeholder=""
          size="large"
          onSearch={value => this.onSearch(value)}
          enterButton
        />
      );
  }
}
 
