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

app.get('/movies', async (request, response) => {
  let searchQuery = request.query.searchQuery;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
  const movieData = await axios.get(url);
  const movieArr = movieData.data.results.map(movie => new Movie(movie));
  response.status(200).send(movieArr);
})

function handleError(error, response) {
  console.log(error);
  response.status(500).send('something went very wrong.');
}

app.get('*', (req, res) => {
  res.status(404).send('page not found');
});

class Forecast {
  constructor(day) {
    this.lat = day.lat;
    this.lon = day.lon;
    this.date = day.valid_date;
    this.description = day.weather.description;
  }
}

class Movie {
  constructor(movie) {
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.averageVotes = movie.vote_average;
    this.totalVotes = movie.vote_count;
    this.imageUrl = 'https://image.tmbd.org/t/p/w500' + movie.poster_path;
    this.popularity = movie.popularity;
    this.releasedOn = movie.released_on;
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
