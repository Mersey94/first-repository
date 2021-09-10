//current location & weather
let key = "bc2cd97eaa209e7d22d8f3c84081655f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${key}&`;
let locButton = document.querySelector("#location-btn");
let cityDis = document.querySelector("h1");
let weatherNum = document.querySelector("h2");
let timezone = 0;
let temp = 0;
let cityInput = document.querySelector("#city-input");

document.querySelector("#search-btn").addEventListener("click", function () {
  event.preventDefault();
  citySearched(cityInput.value);
});

document
  .querySelector("#location-btn")
  .addEventListener("click", getCurrentPosition);

document
  .querySelector("#fahrenheit-link")
  .addEventListener("click", function () {
    displayTemp(temp, false);
  });

document.querySelector("#celsius-link").addEventListener("click", function () {
  displayTemp(temp, true);
});
//functions

function citySearched(search) {
  let url = `${apiUrl}q=${search}`;
  axios.get(url).then(displayWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
// getCurrentPosition();

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `${apiUrl}lat=${lat}&lon=${lon}`;
  axios.get(url).then(displayWeather);
}

function displayWeather(response) {
  // console.log(response.data);
  let currentDate = new Date(response.data.dt * 1000);
  let city = response.data.name;
  // let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  temp = response.data.main.temp;
  timezone = response.data.timezone;
  displayTemp(temp, true);
  document.querySelector("#location-name").innerHTML = city;
  document.querySelector("#description").innerHTML = description;
  document.querySelector(".country").innerHTML = response.data.sys.country;
  showDate(new Date());
}

function displayTemp(temperature, isCelsius) {
  let unit = "";
  if (isCelsius) {
    unit = "°C";
  } else {
    unit = "°F";
    temperature = (temperature * 9) / 5 + 32;
  }
  weatherNum.innerHTML = `${Math.round(temperature)}${unit}`;
}

function showDate(date) {
  let offset = date.getTimezoneOffset() / -60;
  date.setTime(date.getTime() - offset * 3600 * 1000 + timezone * 1000);
  console.log(offset);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentDay = days[date.getDay()];
  let currentDate = date.getDate();
  let currentMonth = months[date.getMonth()];
  let currentYear = date.getFullYear();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  let milliSec = date.getMilliseconds();

  document.querySelector(
    "#display-date"
  ).innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;
  document.querySelector(".current-time").innerHTML = `${hour}:${min}:${sec}`;
}

setInterval(function () {
  showDate(new Date());
}, 1000);
citySearched("Sydney");
//display date
