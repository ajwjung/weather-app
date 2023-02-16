import WeatherData from "./fetch-data.js";
import Display from "./display-weather.js";

const UserInput = (() => {
  const searchForm = document.querySelector("form");
  let location = "San Francisco";

  const saveLocation = (text) => {
    location = text;
  };

  const readLocation = () => location;

  const getData = () => {
    const input = document.getElementById("user-input");

    searchForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      saveLocation(input.value);
      const data = await WeatherData.getWeatherData(readLocation(), "imperial");
      Display.displayWeather(data);
    });
  };

  return { getData, readLocation };
})();

export default UserInput;
