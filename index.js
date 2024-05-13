const months = [
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
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getLocation() {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // User allowed location access, use the data here (e.g., latitude, longitude)
      let lati = position.coords.latitude;
      let longi = position.coords.longitude;

      let val = lati + "," + longi;
      weatherapi(val);
    },
    function (error) {
      console.error("Error getting location:", error);
      // Handle location access denial
    }
  );
}
async function weatherapi(val) {
  try {
    let content = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=1d2eee7cac28452a84653022240704&q=${val}&aqi=no`
    );

    let data = await content.json();
    changeVal(data);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
document.querySelector(".search-btn").addEventListener("click", (e) => {
  e.preventDefault();
  let data = document.querySelector(".search-bar").value;
  if (data != "") {
    weatherapi(data);
  }
});

function changeVal(data) {
  document.querySelector(".location_data").innerHTML =
    data.location.name +
    "," +
    data.location.region +
    "<br>" +
    data.location.country;

  let date = new Date(data.location.localtime);
  let month = months[date.getMonth()];
  let day = date.getDate();
  let dayOfWeek = days[date.getDay()];
  let formattedDate = `${month} ${day} <br> ${dayOfWeek}`;
  document.querySelector(".day1").innerHTML = formattedDate;

  document.querySelector("#t").innerHTML = data.current.temp_c + "°";
  document.querySelector(".feelTemp").innerHTML =
    "Feels like " + data.current.feelslike_c + "°";

  if (data.current.is_day == 0) {
    //night
    document.body.style.backgroundImage = `url("/Assets/Night.jpg")`;
    document.body.style.color = "#ffffff";
    document.body.style.textShadow = " 3px 3px 1px #121212";
  } else {
    //day
    document.body.style.color = "black";
    document.body.style.textShadow = " 1px 1px 1px #fff";
    document.body.style.backgroundImage = `url("/Assets/Day.jpg")`;
  }

  document.querySelector(".weather").innerText = data.current.condition.text;

  document.getElementById("pressure").innerText =
    data.current.pressure_mb + " mb";
  document.getElementById("humidity").innerText = data.current.humidity + " %";
  document.getElementById("uv").innerText = data.current.uv;
  document.getElementById("windDirection").innerText = data.current.wind_dir;
  document.getElementById("windSpeed").innerText =
    data.current.wind_kph + " km/h";

  const weatherCode = data.current.condition.code; // Example weather code, you can replace it with the actual weather code
  let str = "";
  if (weatherCode == 1000) {
    str = "Sunny.jpeg";
  } 
  else if (weatherCode == 1003) {
    str = "PartlyCloudy.png";
  } 
  else if (weatherCode == 1006 || weatherCode == 1009) {
    str = "Cloudy_Overcast.jpeg";
  } 
  else if (
    weatherCode == 1063 ||
    weatherCode == 1180 ||
    weatherCode == 1183 ||
    weatherCode == 1186 ||
    weatherCode == 1189 ||
    weatherCode == 1192 ||
    weatherCode == 1195 ||
    weatherCode == 1240 ||
    weatherCode == 1243 ||
    weatherCode == 1246 ||
    weatherCode == 1273 ||
    weatherCode == 1276){
    str = "Rainy.jpeg";
  }
  else if (
    weatherCode == 1066 ||
    weatherCode == 1210 ||
    weatherCode == 1213 ||
    weatherCode == 1216 ||
    weatherCode == 1219 ||
    weatherCode == 1222 ||
    weatherCode == 1225 ||
    weatherCode == 1255 ||
    weatherCode == 1258 ||
    weatherCode == 1279 ||
    weatherCode == 1282){
    str = "Snowy.jpeg";
  }
  else if (weatherCode == 1030 || weatherCode == 1135) {
    str = "Foggy.jpeg";
  }
  else if(
    weatherCode == 1087 ||
    weatherCode == 1273 ||
    weatherCode == 1276) {
    str = "Thunderstorm.jpeg";
  } 
  else if (weatherCode == 1114 || weatherCode == 1117) {
    str = "Wind.jpeg";
  } 
  else {
    document.querySelector(
      ".image"
    ).innerHTML ="Unknown weather condition";
  }
  document.querySelector(
    ".image"
  ).innerHTML = `<img src="/Assets/${str}" width=320px alt="Weather Icon">`;
}

getLocation();

/*
current
: 
cloud
: 
46
condition
: 
{text: 'Partly Cloudy', icon: '//cdn.weatherapi.com/weather/64x64/night/116.png', code: 1003}
feelslike_c
: 
25.4
feelslike_f
: 
77.7
gust_kph
: 
17.2
gust_mph
: 
10.7
humidity
: 
41
is_day
: 
0
last_updated
: 
"2024-04-13 22:15"
last_updated_epoch
: 
1713026700
precip_in
: 
0
precip_mm
: 
0
pressure_in
: 
29.88
pressure_mb
: 
1012
temp_c
: 
25
temp_f
: 
77
uv
: 
1
vis_km
: 
10
vis_miles
: 
6
wind_degree
: 
34
wind_dir
: 
"NE"
wind_kph
: 
10.4
wind_mph
: 
6.5
*/
