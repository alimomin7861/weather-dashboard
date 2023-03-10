var APIkey = 'd67349053c0491694c010eacc6312780';
//var requestURL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=' + APIkey

var cityName = document.getElementById("cityName");
var searchBtn = document.getElementById("searchBtn");
var currentWeatherContainer = document.getElementById("currentWeather");
var fiveDayWeatherContainer = document.getElementById("fiveDayWeather");
var searchHistory = document.getElementById("searchHistory");


function getLatLong (city){
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey
    fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data.coord.lat);
      getForecast (data.coord.lat, data.coord.lon)

    });
}

function getForecast (lat, lon){
    var requestURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + APIkey
    fetch(requestURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);

        // 1. Create the element
        var currentCity = document.createElement('h2');
        var currentDate = document.createElement('h2');
        var currentIcon = document.createElement('img');
        var currentTemp = document.createElement('p');
        var currentWind = document.createElement('p');
        var currentHumidity = document.createElement('p');

        // 2. Give it content
        currentCity.textContent = data.city.name;
        currentDate.textContent = dayjs().format('MM/DD/YYYY');
        //console.log(new Date().toLocaleDateString());
        currentIcon.setAttribute("src",'https://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png')
        currentTemp.innerHTML = "Temp: <span>" + data.list[0].main.temp + " F</span>";
        currentWind.innerHTML = "Wind: <span>" + data.list[0].wind.speed + " MPH</span>";
        currentHumidity.innerHTML = "Humidity: <span>" + data.list[0].main.humidity + " %</span>";


        // 3. Add any attributes (optional)
        currentCity.setAttribute('class', 'title')

        // 4. Append the new element to the page
        currentWeatherContainer.append(currentCity, currentDate, currentIcon, currentTemp, currentWind, currentHumidity)
        

        for (var i =1; i < 35; i+=8){
            var futureDate = document.createElement('h2');
            var futureIcon = document.createElement('img');
            var futureTemp = document.createElement('p');
            var futureWind = document.createElement('p');
            var futureHumidity = document.createElement('p');

            futureDate.textContent = moment(data.list[i+1].dt_txt).format("MM/DD/YYYY");
            futureIcon.setAttribute("src",'https://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png')
            futureTemp.innerHTML = "Temp: <span>" + data.list[i].main.temp + " F</span>";
            futureWind.innerHTML = "Wind: <span>" + data.list[i].wind.speed + " MPH</span>";
            futureHumidity.innerHTML = "Humidity: <span>" + data.list[i].main.humidity + " %</span>";

            fiveDayWeatherContainer.append(futureDate, futureIcon, futureTemp, futureWind, futureHumidity)
        }
    })

}

searchBtn.addEventListener("click",function(){
    currentWeatherContainer.textContent = "";
    fiveDayWeatherContainer.textContent = "";

    var city = cityName.value;
    getLatLong (city);

    var searchedCity = document.createElement('button');
    searchedCity.textContent = cityName.value;
    searchHistory.append(searchedCity);

    
    var previousSearched = JSON.parse(localStorage.getItem("city")) || []
    previousSearched.push(city)
    localStorage.setItem("city", JSON.stringify(previousSearched));
})


searchHistory.addEventListener("click", function(event){
    currentWeatherContainer.textContent = "";
    fiveDayWeatherContainer.textContent = "";
    getLatLong(event.target.textContent)
})

