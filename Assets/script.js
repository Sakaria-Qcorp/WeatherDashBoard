var requestUrl ="https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=ef6f5fe554790837f4d09d8da1f19561";
var locationurl= "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=ef6f5fe554790837f4d09d8da1f19561";
var apiKey = "4bfd3a37d25ea0894f6393508fb91ea2";
var userContainer = document.getElementById("search-container");
var submitBtn = document.querySelector(".submit");
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [] ;





submitBtn.addEventListener("click", getWeather);

function getWeather(){
  //getting the text
  var cityName = document.querySelector(".cityText").value;
  var locationDetect ="https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

  //******pushing city name to localStorage
  if (cityName !== "") {
    searchHistory.push(cityName);
    localStorage.setItem("searchHistory",JSON.stringify(searchHistory));
    
  }

  
fetch(locationDetect)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  // Use the console to examine the response
  console.log(data);

  let lon = data.coord.lon;
  let lat = data.coord.lat;
 // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={API key}
   var otherurl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
   fetch(otherurl)
.then(function (response) {
  return response.json();
})
.then(function (info) {
  //forecast(info.daily)

  //Use the console to examine the response
  console.log(info,data);
  displayMainCard(data,info);
  forecast(data,info);

  
})
})};


///looking up the currentweather


//display 5day forcast

function forecast(data,info) {

  for (var i = 1; i < 5; i++) {

    let forcast = document.getElementById(`day${i}`)
    
        //displays for dates
        var currentDate = moment();
        //currentTime.add("1","hours");
        var newDate = currentDate.add(i,'days');
       


    var dateEl = document.createElement("h3");
    var tempEl = document.createElement("h4");
    //var windSpeedEl = document.createElement("h4");
    var humidityEl =  document.createElement("h4");
    //var uVIndexEl = document.createElement("h4");
    var icon = document.createElement("img");
  
  
    // Assigning the html elements
    var ftemp = Math.floor((info.daily[i].temp.day -273.15) * 1.8 +32);
  
     dateEl.textContent =  newDate.format("L"); ;
      tempEl.textContent = "Temp: "+ ftemp + " F";
      //windSpeedEl.textContent ="Wind Speed: " + info.daily[i].wind_speed;
      humidityEl.textContent = "Humidity: " + info.daily[i].humidity + "%";
      //uVIndexEl.textContent ="Uv Index: " + info.daily[i].uvi
      icon.setAttribute("src", "http://openweathermap.org/img/w/"+ info.daily[i].weather[0].icon + ".png");

      forcast.append(dateEl,icon,tempEl,humidityEl);
      //forcast.setAttribute("style","border: 5px solid black")
      //forcast.setAttribute("class","forecast");

  }

 
  
}

function displayMainCard(data,info){

  var card = document.querySelector(".mainCard")

  var Date = moment().format("L")

  var cityNameEl = document.createElement("h3");
  var tempEl = document.createElement("h4");
  var windSpeedEl = document.createElement("h4");
  var humidityEl =  document.createElement("h4");
  var uVIndexEl = document.createElement("h4");
  var icon = document.createElement("img");


  // Assigning the html elements
  var ftemp = Math.floor((info.current.temp - 273.15) * 1.8 + 32);

    cityNameEl.textContent = data.name +", " + Date;
    tempEl.textContent = "Temp: "+ ftemp + " F";
    windSpeedEl.textContent ="Wind Speed: " + info.current.wind_speed;
    humidityEl.textContent = "Humidity: " + info.current.humidity + "%";
    uVIndexEl.textContent ="Uv Index: " + info.current.uvi
    icon.setAttribute("src", "http://openweathermap.org/img/w/"+ info.current.weather[0].icon + ".png");
   
    card.append(cityNameEl,icon,tempEl,windSpeedEl,humidityEl,uVIndexEl);
  


}

function historyBtn() {
  var SearchEl = document.querySelector(".search-History");
  for (var i = 0; i < searchHistory.length; i++) {
    const btnTitle = searchHistory[i];
  
     var newBtn = document.createElement("button");
     newBtn.textContent = btnTitle;
     newBtn.addEventListener("click", generateBtn);

     SearchEl.append(newBtn);
      
    
  }

}

historyBtn();

function generateBtn(event){
  console.log(event.target.textContent);
  //getting the text
  var cityName = event.target.textContent;
  var locationDetect ="https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
// searchHistory.push(cityName);
 //localStorage.setItem("searchHistory",JSON.stringify(searchHistory));
  
fetch(locationDetect)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  // Use the console to examine the response
  
  let lon = data.coord.lon;
  let lat = data.coord.lat;
 // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={API key}
   var otherurl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
   fetch(otherurl)
.then(function (response) {
  response.json();
})
.then(function (info) {
  displayMainCard(data,info);
  forecast(info.daily);

  //Use the console to examine the response
  //console.log(info,data);
 // displayMainCard(data,info);
  //forecast(data,info);

  
})
})};