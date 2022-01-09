'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const weatherData = require('./data/weather.json');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.send('Random message!');
});

app.get('/weather', (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const query = req.query.query || "Seattle";
  const cityData = weatherData.find(city => city.city_name.toLowerCase() === query.toLowerCase());
  console.log(cityData);
  const weatherArr = cityData.data.map(day => new Forcast(day));
  // console.log("Query Params: ", req.query);
  // console.log("Type: ", type);
  res.status(200).send(weatherArr);
});

app.get('*', (req, res) => {
  res.status(404).send('page not found');
});
class Forcast{
  constructor(day){
    this.date = day.valid_date;
    this.description = day.weather.description;
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
