async function fetchWeather() {
    const apiKey = 'e857da1faed74f0e93d161600241210';
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Shirpur&days=1&aqi=no&alerts=no`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Weather data not found');
        const data = await response.json();
        displayWeather(data);
        renderChart(data.forecast.forecastday[0].hour);
        displayHourlyForecast(data.forecast.forecastday[0].hour);
    } catch (error) {
        console.error('Error:', error);
        const errorMessage = document.createElement('div');
       
        
        document.body.prepend(errorMessage); 
    }
}

function displayWeather(data) {
    const { current } = data;
    document.getElementById('temperature').innerText = `${current.temp_c}°C`;
    document.getElementById('condition').innerText = current.condition.text;
    document.getElementById('feels-like').innerText = `Feels like: ${current.feelslike_c}°C`;
    document.getElementById('visibility').innerText = `Visibility: ${current.vis_km} km`;
    document.getElementById('humidity').innerText = `Humidity: ${current.humidity}%`;
    document.getElementById('wind-speed').innerText = `Wind: ${current.wind_kph} kph`;
    document.getElementById('uv-index').innerText = `UV Index: ${current.uv}`;
    document.getElementById('rain-prob').innerText = `Rain: ${data.forecast.forecastday[0].day.daily_chance_of_rain}%`;
    document.getElementById('weather-icon').src = `https:${current.condition.icon}`;
}

function renderChart(hourlyData) {
    const labels = hourlyData.map(hour => `${new Date(hour.time).getHours()}:00`);
    const temperatures = hourlyData.map(hour => hour.temp_c);

    const ctx = document.getElementById('weather-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}

function displayHourlyForecast(hourlyData) {
    const container = document.getElementById('hourly-forecast');
    container.innerHTML = ''; 

    hourlyData.forEach(hour => {
        const card = document.createElement('div');
        card.classList.add('col-6', 'col-md-3', 'mb-3');
        card.innerHTML = `
            <div class="card p-3 text-center">
                <h6>${new Date(hour.time).getHours()}:00</h6>
                <img src="https:${hour.condition.icon}" alt="Icon" class="mb-2" width="40">
                <p>${hour.temp_c}°C</p>
                <small>${hour.condition.text}</small>
            </div>
        `;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', fetchWeather);
