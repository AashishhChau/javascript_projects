const apiKey = "0cd246df5f8e2447e6f2c3cdcf5053f1";

const weatherInfo = document.getElementById("weather-info");

async function getWeather() {
    const city = document.getElementById("city").value.trim();
    if(!city){
        showError("Please enter a city name");
        return;
    }
    weatherInfo.innerHTML = `<p class = "loading">Loading weather...</p>`;
    try{
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await res.json();
        if(data.cod !==200){
            showError("City not found");
            return;
        }
        displayWeather(data);
    }
    catch(error){
        showError("Something went wrong. Try again!")
    }
    
}

function displayWeather(data){
    weatherInfo.innerHTML = `
    <div class="weather-card">
        <h3>${data.name}, ${data.sys.country}</h3>
        <h1>${Math.round(data.main.temp)}°C</h1>
        <p>💨 Wind:${data.wind.speed}m/s</p>
        <p>💧 Humidity:${data.main.humidity}%</p>
    </div>`
}
function showError(message){
    `weatherInfo.innerHTML = <p class="error">${message}</p>`;
}