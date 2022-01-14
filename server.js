'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());

const weatherHandler = require('./handlers/weather.js');
const movieHandler = require('./handlers/movies.js');

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.send('Your Server Is Running, Jennay!');
});

app.get('/weather', weatherHandler.getWeather);

app.get('/movies', movieHandler.getMovie);



app.get('*', (req, res) => {
  res.status(404).send('page not found');
});



app.listen(PORT, () => console.log(`listening on ${PORT}`));
