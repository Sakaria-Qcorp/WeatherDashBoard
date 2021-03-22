var requestUrl ="https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=ef6f5fe554790837f4d09d8da1f19561";
var locationurl= "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=ef6f5fe554790837f4d09d8da1f19561";
var apiKey = "ef6f5fe554790837f4d09d8da1f19561";
var userContainer = document.getElementById("search-container");
var submitBtn = document.querySelector(".submit");
var card = document.querySelector(".card")
var date = moment().format("MM/DD/YYYY");


/* 
var locationDetect = "https://api.openweathermap.org/data/2.5/weather?q=" + texbox input + "&appid=ef6f5fe554790837f4d09d8da1f19561";
*/
submitBtn.addEventListener("click", getApi);

function getApi(){
  var cityName = document.querySelector(".cityText").value;
  var locationDetect ="https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=ef6f5fe554790837f4d09d8da1f19561";
 
  
fetch(locationDetect)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  // Use the console to examine the response
  console.log(data);

  var cityNameEl = document.createElement("h3");
  var tempEl = document.createElement("h4");
  var windSpeedEl = document.createElement("h4");
  var humidityEl =  document.createElement("h4");
  var uVIndexEl = document.createElement("h4");
  var icon = document.createElement("img");
  var ftemp = Math.floor((data.main.temp -273.15) * 1.8 +32);

    cityNameEl.textContent = data.name +", " + date;
    tempEl.textContent = "Temp: "+ ftemp + " F";
    windSpeedEl.textContent ="Wind Speed: " + data.wind.speed;
    humidityEl.textContent = "Humidity: " + data.main.humidity + "%";
    uVIndexEl.textContent ="Uv Index: " + getUvIndex(data);
    icon.setAttribute("src", "http://openweathermap.org/img/w/"+ data.weather[0].icon + ".png");
    //dateEl.textContent = date;

    /*userLat.innerHTML = data.coord.lat;
    userLon.innerHTML = data.coord.lon;
    userContainer.append(userLat);
    userContainer.append(userLon);
    */
    card.append(cityNameEl);
   // card.append(dateEl);
    card.append(icon);
    card.append(tempEl);
    card.append(windSpeedEl);
    card.append(humidityEl);
    card.append(uVIndexEl);
    
    //console.log(userLat,userLon);
     

})};


//pulling info more the textbox;



///looking up the currentweather
 function getUvIndex(object) {

  var lon = object.coord.lon;
  var lat = object.coord.lat;
 // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={API key}
   var otherurl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
   fetch(otherurl)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  // Use the console to examine the response
  console.log(data.uvi);

    
  
})

}

   
 