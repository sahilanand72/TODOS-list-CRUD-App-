const cityInput = document.querySelector(".inputter");
const searchButton = document.querySelector(".searchBut");
// const API_KEY = "1ed0895d0fac92238eb0dc530ab761cc";

const getWeatherDetails = (cityName, lat, lon) => {
    const WEATHER_API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&timezone=auto`;

    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
        console.log(data);
    }).catch(() => {
        alert("An error occured while fetching the coordinates!");
    });
}

const getCityCoordinates = () =>{
    const cityName = cityInput.value.trim();
    if(!cityName) return;
   
    const GEOCODING_API_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`;
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data =>{
        if(!data.length) return alert(`No coordinates found for ${cityName}`);
        const{name,lat,lon} = data[0];
        getWeatherDetails(name,lat,lon);
        console.log(data)
    }).catch(() => {
        alert("An error occured while fetching the coordinates")
    })
}

searchButton.addEventListener("click",getCityCoordinates);