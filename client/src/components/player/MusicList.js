import React from 'react';
import MusicItem from './MusicItem';

const MusicList = props => {
  return (
    <div>
      {props.queue.map(music => (
        <MusicItem music={music} />
      ))}
    </div>
  );
};

export default MusicList;
