import React, { Component } from 'react';
import TagCloud from './TagCloud';
import FeelingLucky from './FeelingLucky';
import SearchBar from './SearchBar';

export default class TagSelect extends Component {
  render() {
    return (
      <div>
        <SearchBar/>
        <TagCloud/>
        <FeelingLucky/>
      </div>
    );
  }
}
