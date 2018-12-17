import React, { Component } from 'react';
import { Input } from 'antd';

const Search = Input.Search;

export default class SearchBar extends Component {
  onSearch(tagName) {
    window.location.replace("/tag/"+tagName);
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
 
