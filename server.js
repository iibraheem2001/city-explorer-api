'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const weatherData = require('./data/weather.json');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.send('Random message!')
});

app.get('/weather', (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const query = req.query.query || "Seattle";
  weatherData.find(city => city.city_name.toLocaleLowerCase() == query);
  console.log("Query Params: ", req.query);
  console.log("Type: ", type);
  res.status(200).send([type]);
})

app.get('*', (req, res) => {
  res.status(404).send('page not found');
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));