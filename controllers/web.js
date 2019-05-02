const express = require('express');
const router = express.Router();
const { play, pause, next, rewind, getQueue, addToQueue } = require('../services/player');

router.get('/:guildId/play', (req, res) => {
    const {guildId} = req.params;
    play(guildId);
    res.send('ok');
});

router.get('/:guildId/pause', (req, res) => {
    const {guildId} = req.params;
    pause(guildId)
    res.send('ok');
});

router.get('/:guildId/next', (req, res) => {
    const {guildId} = req.params;
    next(guildId);//maybe change next to skip to stop confusion with express
    res.send('ok');
});

router.get('/:guildId/rewind', (req, res) => {
    const {guildId} = req.params;
    rewind(guildId);
    res.send('ok');
});

router.get('/:guildId/getQueue', (req, res) => {
    const {guildId} = req.params;
    getQueue(guildId);
    res.send('ok');
});

router.get('/:guildId/addToQueue/:url', (req, res) => {
    const {guildId, url} = req.params;
    addToQueue(guildId, url);
    res.send('ok');
});

module.exports = router;
