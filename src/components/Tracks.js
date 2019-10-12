import React, { Component } from 'react';

class Tracks extends Component {

  state = { playing: false, audio: null, playingPreviewUrl: null };

  /*This is the helper function called PlayerAudio, it takes the parmeter
  * previewUrl
  */
  playAudio = previewUrl => () => { // This is so it calls the function itself for better practs it calls the refernce to the function
    const audio = new Audio(previewUrl); //Audio is a global audio class, Passing in the previewUrl

    if (!this.state.playing) {
      audio.play();
      this.setState({ playing: true, audio, playingPreviewUrl: previewUrl });
    } else {
      this.state.audio.pause();
      if (this.state.playingPreviewUrl === previewUrl) {
        this.setState({ playing: false });
      } else {
        audio.play();
        this.setState({ audio, playingPreviewUrl: previewUrl });
      }
    }
  }

  render() {
    const { tracks } = this.props

    return (
      <div>
        {
          tracks.map(track => {
            const { id, name, album, preview_url } = track;
            return (
              <div key={id} onClick={this.playAudio(preview_url)}>
                <img src={album.images[0].url} alt='track-image' />
                <p>{name}</p>
              </div>
            )
          })
        }

      </div >

    )
  }
}

export default Tracks;