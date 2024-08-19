const apiKey = '66f995a36361628a77ff75d061ba5805'; 
async function fetchWeather(latitude, longitude) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.main && data.main.temp !== undefined) {
            const temperature = data.main.temp;
            document.querySelector('.weather p').textContent = `${temperature}°C`;
        } else {
            document.querySelector('.weather p').textContent = 'Weather data not available.';
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.querySelector('.weather p').textContent = 'Unable to fetch weather data.';
    }
}
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetchWeather(latitude, longitude);
        }, (error) => {
            console.error('Error getting location:', error);
            document.querySelector('.weather p').textContent = 'Unable to get location.';
        });
    } else {
        document.querySelector('.weather p').textContent = 'Geolocation is not supported by this browser.';
    }
}

// Call the function to get the user's location and fetch the weather data
getUserLocation();