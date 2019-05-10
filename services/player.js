const { GOOGLE_API_KEY } = require('../config/keys');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const serverList = new Map(); //todo: maybe put this map on reids
// id: msg.guild.id = {//i think its discord server id
//   guildObj: guild
//   textChannel: msg.channel,
//   voiceChannel: voiceChannel,
//   connection: null,
//   songs: [{ // for now equals to url only (not obj)
//       youtubeId: video.id,
//       url: `https://www.youtube.com/watch?v=${video.id}`
//     }],
//   volume: 5,
//   playing: false
// };

//for web application force user to do a command like -web that forces the creation of his entry on serverList
const generateServer = guild => {
  //check if server exists on list if not create a new entry return serve
  const guildId = guild.id || guild;
  if (!serverList.get(guildId)) {
    console.log('creating new entry in serverList');
    serverList.set(guildId, {
      //guildObj: guild,
      //textChannel: msg.channel, maybe implement later, focus on the web experience
      voiceChannel: null,
      connection: null,
      songs: [],
      volume: 5,
      paused: false
    });
  } else {
    serverList.get(guildId).guildObj = guild;
  }

  return serverList.get(guildId);
};

const play = async guild => {
  //use after using pause and to start if queue is not null

  const guildId = guild.id || guild;
  const server = generateServer(guild);

  if (server.paused) {
    server.connection.dispatcher.resume();
    server.paused = false;
    console.log('resume');
    return;
  }

  const song = server.songs[0];
  if (!song) {
    //serverQueue.voiceChannel.leave();
    //queue.delete(guild.id);
    return console.log('ran out of songs');
  }

  try {
    const dispatcher = server.connection
      .playStream(ytdl(song))
      .on('end', reason => {
        if (reason === 'Stream is not generating quickly enough.')
          console.log('Song ended.');
        server.songs.shift();
        play(guild);
      })
      .on('error', error => console.error(error));
      console.log('a');

    dispatcher.setVolumeLogarithmic(server.volume / 5);
  } catch (error) {
    console.error(error);
    return;
  }
};

const addToQueue = (guildId, songUrl) => {
  //song = song url ** playlist url and song string(africa toto) should be treated in discord
  const server = serverList.get(guildId);
  

  server.songs.push(songUrl);
  if (server.songs.length <= 1) play(guildId);
};

const next = guildId => {
  const server = serverList.get(guildId);
  if (!server) return console.log('Cannot skip song');
  //by ending the dispatcher triggers .on('end') and start next song
  server.connection.dispatcher.end('command: next');
};

const pause = guildId => {
  const server = generateServer(guildId);
  if (!server.paused) {
    server.paused = true;
    server.connection.dispatcher.pause();
    console.log('paused')
  }
};

const rewind = guildId => {};//todo after

const getQueue = guildId => {
  const server = serverList.get(guildId);
  return server.songs;
};

const changeVoiceChannel = async (guild, voiceChannel) => {
  const server = generateServer(guild.id);
  listChannels(guild);
  try {
    var connection = await voiceChannel.join();
    server.connection = connection;
  } catch (error) {
    console.error(`I could not join the voice channel: ${error}`);
    throw error;
  }
};

const listChannels = guild => {
  //console.log('list', guild.channels);
};

module.exports = {
  play,
  changeVoiceChannel,
  pause,
  next,
  rewind,
  getQueue,
  addToQueue
};
