const Display = (() => {
  const body = document.querySelector("body");
  const buttons = document.querySelectorAll("button");
  const cityName = document.getElementById("city");
  const timestamp = document.getElementById("date");
  const weatherIcon = document.getElementById("weather-icon");
  const currentTemp = document.getElementById("current-temp");
  const feelsLike = document.getElementById("feels-like");
  const genericReport = document.getElementById("generic-report");
  const humidityLevel = document.getElementById("humidity");
  const wind = document.getElementById("wind-speed");
  const toggleText = document.getElementById("alt-units");
  const dailyReport = document.querySelectorAll(".daily-report");
  const dailyHighTemps = document.querySelectorAll(".daily-high");
  const dailyLowTemps = document.querySelectorAll(".daily-low");

  const currentDeg = document.getElementById("current-deg");
  const feelsLikeDeg = document.getElementById("feels-like-deg");
  const windSpeed = document.getElementById("wind-unit");
  const fiveDayUnits = document.querySelectorAll(".deg-unit")

  const capitalizeFirstLetter = (string) => {
    const firstLetter = string.charAt(0).toUpperCase();
    return firstLetter + string.slice(1);
  };

  const getCurrentTimestamp = (locationTimezone) => {
    const date = new Date();
    const currentTime = date.getTime(); // milliseconds
    const localOffsetFromUTC = date.getTimezoneOffset() * 60000; // convert mins to ms
    const utcTime = currentTime + localOffsetFromUTC; // milliseconds
    const localTimeAtLocation = utcTime + locationTimezone * 1000; // convert s to ms
    const localTimeDate = new Date(localTimeAtLocation);

    return `${localTimeDate.toDateString()}, ${localTimeDate.toLocaleTimeString(
      [],
      { hour: "2-digit", minute: "2-digit" }
    )}`;
  };

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case "Clear":
        return ["../src/imgs/weather-sunny.svg", "blue-filter"];
      case "Clouds":
        return ["../src/imgs/clouds.svg", "darkgray-filter"];
      case "Rain":
        return ["../src/imgs/weather-pouring.svg", "white-filter"];
      case "Thunderstorm":
        return ["../src/imgs/weather-lightning.svg", "white-filter"];
      case "Snow":
      case "Smoke":
      case "Haze":
      case "Dust":
      case "Mist":
        return ["../src/imgs/snowflake.svg", "blue-filter"];
      default:
        return ["../src/imgs/thermometer.svg", "blue-filter"];
    }
  };

  const setTheme = (weather) => {
    switch (weather) {
      case "Clear":
        body.style.background =
          "linear-gradient(to bottom, rgb(109, 180, 207), rgb(245, 236, 218))";
        body.style.color = "#2c3853";
        buttons.forEach((btn) => {
          btn.style.color = "#2c3853";
        });
        break;
      case "Clouds":
        body.style.background =
          "linear-gradient(to bottom, rgb(133, 149, 158), rgb(200, 200, 200))";
        body.style.color = "#202020";
        buttons.forEach((btn) => {
          btn.style.color = "#202020";
        });
        break;
      case "Drizzle":
      case "Rain":
        body.style.background =
          "linear-gradient(to bottom, rgb(68, 77, 82), rgb(140, 146, 148))";
        body.style.color = "white";
        buttons.forEach((btn) => {
          btn.style.color = "white";
        });
        break;
      case "Thunderstorm":
        body.style.background =
          "linear-gradient(to bottom, rgb(19, 23, 26), rgb(77, 83, 85))";
        body.style.color = "white";
        buttons.forEach((btn) => {
          btn.style.color = "white";
        });
        break;
      case "Snow":
      case "Smoke":
      case "Haze":
      case "Dust":
      case "Mist":
        body.style.background =
          "linear-gradient(to bottom, rgb(134, 141, 146), rgb(216, 230, 235))";
        body.style.color = "#2c4374";
        buttons.forEach((btn) => {
          btn.style.color = "#2c4374";
        });
        break;
      default:
        body.style.background =
          "linear-gradient(to bottom, rgb(109, 180, 207), rgb(245, 236, 218))";
        body.color = "white";
        buttons.forEach((btn) => {
          btn.style.color = "white";
        });
    }
  };

  const setUnits = (units) => {
    if (units === "metric") {
      toggleText.textContent = "\u00B0F";
      currentDeg.textContent = " C";
      feelsLikeDeg.textContent = " C";
      windSpeed.textContent = " km/h";
      fiveDayUnits.forEach(div => { div.textContent = "\u00B0C" });
    } else if (units === "imperial") {
      toggleText.textContent = "\u00B0C";
      currentDeg.textContent = " F";
      feelsLikeDeg.textContent = " F";
      windSpeed.textContent = " mph";
      fiveDayUnits.forEach(div => { div.textContent = "\u00B0F" });
    }
  };

  const extractData = (data) => {
    // Get every 8th object (eight 3-hour reports = 24 hours)
    const forecastData = [];

    for (let i = 0; i < data.list.length; i+= 8) {
      forecastData.push(data.list[i]);
    };
    
    console.log(forecastData);
    
    return forecastData;
  };

  const convertDate = (utcDt) => {
    const date = new Date(utcDt * 1000);
    return date.toLocaleString("en", { weekday: "short" });

  };

  const displayCurrentWeather = (data) => {
    setTheme(data.weather[0].main);
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    timestamp.textContent = getCurrentTimestamp(data.timezone);
    currentTemp.textContent = `${Math.floor(data.main.temp)}\u00B0`;
    feelsLike.textContent = `${Math.floor(data.main.feels_like)}\u00B0`;
    genericReport.textContent = capitalizeFirstLetter(
      data.weather[0].description
    );
    const [iconSrc, svgFilter] = getWeatherIcon(data.weather[0].main);
    weatherIcon.src = iconSrc;
    weatherIcon.className = svgFilter;
    humidityLevel.textContent = data.main.humidity;
    wind.textContent = data.wind.speed;
  };

  const displayFiveDayWeather = (data) => {
    const fiveDayData = extractData(data);
    for (let i = 0; i < dailyReport.length; i += 1) {
      const [dayOfWeek, img] = dailyReport[i].children;
      dayOfWeek.textContent = convertDate(fiveDayData[i].dt);
      const [iconSrc, svgFilter] = getWeatherIcon(fiveDayData[i].weather[0].main);
      img.src = iconSrc;
      img.className = svgFilter;
      dailyHighTemps[i].textContent = Math.floor(fiveDayData[i].main.temp_max);
      dailyLowTemps[i].textContent = Math.floor(fiveDayData[i].main.temp_min);
    };
  };

  return { setUnits, displayCurrentWeather, displayFiveDayWeather };
})();

export default Display;
