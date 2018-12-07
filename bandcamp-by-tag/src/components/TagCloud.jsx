import React, { Component } from 'react';
import './TagCloud.css'

export default class TagCloud extends Component {
  constructor(props) {
        super(props);
        this.state = {tags: []}
  }

  componentDidMount() {
    fetch('http://localhost:4000/randomTag/100')
      .then(response => this.handleHTTPErrors(response))
      .then(response => response.json())
      .then(result => {
        this.setState(result);
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
      <div className="linkStyle">
        {this.state.tags.map(tag =>
        <a href={"/tag/"+tag}>{tag} </a>
        )}
      </div>
    )
  }
}
