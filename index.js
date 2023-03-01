function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let day = days[dayIndex];

  return `${day}   ${hours}:${minutes}`;
}

let dateElement = document.querySelector('#changed-date');
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function showMonth(m = new Date()) {
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let M = months[m.getMonth()];
  let D = m.getDate();
  return `${M} ${D}`;
}

console.log(showMonth());
let monthElement = document.querySelector('#changed-month');
monthElement.innerHTML = showMonth();

//City

function searchCity(city) {
  let apiKey = '58a6775f97527351bf6c6966e209be39';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function cityChange(event) {
  event.preventDefault();
  let newCityName = document.querySelector('#city-input').value;
  searchCity(newCityName);
}

function showWeather(response) {
  console.log(response);
  document.querySelector('#temp').innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector('#description').innerHTML =
    response.data.weather[0]['description'].toUpperCase();
  document.querySelector('#humid').innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector('#wind').innerHTML = Math.round(
    response.data.wind.speed
  );
  console.log(response.data.weather);
  document.querySelector('#changed-city').innerHTML = response.data.name;
}

let cityform = document.querySelector('#search-city');
cityform.addEventListener('submit', cityChange);

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}
//
function getPosition(position) {
  //console.log(position);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = '58a6775f97527351bf6c6966e209be39';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
let currentLocationButton = document.querySelector('#current-location-button');
currentLocationButton.addEventListener('click', currentLocation);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector('#fahrenheit');
  temperatureElement.innerHTML = 66;
}

searchCity('Paris');
