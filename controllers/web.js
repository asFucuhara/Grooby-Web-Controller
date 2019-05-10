const express = require('express');
const router = express.Router();
const {
  play,
  pause,
  next,
  rewind,
  getQueue,
  addToQueue
} = require('../services/player');

router.get('/play/:guildId', (req, res) => {
  const { guildId } = req.params;
  play(guildId);
  res.send('ok');
});

router.get('/pause/:guildId', (req, res) => {
  const { guildId } = req.params;
  pause(guildId);
  res.send('ok');
});

router.get('/next/:guildId', (req, res) => {
  const { guildId } = req.params;
  next(guildId); //maybe change next to skip to stop confusion with express
  res.send('ok');
});

router.get('/rewind/:guildId', (req, res) => {
  const { guildId } = req.params;
  rewind(guildId);
  res.send('ok');
});

router.get('/getQueue/:guildId', (req, res) => {
  const { guildId } = req.params;
  res.send(getQueue(guildId));
});

router.get('/addToQueue/:guildId/:url', (req, res) => {
  const { guildId, url } = req.params;
  console.log('ok');
  addToQueue(guildId, url);
  res.send(getQueue(guildId));
});

module.exports = router;
