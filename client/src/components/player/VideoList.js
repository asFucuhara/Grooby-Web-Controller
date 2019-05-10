import React from "react";
import VideoItem from "./VideoItem";

class VideoList extends React.Component {
  render() {
    return (
      <div className="videoList">
        {this.props.videos.map(video => (
          <VideoItem key={video.id.videoId} onSelected={this.props.onSelected} video={video}/>
        ))}
      </div>
    );
  }
}

export default VideoList;
