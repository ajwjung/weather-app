const WeatherData = (() => {
    async function getWeatherData(location) {
        try {
            const API_KEY = "f6d50020f2b429ca9a34a9206321e0c7";
            const units = "imperial"
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${API_KEY}`);
            const data = await response.json();
            
            return {
                units,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                low: data.main.temp_min,
                high: data.main.temp_max,
                wind: data.wind.speed,
                "feels like": data.main.feels_like
            };
        } catch (error) {
            console.log(error)
        };

        return null;
    };

    return { getWeatherData };
})();

export default WeatherData;