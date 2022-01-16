'use strict'

const axios = require('axios');
const res = require('express/lib/response');
const Forecast = require('../classes/Forecast.js');

const inMemoryDB = {};

async function getWeather(request, response) {
  const lat = request.query.lat;
  const lon = request.query.lon;
  let searchQuery = request.query.searchQuery;
  if (inMemoryDB[searchQuery] && (Date.now() - inMemoryDB[searchQuery].timeStamp) < (1000 * 10)) {
    console.log('Weather catch hit, SUCCESS');
    response.send(inMemoryDB[searchQuery].forecast)
  } else {

    // try {
      const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=5`;

      const weatherResponse = await axios.get(url);
      const weatherArr = weatherResponse.data.data.map(day => new Forecast(day));
      
    // } catch (error) {
    //   handleError(error, response);
    // }
    console.log('Weather cache miss, BOO');
    inMemoryDB[searchQuery] = {
      forecast: weatherArr,
      timeStamp: Date.now()
    }
    response.status(200).send(weatherArr);
  }
}

// function handleError(error, response) {
//   response.status(500).send('something went very wrong.');
// }

// function parseWeather(weatherData) {
//   try {
//     const weatherSummaries = weatherData.data.map(day => {
//       return new Weather(day);
//     });
//     return Promise.resolve(weatherSummaries);
//   } catch (e) {
//     return Promise.reject(e);
//   }
// }


module.exports = {
  getWeather: getWeather
};