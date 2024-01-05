# Weather App

- [Live Demo](https://ajwjung.github.io/weather-app/)

## Objective

To create a weather forecast site using [OpenWeatherMap's API](https://openweathermap.org/api) to practice working with promises and APIs. Full details can be found on [The Odin Project's page](https://www.theodinproject.com/lessons/node-path-javascript-weather-app).

**Requirements**

1. Include a simple form that allows the user to enter a location

2. Use the weather API to fetch weather data for the location, then display the data on the page

3. Have a feature that toggles the data in Fahrenheit or Celsius

4. Change the look of the page based on the data (e.g., change the background or add images that describe the weather)

**Optional**

- Add a 'loading' component that displays from the time the form is submitted until the information comes back from the API

## Built With

- HTML5
- CSS3
- Vanilla JS
- [Webpack](https://webpack.js.org/)

## Using the Weather App

My weather forecast page displays both the current weather report and a 5-day report for a given location (default location is San Francisco). You can search for a location by city name or zip code to display the weather report for said location. You can also switch between displaying metric (°C) and imperial (°F) units by clicking the toggle button.

**Update:** I updated the UI to be more responsive to different viewport sizes and also added a section that displays a forecast for the next 24h over three hour increments.

## Credits

All svg icons used in my webpage were downloaded from [Material Design Icons](https://pictogrammers.com/library/mdi/).

## Author's Notes

Learning about APIs was very exciting and this project was a fun introduction on how to use APIs. The main thing I struggled with was figuring out how to use the `Date` object and its methods to properly convert between timezones because different units were used for certain values. As a side note, I didn't check for [all weather conditions](https://openweathermap.org/weather-conditions) the API provides, so some icons may not be accurate but the general idea is there.

The icons in the 5-day forecast are colored based on the same conditional check used to color the main icon and text. I decided not to make a separate check to make the icon colors uniform because I think it's nice to have another way to differentiate the weather conditions, much like how colored emoji icons are very easy to differentiate at a glance.
