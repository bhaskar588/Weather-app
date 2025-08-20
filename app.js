const apiKey = "3572ed912e53c76dc45128afe01b9102"; // your API key
const btn = document.getElementById("getWeather");
const cityInput = document.getElementById("city");
const weatherBox = document.getElementById("weather");

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) throw data.message;

    const { temp, humidity } = data.main;
    const { description } = data.weather[0];
    const { speed } = data.wind;

    weatherBox.innerHTML = `
      <h2>${data.name}</h2>
      <p><strong>Temperature:</strong> ${temp}°C</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Wind Speed:</strong> ${speed} m/s</p>
      <p><strong>Description:</strong> ${description}</p>
    `;
  } catch (err) {
    weatherBox.textContent = "Error: " + err;
  }
}

// Add event listener to the button
btn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    weatherBox.textContent = "Please enter a city name.";
  }
});
