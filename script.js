let currentCityBtn = document.getElementById('currentCity')
let searchCityBtn = document.getElementById('searchCity')
let userCityName = document.getElementById('userCity')
const apiKey = "292a6ddcb97926b600c6d2e9d9dccef3"



// Current Cityyyy Button

function getCurrentCity()
{
    navigator.geolocation.getCurrentPosition(getCurrentCityData , errorCallBack)
    
}

const successCallBack = (position) =>
{
    return fetch( `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=bef5c8229273483eae6619314ac33368`)
    .then(response => response.json())
    .then(data => (data))
    
}

const errorCallBack = (error) =>
{
    if(error.code == 1)
    {
        document.querySelector('.errorMessage').innerHTML = 'User denied location access'
    }
    else if(error.code == 2)
    {
        document.querySelector('.errorMessage').innerHTML = 'Location not found'
    }
    else{
        document.querySelector('.errorMessage').innerHTML = 'Something went wrong'
    }
}

document.addEventListener('keydown' , e =>{
    if(e.key == 'Enter')
    {
        searchCity();
    }

})


// Current city data(geolocation) Fetchh

const getCurrentCityData = async (position) =>
{
    let cityData = await successCallBack(position)
    data = await getWeatherData(cityData.results[0].components.county)
    if(data.cod == 404)
    {
        document.querySelector('.errorMessage').innerHTML = 'Enter a valid city name'
        unsuccessfulFetch()
    
        }
        else{
            document.querySelector('.errorMessage').innerHTML = ''
            showWeatherData(data)
        }
}

// fetch weather data for cityy

const searchCity = async () => 
{
   
    const userCity = userCityName.value
    const data = await getWeatherData(userCity)
    if(data.cod == 404)
    {
    document.querySelector('.errorMessage').innerHTML = 'Enter a valid city name'
    unsuccessfulFetch()

    }
    else{
        document.querySelector('.errorMessage').innerHTML = ''
        showWeatherData(data)
    }
}

const getWeatherData = (userCity) =>
{
     return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=imperial&id=524901&appid=` + apiKey)
    .then(response => response.json())
    .then(data => (data))
    
}


// display weather dataaaa

const showWeatherData = (weatherData) =>
{
    document.getElementById('cityName').innerText = weatherData.name
    document.getElementById('temperature').innerText = Math.floor(`${(weatherData.main.temp -32)*(5/9)}`) + `\xB0` + 'C/' + Math.floor(`${weatherData.main.temp}`) + `\xB0` + 'F'
    document.getElementById('minTemperature').innerText = Math.floor(`${(weatherData.main.temp_min -32)*(5/9)}`) + `\xB0` + 'C/' + Math.floor(`${weatherData.main.temp_min}`) + `\xB0` + 'F'
    document.getElementById('maxTemperature').innerText = Math.floor(`${(weatherData.main.temp_max -32)*(5/9)}`) + `\xB0` + 'C/' + Math.floor(`${weatherData.main.temp_max}`) + `\xB0` + 'F'
    document.getElementById('weather').innerText = weatherData.weather[0].main
}

// invalid cityy namee

const unsuccessfulFetch = () =>
{
    document.getElementById('cityName').innerText = '--'
    document.getElementById('temperature').innerText = '--'
    document.getElementById('minTemperature').innerText = '--'
    document.getElementById('maxTemperature').innerText = '--'
    document.getElementById('weather').innerText = '--'
}