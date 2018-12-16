import React, { Component } from 'react';
import { Button } from 'antd';
import './FeelingLucky.css';

export default class FeelingLucky extends Component {
  constructor(props) {
    super(props);
    this.state = {tag: ""}
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/randomTag`)
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
      <div className="buttonStyle">
        <Button href={"/tag/"+this.state.tag} type="primary">I'm Feeling Lucky</Button>
      </div>
    );
  }
}
