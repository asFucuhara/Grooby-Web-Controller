import React from 'react';
import axios from 'axios';

import YoutubeSearch from './YoutubeSearch';
import Player from './Player';
import MusicList from './MusicList';

class PlayerPage extends React.Component {
  state = {
    queue: ['lalal', '123'],
    guildId: ''
  };

  componentDidMount = async () => {
    const guildId = this.props.match.params.guildId;
    const queue = await axios.get(`/web/getQueue/${guildId}`).then(x => x.data);
    //get guild info and display
    this.setState({ guildId, queue });
    //todo get queue / guild info
  };

  //   getUrlParams = () => {
  //     const searchParams = new URLSearchParams(window.location.search);
  //     console.log(searchParams);
  //     return {
  //       guildId: searchParams.get('guildId') || ''
  //     };
  //   };

  render() {
    return (
      <div>
        <div>Guild = {this.state.guildId} </div>
        <div>
          <MusicList queue={this.state.queue} />
          <YoutubeSearch
            onSelectedVideo={async url => {
              const queue = await axios.get(`/web/addToQueue/${this.state.guildId}/${url}`).then(x => x.data);
              this.setState({queue});
            }}
          />
          <Player guildId={this.state.guildId} />
        </div>
      </div>
    );
  }
}

export default PlayerPage;
