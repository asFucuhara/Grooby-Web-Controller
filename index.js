const express = require('express');
const app = express();

require('./controllers/discord');

app.use('/web/', require('./controllers/web'));
app.use('/', (req, res) => res.send('ok'));


app.listen(5000, () => console.log('listening.......'));
