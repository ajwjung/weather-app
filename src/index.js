import WeatherData from "./modules/fetch-data.js";
import UserInput from "./modules/user-input.js";

window.addEventListener("load", () => {
    WeatherData.getWeatherData("San Francisco");
});

UserInput.getData();