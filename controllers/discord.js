const { Client, Util } = require('discord.js');
const { TOKEN, PREFIX } = require('../config/keys');
const { play, changeVoiceChannel } = require('../services/player');

//this file is responsible for receiving commands from discord messages

const client = new Client({ disableEveryone: true });

client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => console.log('Yo this ready!'));

client.on('disconnect', () =>
  console.log(
    'I just disconnected, making sure you know, I will reconnect now...'
  )
);

client.on('reconnecting', () => console.log('I am reconnecting now!'));

//bot receive commands from discord
client.on('message', async msg => {
  //filter for non command msg
  if (msg.author.bot) return undefined;
  if (!msg.content.startsWith(PREFIX)) return undefined;

  const args = msg.content.split(' ');
  const searchString = args.slice(1).join(' ');
  const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
  let command = msg.content.toLowerCase().split(' ')[0];
  command = command.slice(PREFIX.length);

  const voiceChannel = msg.member.voiceChannel;

  //maybe it´s gonna be like web controller switch case, in that case unite bots
  switch (command) {
    case 'play':
      await changeVoiceChannel(msg.guild, voiceChannel);
      play(msg.guild, url);
      break;
    case 'next':
    case 'skip':
      break;
    case 'pause':
    case 'stop':
      break;
    case 'web':
      //generate url for website controller
      changeVoiceChannel(msg.guild, voiceChannel);
      msg.channel.send(`https://localhost:3000/${msg.guild.id}`);
    default:
  }
});

client.login(TOKEN);
