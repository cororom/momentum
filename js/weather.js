const todayWeather = document.querySelector(".weather__today .weather__title");
const city = document.querySelector(".weather__today .weather__city");
const humidity = document.querySelector(".weather__today .weather__humidity");
const wind = document.querySelector(".weather__today .weather__wind");
const weatherIcon = document.querySelector(".weather__today .weather__icon");
const API_KEY = "d02ff35f90db91218989a90c4d15d123";

const weatherIconList = {
  "01": "fas fa-sun",
  "02": "fas fa-cloud-sun",
  "03": "fas fa-cloud",
  "04": "fas fa-cloud-meatball",
  "09": "fas fa-cloud-sun-rain",
  10: "fas fa-cloud-showers-heavy",
  11: "fas fa-poo-storm",
  13: "far fa-snowflake",
  50: "fas fa-smog",
};

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const current = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const daily = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(current)
    .then((response) => response.json())
    .then((data) => {
      const icon = data.weather[0].icon.substr(0, 2);
      todayWeather.textContent = `${data.weather[0].main} / ${data.main.temp}º`;
      city.textContent = data.name;
      weatherIcon.innerHTML = `<i class="${weatherIconList[icon]}"></i>`;
      humidity.innerHTML = `<i class="fa-solid fa-droplet"></i><span>${data.main.humidity}%</span>`;
      wind.innerHTML = `<i class="fa-solid fa-wind"></i><span>${data.wind.speed}km/h</span>`;
    });
  fetch(daily)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < 4; i++) {
        const dailyWeatherIcon = document.querySelector(`.weather__daily.row${i} .weather__icon`);
        const dailyTempMax = document.querySelector(`.weather__daily.row${i} .weather__temp-max`);
        const dailyTempMin = document.querySelector(`.weather__daily.row${i} .weather__temp-min`);
        if (dailyWeatherIcon) {
          const icon = data.daily[i].weather[0].icon.substr(0, 2);
          dailyWeatherIcon.innerHTML = `<i class="${weatherIconList[icon]}"></i>`;
          dailyTempMax.textContent = `${Math.floor(data.daily[i].temp.max)}º`;
          dailyTempMin.textContent = `${Math.floor(data.daily[i].temp.min)}º`;
        }
      }
    });
}

function onGeoError() {
  alert("can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
