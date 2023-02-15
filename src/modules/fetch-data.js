const WeatherData = (() => {
    async function getWeatherData(location, units) {
        try {
            const API_KEY = "f6d50020f2b429ca9a34a9206321e0c7";
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${API_KEY}`);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.log(error);
        };

        return null;
    };

    return { getWeatherData };
})();

export default WeatherData;