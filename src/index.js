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

//################### Search Value + Show Value ################
function search(event) {
  event.preventDefault();
  let searchBoxText = document.querySelector("#search-text-input");
  let cityName = document.querySelector(".location-city");

  function showSearch(response) {
    let showsearchtemp = document.querySelector(".degree-top");
    let showsearchcity = document.querySelector(".location-city");
    let showsearchcountry = document.querySelector(".country");
    let searchtemperature = Math.round(response.data.main.temp);
    showsearchtemp.innerHTML = `${searchtemperature}°`;
    showsearchcity.innerHTML = `${response.data.name}`;
    showsearchcountry.innerHTML = `${response.data.sys.country}`;
  }

  let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
  let units = "metric";
  let city = `${searchBoxText.value}`;
  let apiPoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${apiPoint}${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showSearch);
}
let form = document.querySelector(".search-form");
form.addEventListener("submit", search);

//######################### Degree ###############################
// function degreeC(event) {
//   event.preventDefault();
//   let degree1 = document.querySelector(".degree-top");
//   degree1.innerHTML = "19";
// }
// let cantiDegree = document.querySelector("#btnradio1");
// cantiDegree.addEventListener("click", degreeC);

// function degreeF(event) {
//   event.preventDefault();
//   let degree2 = document.querySelector(".degree-top");
//   degree2.innerHTML = "66";
// }
// let farenDegree = document.querySelector("#btnradio3");
// farenDegree.addEventListener("click", degreeF);

//########### weather API + Weather Live ##########################

function btnLocation(event) {
  function showWeather(response) {
    let showdegree = document.querySelector(".degree-top");
    let locationname = document.querySelector(".location-city");
    let country = document.querySelector(".country");
    let temperature = Math.round(response.data.main.temp);
    showdegree.innerHTML = `${temperature}°`;
    locationname.innerHTML = `${response.data.name}`;
    country.innerHTML = `${response.data.sys.country}`;
  }
  function findPosition(position) {
    let apiKeey = "c8a77112b2faf6684bb4b21a0aa778ae";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiPoint1 = "https://api.openweathermap.org/data/2.5/weather?lat=";
    let url = `${apiPoint1}${lat}&lon=${lon}&units=metric&appid=${apiKeey}`;
    axios.get(url).then(showWeather);
  }
  navigator.geolocation.getCurrentPosition(findPosition);
}

let locationbtn = document.querySelector("#locationbtn");
locationbtn.addEventListener("click", btnLocation);
