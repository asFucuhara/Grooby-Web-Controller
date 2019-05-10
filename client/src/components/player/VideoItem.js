import React from 'react';

class VideoItem extends React.Component {
  render() {
    const {
      snippet: { thumbnails, title }
    } = this.props.video;
    console.log(this.props.video);
    return (
      <div
        onClick={() =>
          this.props.onSelected(
            encodeURIComponent(
              `https://www.youtube.com/watch?v=${this.props.video.id.videoId}`
            )
          )
        }
      >
        <img alt="a" src={thumbnails.default.url} />
        <span>{title}</span>
      </div>
    );
  }
}
//this.props.onSelected(this.props.video

export default VideoItem;
