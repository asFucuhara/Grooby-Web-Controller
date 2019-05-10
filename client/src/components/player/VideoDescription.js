import React from "react";

class VideoDescription extends React.Component {
  constructor() {
    super();

    this.state = {
      video: {}
    };

    this.ref = React.createRef();
  }

  render() {
    const {
      id: { videoId }
    } = this.props.selectedVideo;

    return (
      <div>
        <iframe
          title="a"
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
        />
      </div>
    );
  }
}

export default VideoDescription;
