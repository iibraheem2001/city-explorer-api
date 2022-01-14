'use strict'

const axios = require('axios');
const Forecast = require('../classes/Forecast.js');

async function getWeather(request, response) {
  const lat = request.query.lat;
  const lon = request.query.lon;

  try {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=5`;

    const weatherResponse = await axios.get(url);
    console.log(weatherResponse.data);
    const weatherArr = weatherResponse.data.data.map(day => new Forecast(day));
    response.status(200).send(weatherArr);
  } catch (error) {
    handleError(error, response);
  }
}

function handleError(error, response) {
  console.log(error);
  response.status(500).send('something went very wrong.');
}


module.exports = {
  getWeather: getWeather
};