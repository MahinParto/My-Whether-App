//##################### WeekDay + Time ###########################
let now = new Date();
let liveTime = document.querySelector(".time");
let liveDate = document.querySelector(".date");
let minute = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
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
let Month = months[now.getMonth()];
let dayNumb = now.getDate();
let Year = now.getFullYear();

function correctionMinutes(minute) {
  if (minute < 10) {
    return "0" + minute;
  } else {
    return minute;
  }
}

function newTime(time) {
  let hours = now.getHours();
  let minutes = correctionMinutes(now.getMinutes());

  return hours + ":" + minutes;
}
liveTime.innerHTML = newTime();

function newDate(date) {
  let day = days[now.getDay()];

  return day + ", " + Month + " " + dayNumb + ", " + Year;
}
liveDate.innerHTML = newDate();
//######################### forrcast ##########################
function formatday(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function getForcast(city) {
  apikey = "467056bta9bca10b1ob3b3c4101a5b4f";
  apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}&units=metric`;
  axios.get(apiUrl).then(displayForcast);
}

function displayForcast(response) {
  let forcastDays = response.data.daily;
  let forcastElement = document.querySelector(".forcast");

  let forcastHTML = `<div class="row">`;
  forcastDays.forEach(function (forcastDay, index) {
    if (index > 0) {
      forcastHTML =
        forcastHTML +
        ` <div class="col-2">
            <div class="day-name">${formatday(forcastDay.time)}</div>
              <img
                class="day-img"
                src="${forcastDay.condition.icon_url}"
                alt="" />
              <div class="day-tepm">
                <span class="tempmax">${Math.round(
                  forcastDay.temperature.maximum
                )}°</span>
                <span class="tempmin">${Math.round(
                  forcastDay.temperature.minimum
                )}°</span>
            </div>
         </div>
        `;
    }
  });

  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
}

//################### Search Value + Show Value ################

function showSearch(response) {
  let showsearchtemp = document.querySelector(".degree-top");
  let showsearchcity = document.querySelector(".location-city");
  let showsearchcountry = document.querySelector(".country");
  let showsearchstatus = document.querySelector(".whetherStatus");
  let showsearchhumidity = document.querySelector(".humpercent");
  let showsearchwind = document.querySelector(".windnumb");
  let searchicon = document.querySelector(".centericon");
  let searchLociconlink =
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/";

  celsiusTemp = response.data.temperature.current;

  showsearchtemp.innerHTML = `${Math.round(celsiusTemp)}°`;
  showsearchcity.innerHTML = `${response.data.city}`;
  showsearchcountry.innerHTML = `${response.data.country}`;
  showsearchstatus.innerHTML = `${response.data.condition.description}`;
  showsearchhumidity.innerHTML = `${response.data.temperature.humidity}`;
  showsearchwind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  searchicon.setAttribute(
    "src",
    `${searchLociconlink}${response.data.condition.icon}.png`
  );
  getForcast(response.data.city);
}

function search(city) {
  let apiKey = "467056bta9bca10b1ob3b3c4101a5b4f";
  let units = "metric";
  let apiPoint = "https://api.shecodes.io/weather/v1/current?query=";
  let apiUrl = `${apiPoint}${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showSearch);
}

function getSubmit(event) {
  event.preventDefault();
  let searchBoxText = document.querySelector("#search-text-input");
  search(searchBoxText.value);
}

let form = document.querySelector(".search-form");
form.addEventListener("submit", getSubmit);

search("Bandar-e Anzali");

//######################### Degree ###############################
function displayCelsius(event) {
  event.preventDefault();
  let cecisusTempetuer = document.querySelector(".degree-top");
  cecisusTempetuer.innerHTML = `${Math.round(celsiusTemp)}°`;
}
let cantiDegree = document.querySelector("#btnradio1");
cantiDegree.addEventListener("click", displayCelsius);

function displayFarenhit(event) {
  event.preventDefault();
  let farenhitetemp = document.querySelector(".degree-top");
  farenhitetemp.innerHTML = `${Math.round((celsiusTemp * 9) / 5 + 32)}°`;
}
let farenDegree = document.querySelector("#btnradio3");
farenDegree.addEventListener("click", displayFarenhit);

let celsiusTemp = null;

//########### Current Location  ##########################

function btnLocation(event) {
  function showWeather(response) {
    let showdegree = document.querySelector(".degree-top");
    let locationname = document.querySelector(".location-city");
    let country = document.querySelector(".country");
    let temperature = Math.round(response.data.temperature.current);
    let showLocstatus = document.querySelector(".whetherStatus");
    let showLochumidity = document.querySelector(".humpercent");
    let showLochwind = document.querySelector(".windnumb");
    let showLocicon = document.querySelector(".centericon");
    let showLociconlink =
      "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/";
    showdegree.innerHTML = `${temperature}°`;
    locationname.innerHTML = `${response.data.city}`;
    country.innerHTML = `${response.data.country}`;
    showLocstatus.innerHTML = `${response.data.condition.description}`;
    showLochumidity.innerHTML = `${response.data.temperature.humidity}`;
    showLochwind.innerHTML = `${Math.round(response.data.wind.speed)}`;
    showLocicon.setAttribute(
      "src",
      `${showLociconlink}${response.data.condition.icon}.png`
    );

    getForcast(response.data.city);
  }
  function findPosition(position) {
    let apiKeey = "467056bta9bca10b1ob3b3c4101a5b4f";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiPoint1 = "https://api.shecodes.io/weather/v1/current?lon=";
    let url = `${apiPoint1}${lon}&lat=${lat}&key=${apiKeey}&units=metric`;
    axios.get(url).then(showWeather);
  }
  navigator.geolocation.getCurrentPosition(findPosition);
}

let locationbtn = document.querySelector("#locationbtn");
locationbtn.addEventListener("click", btnLocation);
