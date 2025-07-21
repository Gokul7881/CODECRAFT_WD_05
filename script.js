const API_KEY = '251d2ab11d2395cefe5dd157661f5822'; // Replace with your OpenWeatherMap API key

function getWeatherByCity() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    alert("Please enter a city.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  fetchWeather(url);
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      fetchWeather(url);
    }, () => {
      alert("Unable to get location.");
    });
  } else {
    alert("Geolocation not supported.");
  }
}

function fetchWeather(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const display = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡 Temperature: ${data.main.temp}°C</p>
        <p>🌥 Weather: ${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
      `;
      document.getElementById('weatherDisplay').innerHTML = display;
    })
    .catch(() => {
      alert("Error fetching weather data.");
    });
}
