const Display = (() => {
    const body = document.querySelector("body");
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
            case "Clear":
                weatherIcon.src = "../src/imgs/weather-sunny.svg";
                weatherIcon.className = "blue-filter";
                break;
            case "Clouds":
                weatherIcon.src = "../src/imgs/clouds.svg";
                weatherIcon.className = "darkgray-filter";
                break;
            case "Rain":
                weatherIcon.src = "../src/imgs/weather-pouring.svg";
                weatherIcon.className = "white-filter";
                break;
            case "Thunderstorm":
                weatherIcon.src = "../src/imgs/weather-lightning.svg";
                weatherIcon.className = "white-filter";
                break;
            case "Snow":
            case "Smoke":
            case "Haze":
            case "Dust":
            case "Mist":
                weatherIcon.src = "../src/imgs/snowflake.svg";
                weatherIcon.className = "darkgray-filter";
                break;
            default:
                weatherIcon.src = "../src/imgs/thermometer.svg"
                weatherIcon.className = "blue-filter";
        }
    };

    const setBackground = (weather) => {
        switch (weather) {
            case "Clear":
                body.style.background = "linear-gradient(to bottom, rgb(109, 180, 207), rgb(245, 236, 218))";
                body.style.color = "#2c3853";
                break;
            case "Clouds":
                body.style.background = "linear-gradient(to bottom, rgb(133, 149, 158), rgb(200, 200, 200))";
                body.style.color = "#202020";
                break;
            case "Drizzle":
            case "Rain":
                body.style.background = "linear-gradient(to bottom, rgb(68, 77, 82), rgb(140, 146, 148))";
                body.style.color = "white";
                break;
            case "Thunderstorm":
                body.style.background = "linear-gradient(to bottom, rgb(19, 23, 26), rgb(77, 83, 85))";
                body.style.color = "white";
                break;
            case "Snow":
            case "Smoke":
            case "Haze":
            case "Dust":
            case "Mist":
                body.style.background = "linear-gradient(to bottom, rgb(134, 141, 146), rgb(216, 230, 235))";
                body.style.color = "#2c4374";
                break;
            default:
                body.style.background = "linear-gradient(to bottom, rgb(109, 180, 207), rgb(245, 236, 218))";
                body.color = "white";
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
        setBackground(data.weather[0].main);
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        timestamp.textContent = getCurrentTimestamp(data.timezone);
        currentTemp.textContent = `${Math.floor(data.main.temp)}\u00B0`;
        feelsLike.textContent = `${Math.floor(data.main.feels_like)}\u00B0`;
        genericReport.textContent = capitalizeFirstLetter(data.weather[0].description);
        setWeatherIcon(data.weather[0].main);
        humidityLevel.textContent = data.main.humidity;
        wind.textContent = data.wind.speed;
    };

    return { setUnits, displayWeather };
})();

export default Display;