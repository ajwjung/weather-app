import Display from "./modules/display-weather.js";
import WeatherData from "./modules/fetch-data.js";
import UserInput from "./modules/user-input.js";
import Units from "./modules/toggle-units.js";

const LoadPage = (() => {
    // Default load
    window.addEventListener("load", async () => {
        const data = await WeatherData.getWeatherData("San Francisco", "imperial");
        Display.displayWeather(data);
        Display.setUnits("imperial");
    });
    
    // Handles event when user searches a location
    UserInput.getData();
    
    // Handles event when user toggles between metric and imperial units
    Units.updateDisplayUnits();
})();