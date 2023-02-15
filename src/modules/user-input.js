import WeatherData from "./fetch-data.js";

const UserInput = (() => {
    const searchForm = document.querySelector("form");
    let location;

    const saveLocation = (text) => {
        location = text;
    };

    const readLocation = () => location;

    const getData = () => {
        const input = document.getElementById("user-input");

        searchForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            saveLocation(input.value);
            await WeatherData.getWeatherData(readLocation());
        });
    };
    
    return { getData, readLocation };
})();

export default UserInput;