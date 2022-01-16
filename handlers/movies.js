'use strict';

const axios = require('axios');
const Movie = require('../classes/Movie.js');
const inMemoryDB = {};

async function getMovie(request, response) {
  let searchQuery = request.query.searchQuery;

  if (inMemoryDB[searchQuery] && (Date.now() - inMemoryDB[searchQuery].timeStamp) < (1000 * 10)) {
    console.log('Movie catch hit, SUCCESS');
    response.send(inMemoryDB[searchQuery].selectedMovie)
  } else {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
  const movieData = await axios.get(url);
  const movieArr = movieData.data.results.map(movie => new Movie(movie));
  console.log('Movie cache miss, BOO');
  inMemoryDB[searchQuery] = {
    selectedMovie: movieArr,
    timeStamp: Date.now()
  }
  response.status(200).send(movieArr);
}
}

module.exports = {
  getMovie: getMovie
};
