const apiKey = "61e938efa5a7e68b029f4c8b5893bee4"; // Replace with your real API key

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherInfo = document.getElementById("weatherInfo");
  const weatherTip = document.getElementById("weatherTip");
  const dateTime = document.getElementById("dateTime");

  if (!city) {
    weatherInfo.innerHTML = "Please enter a city name.";
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const humidity = data.main.humidity;
      const wind = data.wind.speed;

      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      weatherInfo.innerHTML = `
        <img src="${iconUrl}" alt="${desc}" />
        <p><strong>Temperature:</strong> ${temp} °C</p>
        <p><strong>Condition:</strong> ${desc}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${wind} m/s</p>
      `;

      weatherTip.innerHTML = getTip(desc);
      changeBackground(desc);
      updateDateTime();
    })
    .catch(error => {
      weatherInfo.innerHTML = "City not found. Please try again.";
      weatherTip.innerHTML = "";
      document.body.style.background = "#e0f7fa"; // fallback
      console.error("Error:", error);
    });
}

function getTip(desc) {
  const condition = desc.toLowerCase();
  if (condition.includes("rain")) return "Tip: Carry an umbrella!";
  if (condition.includes("clear")) return "Tip: Great day for a walk!";
  if (condition.includes("cloud")) return "Tip: Might get gloomy later.";
  if (condition.includes("snow")) return "Tip: Dress warmly!";
  if (condition.includes("thunder")) return "Tip: Stay indoors if possible.";
  return "Tip: Stay safe and hydrated!";
}

function changeBackground(desc) {
  const condition = desc.toLowerCase();
  if (condition.includes("rain")) {
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?rain')";
  } else if (condition.includes("clear")) {
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?sunny')";
  } else if (condition.includes("cloud")) {
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?cloudy')";
  } else if (condition.includes("snow")) {
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?snow')";
  } else {
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?weather')";
  }
}

function updateDateTime() {
  const now = new Date();
  const formatted = now.toLocaleString();
  document.getElementById("dateTime").textContent = `Current Time: ${formatted}`;
}
