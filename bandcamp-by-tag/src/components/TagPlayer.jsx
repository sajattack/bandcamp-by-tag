import React, { Component } from 'react';

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
    await fetch('http://localhost:4000/albumsWithTag/'+this.props.match.params.tag+'/'+this.state.page)
    .then(response => response.json())
      .then(result => {
        this.setState({tag_json: result});
      })
      .catch(error => {
        console.log(error);
      });
    fetch('http://localhost:4000/albuminfo/'+this.state.tag_json[this.state.album].url)
    .then(response => response.json())
      .then(result => {
        this.setState({album_json: result});
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.page !== this.state.page) {
      fetch('http://localhost:4000/albumsWithTag/'+this.props.match.params.tag+'/'+nextState.page)
      .then(response => response.json())
        .then(result => {
          this.setState({tag_json: result});
        })
        .catch(error => {
          console.log(error);
      });
    }

    if (nextState.album !== this.state.album) {
      fetch('http://localhost:4000/albuminfo/'+this.state.tag_json[nextState.album].url)
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
    console.log(this.state.album_json);
    if (this.state.album_json.raw != null) {
      return(
        <div>
          <img src={this.state.album_json.imageUrl} width="303"/>
          <div dangerouslySetInnerHTML={this.getIframe(this.state.album_json.raw.id)}/>
          <button onClick={this.onPrevButton}>Previous Album</button>
          <button onClick={this.onNextButton}>Next Album</button>
        </div>
      );
    } else {
      return "Loading..."
    }
  }
}
