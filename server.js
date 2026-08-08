import express from "express";

const port = 8080;
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const toRenderData = {
    temperature: "NA",
    humidity: "NA",
    rain: "NA",
    windSpeed: "NA",
  };

  res.render("index", { toRenderData });
});

app.post("/weather", async (req, res, next) => {
  console.log(req.body);
  const city = req.body.usercity;
  const selectedTime = req.body.selectedTime;

  const coordinates = await getCoordinates(city);
  console.log(coordinates);
  const weatherData = await getWeatherData(coordinates);
  const selectedHour = getSelectedHour(selectedTime);

  let toRenderData = displayWeatherData(weatherData, selectedHour, city);
  res.render("index", { toRenderData });
});

async function getCoordinates(city) {
  const apiResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city.trim()}&count=1&language=en&format=json`,
  );

  const data = await apiResponse.json();

  return {
    latitude: data.results[0].latitude,
    longitude: data.results[0].longitude,
  };
}

function getSelectedHour(selectedTime) {
  let selectedHour = `${selectedTime[0]}${selectedTime[1]}`;

  selectedHour = Number(selectedHour);

  return selectedHour;
}

async function getWeatherData(coordinates) {
  const apiResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&hourly=temperature_2m,rain,wind_speed_10m,relative_humidity_2m&forecast_days=1`,
  );

  const data = await apiResponse.json();

  return data;
}

function displayWeatherData(weatherData, selectedHour, city) {
  const temperature = `${weatherData.hourly.temperature_2m[selectedHour]}°C`;

  const humidity = `${weatherData.hourly.relative_humidity_2m[selectedHour]}%`;

  const rain = `${weatherData.hourly.rain[selectedHour]} mm`;

  const windSpeed = `${weatherData.hourly.wind_speed_10m[selectedHour]} km/h`;

  return {
    city,
    temperature,
    humidity,
    rain,
    windSpeed,
  };
}

app.listen(port, () => {
  console.log("Server is Live");
});
