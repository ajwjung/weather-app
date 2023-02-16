const Display = (() => {
    const cityName = document.getElementById("city");
    const timestamp = document.getElementById("date");
    const weatherIcon = document.getElementById("weather-icon");
    const currentTemp = document.getElementById("current-temp");
    const feelsLike = document.getElementById("feels-like");
    const genericReport = document.getElementById("generic-report");
    const humidityLevel = document.getElementById("humidity");
    const wind = document.getElementById("wind-speed");
    const toggleText = document.getElementById("alt-units");

    const currentDeg = document.getElementById("current-deg");
    const feelsLikeDeg = document.getElementById("feels-like-deg");
    const windSpeed = document.getElementById("wind-unit");

    const capitalizeFirstLetter = (string) => {
        const firstLetter = string.charAt(0).toUpperCase();
        return firstLetter + string.slice(1)
    };

    const getCurrentTimestamp = (locationTimezone) => {
        const date = new Date();
        const currentTime = date.getTime(); // milliseconds
        const localOffsetFromUTC = date.getTimezoneOffset() * 60000; // convert mins to ms
        const utcTime = currentTime + localOffsetFromUTC; // milliseconds
        const localTimeAtLocation = utcTime + (locationTimezone * 1000); // convert s to ms
        const localTimeDate = new Date(localTimeAtLocation);

        return `${localTimeDate.toDateString()}, ${localTimeDate.getHours()}:${localTimeDate.getMinutes()}`;
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

    const setUnits = (units) => {
        if (units === "metric") {
            toggleText.textContent = "\u00B0F";
            currentDeg.textContent = " C";
            feelsLikeDeg.textContent = " C";
            windSpeed.textContent = " km/h";
        } else if (units === "imperial") {
            toggleText.textContent = "\u00B0C";
            currentDeg.textContent = " F";
            feelsLikeDeg.textContent = " F";
            windSpeed.textContent = " mph";
        }
    };

    const displayWeather = (data) => {
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        timestamp.textContent = getCurrentTimestamp(data.timezone);
        currentTemp.textContent = `${Math.floor(data.main.temp)}\u00B0`;
        feelsLike.textContent = `${Math.floor(data.main.feels_like)}\u00B0`;
        genericReport.textContent = capitalizeFirstLetter(data.weather[0].description);
        setWeatherIcon(data.weather[0].description);
        humidityLevel.textContent = data.main.humidity;
        wind.textContent = data.wind.speed;
    };

    return { setUnits, displayWeather };
})();

export default Display;