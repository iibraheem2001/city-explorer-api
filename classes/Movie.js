'use strict';

class Movie {
  constructor(movie) {
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.averageVotes = movie.vote_average;
    this.totalVotes = movie.vote_count;
    this.imageUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    console.log('image url', this.imageUrl);
    this.popularity = movie.popularity;
    this.releasedOn = movie.released_on;
  }
}

module.exports = Movie;
