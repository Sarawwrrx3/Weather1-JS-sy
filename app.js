const searchForm = document.querySelector(".search-location");
const cityValue = document.querySelector(".search-location input");
const cityName = document.querySelector(".city-name p");
const cardBody = document.querySelector(".card-body");
const timeImage = document.querySelector(".card-top img");
const cardInfo = document.querySelector(".back-card");

// Converts Kelvin to Celsius
const spitOutCelsius = (kelvin) => {
  celsius = Math.round(kelvin - 273.15);
  return celsius;
};

// Big background picture changes depend on day or night ---- ICON
const isDayTime = (icon) => {
  if (icon.includes("d")) {
    return true;
  } else {
    return false;
  }
};

// city.main.temp ----- all inside objects in Chrome console
updateWeatherApp = (city) => {
  console.log(city);
  const imageName = city.weather[0].icon;
  // @2x ==== icon is twice the size
  const iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`;
  cityName.textContent = city.name;
  cardBody.innerHTML = `
    <div class="card-mid row">
            <div class="col-8 text-center temp">
              <span>${spitOutCelsius(city.main.temp)}&deg;C</span>
            </div>
            <div class="col-4 condition-temp">
              <p class="condition">${city.weather[0].description}</p>
              <p class="high">${spitOutCelsius(city.main.temp_max)}&deg;C</p>
              <p class="low">${spitOutCelsius(city.main.temp_min)}&deg;C</p>
            </div>
          </div>

          <div class="icon-container card shadow mx-auto">
            <img src="${iconSrc}" alt="" />
          </div>
          <div class="card-bottom px-5 py-4 row">
            <div class="col text-center">
              <p>${spitOutCelsius(city.main.feels_like)}&deg;C</p>
              <span>Feels Like</span>
            </div>
            <div class="col text-center">
              <p>${city.main.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
    `;

  // Big background picture changes depend on day or night
  if (isDayTime(imageName)) {
    console.log("day");
    timeImage.setAttribute("src", "images/day_image.svg");
    // changes text (black/white) depends on day or night
    if (cityName.classList.contains("text-white")) {
      cityName.classList.remove("text-white");
    } else {
      cityName.classList.add("text-black");
    }
  } else {
    console.log("night");
    timeImage.setAttribute("src", "images/night_image.svg");
    if (cityName.classList.contains("text-black")) {
      cityName.classList.remove("text-black");
    } else {
      cityName.classList.add("text-white");
    }
  }

  // Starts of empty (no card) when you refresh / open new
  cardInfo.classList.remove("d-none");
};

// SEARCH button
//add an event listener to the form
// prevents the form to refresh automatically
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const citySearched = cityValue.value.trim();
  console.log(citySearched);
  searchForm.reset();

  requestCity(citySearched)
    .then((data) => {
      updateWeatherApp(data);
    })
    .catch((error) => {
      console.log(error);
    });
});
