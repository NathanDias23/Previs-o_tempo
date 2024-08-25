const apiKey = 'ff1db04f39245b49d145efd20af3a30c';

document.getElementById('searchBtn')?.addEventListener('click', fetchWeather);

function fetchWeather() {
    const city = (document.getElementById('cityInput') as HTMLInputElement).value.trim();

    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            alert(error.message);
            toggleWeatherInfo(false);
        });
}

function displayWeather(data: any) {
    (document.getElementById('cityName') as HTMLElement).textContent = data.name;
    (document.getElementById('temperature') as HTMLElement).textContent = `${data.main.temp.toFixed(1)}°C`;
    (document.getElementById('weatherDescription') as HTMLElement).textContent = data.weather[0].description;
    
    const weatherIcon = document.getElementById('weatherIcon') as HTMLImageElement;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    toggleWeatherInfo(true);
}

function toggleWeatherInfo(show: boolean) {
    const weatherInfo = document.getElementById('weatherInfo') as HTMLElement;
    weatherInfo.classList.toggle('hidden', !show);
}
