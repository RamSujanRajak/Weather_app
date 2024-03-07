const userTab = document.querySelector("[data-userWeather]") //your weather 
const searchTab = document.querySelector("[data-searchWeather]") // search weather
const userContainer = document.querySelector(".weather-container")

const grantAccessContainer = document.querySelector(".grant-location-container")
const searchForm = document.querySelector("[data-searchForm]")
const  loadingScreen = document.querySelector(".loading-container")
const userInfoContainer = document.querySelector(".user-info-container")

//inetaly variable 
let currentTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
currentTab.classList.add("current-tab")
getfromSessionStorage();

function switchTab(clickedTab){
    if(clickedTab !=currentTab){
        currentTab.classList.remove("current-tab")
        currentTab = clickedTab;
        currentTab.classList.add("current-tab")

        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active")
            grantAccessContainer.classList.remove("active")
            searchForm.classList.add("active");
        }
        else{
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click", ()=>{
    switchTab(userTab)
});

searchTab.addEventListener("click", ()=>{
    switchTab(searchTab)
});

// check if cordinates are already present in session storage

function getfromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-Coordinates");
    if(!localCoordinates){
        // agar local coordinates present ni hai to ese dikhap
        grantAccessContainer.classList.add("active");
    }
    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates)
    }
}

async function fetchUserWeatherInfo(coordinates){
    const {lat,lon} = coordinates;
    //make grantContainer invisibal
    grantAccessContainer.classList.remove("active")

    loadingScreen.classList.add("active");

    // API call
    try{
        const responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const data = await responce.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data)
        console.log(data)
    }
    catch(err){
        //home work
        loadingScreen.classList.remove("active");
    }
}

function renderWeatherInfo(weatherInfo){
    // firstly we have to fetch the element 
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]")
    const desc = document.querySelector("[data-weatherFesc]")
    const weatherIcon = document.querySelector("[data-weatherIcon]")
    const temp = document.querySelector("[data-temp]")
    const windspeed = document.querySelector("[data-windspeed]")
    const humidity = document.querySelector("[data-humidity]")
    const cloudiness = document.querySelector("[data-cloudiness]")

    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = weatherInfo?.clouds.all;
}


function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        console.log("hello")
    }
    
}

function showPosition(position){
    const userCoordinates = {
        lat : position.coords.latitude,
        lon : position.coords.longitude,
    }
    sessionStorage.setItem("user-Coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates)
}

const grantAccessButton = document.querySelector("[data-grantAccess]")
grantAccessButton.addEventListener("click",getLocation);

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName==="")
        return;
    else
        fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data =await response.json();
        loadingScreen.classList.remove("active")
        userInfoContainer.classList.add("active")
        renderWeatherInfo(data);
    }
    catch(err){

    }
}












// const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
// showWeather()
// getCustomWeatherDetails()
// getLocation()
// function getDatainDocument(data){
//     let newPera = document.createElement('h1');
//         newPera.textContent = `${data?.main?.temp.toFixed(2)} °C` // yaha per ham API ke Json me se temprature le rahe hai  data->main->temp  
    
//         document.body.appendChild(newPera);
// }

// async function showWeather(){
//     try{
//         let city = "jabalpur";
    
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
//         const data =await response.json();
//         console.log("Weather data:->", data);
    
//         getDatainDocument(data);
//     }
//     catch(err){
//         console.log("some error accures ",err) 
//     }

// }

// async function getCustomWeatherDetails(){
//     try{
//         let latitude = 15.6333;
//         let longitude = 18.3333;

//         let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
//         let data = await result.json();

//         console.log("latitude and longitude data ->",data);
//     }
//     catch(err){
//         console.log("error found Ram Bhai", err)
//     }
    
// }

// console.log("Current URL: " + location.href);
// console.log("Protocol: " + location.protocol);
// console.log("Hostname: " + location.hostname);
// console.log("Path: " + location.pathname);

// function getLocation(){
//     if(nvigator.getLocation){
//         navigator.geolocation.getCurrentPosition(shoePosition);
//     }
//     else{
//         console.log("NoT Found");
//     }
// }

// function shoePosition(){
//     let lati = position.coords.latitude;
//     let long = position.coords.longitude;

//     console.log(lati);
//     console.log(long);
// }

