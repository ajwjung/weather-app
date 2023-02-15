import Display from "./modules/display-weather.js";
import WeatherData from "./modules/fetch-data.js";
import UserInput from "./modules/user-input.js";
import Units from "./modules/toggle-units.js";

window.addEventListener("load", async () => {
    const data = await WeatherData.getWeatherData("San Francisco");
    Display.displayWeather(data);
    Display.setUnits("imperial");
    Units.updateDisplayUnits();
});

UserInput.getData();