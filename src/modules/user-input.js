import WeatherData from "./fetch-data.js";
import Display from "./display-weather.js";

const UserInput = (() => {
  const searchForm = document.querySelector("form");
  const inputField = document.getElementById("user-input");
  let location = "San Francisco";

  const saveLocation = (text) => {
    location = text;
  };

  const readLocation = () => location;

  const clearSearchBar = () => {
    inputField.value = "";
  };

  const getData = () => {
    const input = document.getElementById("user-input");

    searchForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      saveLocation(input.value);
      const currentWeatherData = await WeatherData.getWeatherData(
        readLocation(),
        "imperial"
      );
      Display.displayCurrentWeather(currentWeatherData);
      const fiveDayData = await WeatherData.getFiveDayForecast(
        readLocation(),
        "imperial"
      );
      Display.displayFiveDayWeather(fiveDayData);
      const threeHourData = await WeatherData.getThreeHourData(
        readLocation(),
        "imperial"
      )
      Display.displayThreeHourWeather(threeHourData);
      clearSearchBar();
    });
  };

  return { getData, readLocation };
})();

export default UserInput;
