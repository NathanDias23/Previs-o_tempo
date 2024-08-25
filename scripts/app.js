var _a;
var apiKey = 'ff1db04f39245b49d145efd20af3a30c';
(_a = document.getElementById('searchBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', fetchWeather);
function fetchWeather() {
    var city = document.getElementById('cityInput').value.trim();
    if (!city) {
        alert('Please enter a city name.');
        return;
    }
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=".concat(city, "&appid=").concat(apiKey, "&units=metric&lang=pt_br");
    fetch(apiUrl)
        .then(function (response) {
        if (!response.ok) {
            throw new Error('City not found');
        }
        return response.json();
    })
        .then(function (data) { return displayWeather(data); })
        .catch(function (error) {
        alert(error.message);
        toggleWeatherInfo(false);
    });
}
function displayWeather(data) {
    document.getElementById('cityName').textContent = data.name;
    document.getElementById('temperature').textContent = "".concat(data.main.temp.toFixed(1), "\u00B0C");
    document.getElementById('weatherDescription').textContent = data.weather[0].description;
    var weatherIcon = document.getElementById('weatherIcon');
    weatherIcon.src = "http://openweathermap.org/img/wn/".concat(data.weather[0].icon, "@2x.png");
    weatherIcon.alt = data.weather[0].description;
    toggleWeatherInfo(true);
}
function toggleWeatherInfo(show) {
    var weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.classList.toggle('hidden', !show);
}
