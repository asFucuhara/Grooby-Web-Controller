import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import VideoList from './VideoList';

const youtube = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    type: 'video',
    key: 'AIzaSyBvAPWUe_7uLR-X89bknKEENLT1kdaMYIY',
    videoEmbeddable: true
  }
});

class YoutubeSearch extends React.Component {
  state = {
    searchText: 'music',
    videos: []
  };

  search = async () => {
    await youtube
      .get('/search', {
        params: {
          q: this.state.searchText
        }
      })
      .then(a => this.setState({ videos: a.data.items }));
  };

  setStateSearchText = async text => {
    await this.setState({ searchText: text });
    await this.search();
  };

  componentDidMount = async () => {
    await this.search();
  };

  render() {
    return (
      <div>
        <SearchBar onSubmit={this.setStateSearchText} />
        <VideoList
          videos={this.state.videos}
          onSelected={this.props.onSelectedVideo}
        />
      </div>
    );
  }
}

export default YoutubeSearch;
