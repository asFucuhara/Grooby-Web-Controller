import React from 'react';
import axios from 'axios';

const Player = (props) => {
  const play = () => {
    axios.get(`/web/play/${props.guildId}`).then(console.log);
  };

  const pause = () => {
    axios.get(`/web/pause/${props.guildId}`).then(console.log);
  };

  const next = () => {
    axios.get(`/web/next/${props.guildId}`).then(console.log);
  };
  return (
    <div>
      <div onClick={play}>play</div>
      <div onClick={pause}>pause</div>
      <div onClick={next}>next</div>
    </div>
  );
};

export default Player;
