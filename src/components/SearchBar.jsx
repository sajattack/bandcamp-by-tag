import React, { Component } from 'react';
import { Input } from 'antd';

const Search = Input.Search;

export default class SearchBar extends Component {
  onSearch(tagName) {
    fetch(`${process.env.REACT_APP_API_URL}/albumsWithTag/` + tagName + '/' + 1)
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
          placeholder="Enter a bandcamp tag"
          size="large"
          onSearch={value => this.onSearch(value)}
          enterButton
        />
      );
  }
}
 
