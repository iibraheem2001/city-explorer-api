'use strict';

const axios = require('axios');
const Movie = require('../classes/Movie.js');

async function getMovie(request, response) {
  let searchQuery = request.query.searchQuery;
  // console.log('search query!!!', searchQuery);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
  // console.log('url',url);
  const movieData = await axios.get(url);
  // console.log('movie data!!!', movieData.data.results);
  const movieArr = movieData.data.results.map(movie => new Movie(movie));
  response.status(200).send(movieArr);
}

module.exports = {
  getMovie:getMovie
};
