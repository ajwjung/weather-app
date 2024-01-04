const WeatherData = (() => {
  async function getWeatherData(location, units) {
    try {
      const API_KEY = "f6d50020f2b429ca9a34a9206321e0c7";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${API_KEY}`,
        { mode: "cors" }
      );
      const data = await response.json();

      return data;
    } catch (error) {
      alert(error);
    }

    return null;
  }

  async function getFiveDayForecast(location, units) {
    try {
      const API_KEY = "f6d50020f2b429ca9a34a9206321e0c7";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&appid=${API_KEY}`,
        { mode: "cors" }
      );
      const data = await response.json();

      return data;
    } catch (error) {
      alert(error);
    }

    return null;
  }

  async function getThreeHourData(location, units) {
    try {
      const API_KEY = "f6d50020f2b429ca9a34a9206321e0c7";
      // Fetch and convert city names/zip-codes to geo coordinates
      const coordinatesResponse = await fetch(
        ` http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`,
        { mode: "cors"}
      )
      const coordinatesData = await coordinatesResponse.json();
      const { lat, lon } = coordinatesData[0];

      // Actual fetch for 3-hour data
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`,
        { mode: "cors" }
      );
      const data = await response.json();

      return data;
    } catch (error) {
      alert(error);
    }

    return null;
  }

  return { getWeatherData, getFiveDayForecast, getThreeHourData };
})();

export default WeatherData;
