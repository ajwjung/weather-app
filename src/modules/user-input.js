import WeatherData from "./fetch-data.js";

const UserInput = (() => {
    const searchForm = document.querySelector("form");
    let location;

    const saveLocation = (text) => {
        location = text;
    };

    const getLocation = () => location;
    
    const getData = () => {
        const input = document.getElementById("user-input");

        searchForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            saveLocation(input.value);
            console.log(getLocation());
            console.log(await WeatherData.getWeatherData(getLocation()));
        });
    };
    
    return { getData };
})();

export default UserInput;