import React, { Component } from 'react';
import TagCloud from './TagCloud';
import FeelingLucky from './FeelingLucky';
import SearchBar from './SearchBar';

const TagSelect = (props) => 
      <div>
        <h1>Select or enter a tag</h1>
        <SearchBar/>
        <TagCloud/>
        <FeelingLucky/>
      </div>

export default TagSelect;
