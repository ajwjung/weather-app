const Display = (() => {
    const cityName = document.getElementById("city");
    const weatherIcon = document.getElementById("weather-icon");
    const currentTemp = document.getElementById("current-temp");
    const feelsLike = document.getElementById("feels-like");
    const genericReport = document.getElementById("generic-report");
    const humidityLevel = document.getElementById("humidity");
    const wind = document.getElementById("wind");

    const capitalizeFirstLetter = (string) => {
        const firstLetter = string.charAt(0).toUpperCase();
        return firstLetter + string.slice(1)
    };

    const setWeatherIcon = (weather) => {
        switch (weather) {
            case "clear sky":
                weatherIcon.src = "../src/imgs/weather-sunny.svg";
                break;
            case "few clouds":
                weatherIcon.src = "../src/imgs/weather-partly-cloudy.svg";
                break;
            case "scattered clouds":
            case "broken clouds":
                weatherIcon.src = "../src/imgs/clouds.svg";
                break;
            case "shower rain":
            case "rain":
                weatherIcon.src = "../src/imgs/weather-pouring.svg";
                break;
            case "thunderstorm":
                weatherIcon.src = "../src/imgs/weather-lightning.svg";
                break;
            case "snow":
                weatherIcon.src = "../src/imgs/snowflake.svg";
                break;
            case "mist":
                weatherIcon.src = "../src/imgs/weather-fog.svg";
                break;
            default:
                weatherIcon.src = "../src/imgs/01d.png"
        }
    };

    const displayWeather = (data) => {
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        currentTemp.textContent = `${Math.floor(data.main.temp)}\u00B0`;
        feelsLike.textContent = `Feels like ${Math.floor(data.main.feels_like)}\u00B0`;
        genericReport.textContent = capitalizeFirstLetter(data.weather[0].description);
        setWeatherIcon(data.weather[0].description);
        humidityLevel.textContent = `Humidity level: ${data.main.humidity}%`;
        wind.textContent = `${data.wind.speed} mph`;
    };

    return { displayWeather };
})();

export default Display;