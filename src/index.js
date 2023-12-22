let apiKey = "d09a0fd0aaod658935ba4280ebb33t01";

function refreshWeather(response) {
    let city = response.data.city;
    let temperature = response.data.temperature.current;
    let humidity = response.data.temperature.humidity;
    let description = response.data.condition.description;
    let wind = response.data.wind.speed;
    let date = new Date(response.data.time * 1000);

    console.log(response.data)

    let temperatureElement = document.querySelector("#weather-app-temperature");
    temperatureElement.innerHTML = Math.round(temperature);

    let cityElement = document.querySelector("#weather-app-city");
    cityElement.innerHTML = `${city}`;

    let humidityElement = document.querySelector("#weather-humidity");
    humidityElement.innerHTML = `${humidity}%`

    let descriptionElement = document.querySelector("#weather-description");
    descriptionElement.innerHTML = `${description}`;

    let windElement = document.querySelector("#weather-wind");
    windElement.innerHTML = `${wind} km/h`;

    let iconElement = document.querySelector("#weather-app-icon");
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

    let timeElement = document.querySelector("#time");
    timeElement.innerHTML = formatDate(date);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");