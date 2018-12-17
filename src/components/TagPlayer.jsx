import React, { Component } from 'react';
import './TagPlayer.css';

export default class TagPlayer extends Component {
  constructor(props) {
        super(props);
        this.onNextButton = this.onNextButton.bind(this);
        this.onPrevButton = this.onPrevButton.bind(this);
        this.state = {
          tag_json: {},
          album_json: {},
          page: 1,
          album: 0,
        };
  }

  async componentDidMount() {
    await fetch(`${process.env.REACT_APP_API_URL}/albumsWithTag/`+this.props.match.params.tag+'/'+this.state.page)
    .then(response => response.json())
      .then(result => {
        this.setState({tag_json: result});
      })
      .catch(error => {
        console.log(error);
      });
    if (this.state.tag_json.length !== 0) {
      console.log(this.state.tag_json);
      fetch(`${process.env.REACT_APP_API_URL}/albuminfo/`+this.state.tag_json[this.state.album].url)
      .then(response => response.json())
        .then(result => {
          this.setState({album_json: result});
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.page !== this.state.page) {
      fetch(`${process.env.REACT_APP_API_URL}/albumsWithTag/`+this.props.match.params.tag+'/'+nextState.page)
      .then(response => response.json())
        .then(result => {
          this.setState({tag_json: result});
        })
        .catch(error => {
          console.log(error);
      });
    }

    if (nextState.album !== this.state.album
      && this.state.tag_json[nextState.album] !== undefined) {
      console.log(this.state.tag_json[nextState.album]);
      fetch(`${process.env.REACT_APP_API_URL}/albuminfo/`+this.state.tag_json[nextState.album].url)
      .then(response => response.json())
        .then(result => {
          this.setState({album_json: result});
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ': ' + response.statusText);
    return response;
  }

  getIframe(albumid) {
    return {__html: '<iframe style={{border: 0, width: 100%, height: 120px}} src="https://bandcamp.com/EmbeddedPlayer/album='+albumid+'/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=none/transparent=true/" seamless></iframe>'}
  }

  onNextButton(event) {
    if (this.state.album > this.state.tag_json.length) {
      let nextPage = this.state.page+1;
      this.setState({page: nextPage});    
    } else {
      let nextAlbum = this.state.album+1;
      this.setState({album: nextAlbum});
    }
  }

  onPrevButton(event) {
    if (this.state.album <= 0) {
       this.setState({album: 0});
      if (this.state.page > 0) {
        let prevPage = this.state.page-1;
        this.setState({page: prevPage});
      }
    } else {
      let prevAlbum = this.state.album-1;
      this.setState({album: prevAlbum});
    }
  }

  render() {
    if (this.state.tag_json.length===0) {
      return (
        <div>
          Tag not found<br/>
          <a href="/">Return to Home Page</a>
        </div>
      );
    }
    if (this.state.album_json.raw != null) {
      return(
        <div class="playerStyle">
          <img src={this.state.album_json.imageUrl} width="303"/>
          <div dangerouslySetInnerHTML={this.getIframe(this.state.album_json.raw.id)}/>
          <button id="prevButton" onClick={this.onPrevButton}>Previous Album</button>
          <button id="nextButton" onClick={this.onNextButton}>Next Album</button>
        </div>
      );
    } else {
      return "Loading...";
    }
  }
}
