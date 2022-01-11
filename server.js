'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.send('Random message!');
});

app.get('/weather', getWeather);

async function getWeather(request, response) {
  const lat = request.query.lat;
  const lon = request.query.lon;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;

  const weatherResponse = await axios.get(url);
  const weatherArr = weatherResponse.data.results.map(forecast => new Forecast(forecast));
  // console.log(cityData);
  // const weatherArr = cityData.data.map(day => new Forcast(day));
  // console.log("Query Params: ", request.query);
  // console.log("Type: ", type);
  response.status(200).send(weatherArr);
};

app.get('*', (req, res) => {
  res.status(404).send('page not found');
});
class Forecast {
  constructor(day) {
    this.lat = day.lat
    this.lon = day.lon
    this.date = day.valid_date;
    this.description = day.weather.description;
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
