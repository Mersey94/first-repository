// let weatherIcons = {
//   200: "fa-thunderstorm",
//   201: "fa-thunderstorm",
//   202: "fa-thunderstorm",
//   211: "fa-thunderstorm",
//   212: "fa-thunderstorm",
//   221: "fa-thunderstorm",
//   230: "fa-thunderstorm",
//   231: "fa-thunderstorm",
//   232: "fa-thunderstorm",
//   300: "fa-thunderstorm",
//   301: "fa-cloud-drizzle",
//   302: "fa-cloud-drizzle",
//   310: "fa-cloud-drizzle",
//   311: "fa-cloud-drizzle",
//   312: "fa-cloud-drizzle",
//   313: "fa-cloud-drizzle",
//   314: "fa-cloud-drizzle",
//   321: "fa-cloud-drizzle",
//   500: "fa-cloud-drizzle",
//   501: "fa-cloud-showers",
//   502: "fa-cloud-showers-heavy",
//   503: "fa-cloud-showers-heavy",
//   504: "fa-cloud-showers-heavy",
//   511: "fa-cloud-showers",
//   520: "fa-cloud-showers",
//   521: "fa-cloud-showers",
//   522: "fa-cloud-showers-heavy",
//   531: "fa-cloud-showers-heavy",
//   600: "fa-cloud-snow",
//   601: "fa-cloud-snow",
//   602: "fa-snow-blowing",
//   611: "fa-cloud-sleet",
//   612: "fa-cloud-sleet",
//   613: "fa-cloud-sleet",
//   615: "fa-cloud-hail-mixed",
//   616: "fa-cloud-hail-mixed",
//   620: "fa-cloud-hail-mixed",
//   621: "fa-cloud-snow",
//   622: "fa-snow-blowing",
//   701: "fa-fog",
//   711: "fa-smoke",
//   721: "fa-sun-haze",
//   731: "fa-sun-dust",
//   741: "fa-fog",
//   751: "fa-sun-dust",
//   761: "fa-sun-dust",
//   762: "fa-volcano",
//   771: "fa-wind",
//   781: "fa-tornado",
//   800: "fa-sun",
//   801: "fa-cloud",
//   802: "fa-cloud-sun",
//   803: "fa-clouds",
//   804: "fa-clouds",
// };
//current location & weather,
let key = "bc2cd97eaa209e7d22d8f3c84081655f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${key}&`;
let apiForecast = `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${key}&`;

let locButton = document.querySelector("#location-btn");
let cityDis = document.querySelector("h1");
let weatherNum = document.querySelector("h2");
let timezone = 0;
let temp = 0;
let cityInput = document.querySelector("#city-input");
let feelsLike = document.querySelector(".temp-feel");
let tempHumid = document.querySelector(".li-humid");
let tempWind = document.querySelector(".li-wind");

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

document.querySelector("#weatherIcon");
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

  getForecast(response.data.coord);
  // console.log(position);
}

function displayWeather(response) {
  let coordinates = response.data.coord;
  let iconID = response.data.weather[0].id;
  //console.log(weatherIcons[iconID]);
  let humid = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let currentDate = new Date(response.data.dt * 1000);
  let city = response.data.name;
  let feels = response.data.main.feels_like;
  // let temperature = Math.round(response.data.main.temp);

  let description = response.data.weather[0].description;
  temp = response.data.main.temp;
  timezone = response.data.timezone;
  displayTemp(temp, true);

  document.querySelector("#location-name").innerHTML = city;

  document.querySelector("#description").innerHTML = description;
  document.querySelector(".country").innerHTML = response.data.sys.country;
  document.querySelector(".li-humid").innerHTML = humid;
  document.querySelector(".li-wind").innerHTML = wind;

  // document
  //   .querySelector("#icon")
  //   .setAttribute("class", `fal current-icon ${weatherIcons[iconID]}`);
  console.log(response.data.weather[0].icon);
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  feelsLike.innerHTML = `${Math.round(feels)}°C`;
  tempHumid.innerHTML = `${humid} %`;
  tempWind.innerHTML = `${wind} km/h`;

  showDate(new Date());
  getForecast(coordinates);
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
  // console.log(offset);
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

  document.querySelector(
    "#display-date"
  ).innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;
  document.querySelector(".current-time").innerHTML = `${hour}:${min}:${sec}`;
}

setInterval(function () {
  showDate(new Date());
}, 1000);
citySearched("Sydney");

// forecast js
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  date.setTime(date.getTime() + timezone * 1000);
  console.log(date);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  console.log(day);
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  // console.log(response.data.timezone_offset);
  forecast.forEach(function (forecastDay, index) {
    // console.log(forecastDay.dt);
    let iconID = forecastDay.weather[0].id;
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col preview-day">
          <div id="d1Day"class="col day day1">${formatDay(forecastDay.dt)}</div>
          <div><div id="forecastIcon">
            <img class="icon" src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" />
          </div></div>
          <span id="forecastMaxTemp"class="col day-max-temp">${Math.round(
            forecastDay.temp.max
          )}° |</span>
          <span id="forecastMinTemp"class="col day-min-temp"><i class="fal fa-moon"></i>${Math.round(
            forecastDay.temp.min
          )}°</span>
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
