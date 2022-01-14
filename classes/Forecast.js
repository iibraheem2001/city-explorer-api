'use strict';

class Forecast {
  constructor(day) {
    this.lat = day.lat;
    this.lon = day.lon;
    this.date = day.valid_date;
    this.description = day.weather.description;
  }
}

module.exports = Forecast