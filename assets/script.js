var APIkey = 'c40b28aa33c2bef2881ab9e4f13c3ef7';
//var requestURL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=' + APIkey

var cityName = document.getElementById("cityName")
var searchBtn = document.getElementById("searchBtn")
var currentWeatherContainer = document.getElementById("currentWeather");
var fiveDayWeatherContainer = document.getElementById("fiveDayWeather")

function getLatLong (city){
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey
    fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log(data.coord.lat);
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
        currentDate = document.createElement('h2');
        var currentTemp = document.createElement('p');
        var currentWind = document.createElement('p');
        var currentHumidity = document.createElement('p');
        var icon = data.list[0].weather[0].icon

        // 2. Give it content
        currentCity.textContent = data.city.name;
        //currentDate.textContent = moment.unix(data.list[0].dt).format("MM/DD/YYYY");
        currentIcon =
        currentTemp.innerHTML = "Temp: <span>" + data.list[0].main.temp + " F</span>";
        currentWind.innerHTML = "Wind: <span>" + data.list[0].wind.speed + " MPH</span>";
        currentHumidity.innerHTML = "Humidity: <span>" + data.list[0].main.humidity + " %</span>";


        // 3. Add any attributes (optional)
        currentCity.setAttribute('class', 'title')

        // 4. Append the new element to the page
        currentWeatherContainer.append(currentCity, currentTemp, currentWind, currentHumidity)
        

        for (var i =1; i < 6; i++){
            var futureTemp = document.createElement('p');
            var futureWind = document.createElement('p');
            var futureHumidity = document.createElement('p');

            futureTemp.innerHTML = "Temp: <span>" + data.list[i].main.temp + " F</span>";
            futureWind.innerHTML = "Wind: <span>" + data.list[i].wind.speed + " MPH</span>";
            futureHumidity.innerHTML = "Humidity: <span>" + data.list[i].main.humidity + " %</span>";

            fiveDayWeatherContainer.append(futureTemp, futureWind, futureHumidity)
        }








    })


}   



searchBtn.addEventListener("click",function(){
    var city = cityName.value;
    getLatLong (city);


})