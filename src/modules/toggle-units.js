import Display from "./display-weather.js";
import UserInput from "./user-input.js";
import WeatherData from "./fetch-data.js";

const Units = (() => {
    const toggleBtn = document.getElementById("units-btn");
    let displayedUnit = "imperial";
    
    const changeUnit = () => {
        if (displayedUnit === "imperial") {
            displayedUnit = "metric";
        } else if (displayedUnit === "metric") {
            displayedUnit = "imperial";
        }
    };

    const getCurrentUnit = () => displayedUnit;

    const updateDisplayUnits = () => {
        toggleBtn.addEventListener("click", async () => {
            Units.changeUnit();
            const newUnit = Units.getCurrentUnit();
            Display.setUnits(newUnit);
            const currentLocation = UserInput.readLocation();
            const data = await WeatherData.getWeatherData(currentLocation, newUnit);
            Display.displayWeather(data);
        });
    }

    return { changeUnit, getCurrentUnit, updateDisplayUnits }
})();

export default Units;