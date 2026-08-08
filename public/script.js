// let userCity = document.querySelector(`#cityLabel`);
// let cityTemp = document.querySelector(`#temp`);
// let input = document.querySelector(`#cityInput`);
// let buttonFetch = document.querySelector(`#getWeather`);
// let HumidityInfo = document.querySelector(`#Humidity`);
// let RainInfo = document.querySelector(`#rain`);
// let windInfo = document.querySelector(`#windSpeed`);
// let userTime = document.querySelector(`#userTime`);

// async function getReport(coordinates) {
//   let responseAwait = await fetch(
//     `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.userLat}&longitude=${coordinates.userLong}&hourly=temperature_2m,rain,wind_speed_10m,relative_humidity_2m&forecast_days=1`,
//   );
//   let parsedData = await responseAwait.json();

//   return parsedData;
// }
// async function weatherUpdate(hourCount, coordinates) {
//   let result = await getReport(coordinates);
//   userCity.innerText = `City : ${input.value}`;
//   input.value = "";
//   userTime.value = "";
//   cityTemp.innerText = `Temperature : ${result.hourly.temperature_2m[hourCount]}°C`;
//   HumidityInfo.innerText = `Humidity : ${result.hourly.relative_humidity_2m[hourCount]}%`;
//   RainInfo.innerText = `Rain : ${result.hourly.rain[hourCount]} mm`;
//   windInfo.innerText = `Wind Speed : ${result.hourly.wind_speed_10m[hourCount]} km/h`;
// }

// function getUserTime() {
//   let time = userTime.value;
//   let hourCount = `${time[0]}${time[1]}`;
//   hourCount = Number(hourCount);
//   return hourCount;
// }

// async function getCoordinates() {
//   let responseAwait = await fetch(
//     `https://geocoding-api.open-meteo.com/v1/search?name=${input.value.trim()}&count=1&language=en&format=json`,
//   );
//   let parsedData = await responseAwait.json();

//   return {
//     userLat: parsedData.results[0].latitude,
//     userLong: parsedData.results[0].longitude,
//   };
// }

// buttonFetch.addEventListener(`click`, async (e) => {
//   if (input.value === "") {
//     alert(`Please enter city name`);
//   } else if (userTime.value === "") {
//     alert(`Please Enter the Time `);
//   } else {
//     let coordinates = await getCoordinates();
//     let hourCount = getUserTime();

//     await weatherUpdate(hourCount, coordinates);
//   }
// });
