let weather = {
  apiKey: "7bdf813513618479b44d9d8a95f26f92",
  fetchWeather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/forecast/?q=" 
    + city 
    + "&cnt=5&appid=" 
    + this.apiKey 
    + "&units=imperial")
    //response learned from youtube https://www.youtube.com/watch?v=WZNG8UomjSI
    .then((response) => response.json())
    .then((data) => this.showWeather(data)); 
  },

  //Youtube dev created a const per category. I will be placing them under 1 data since I want to take the name of the city and place it in a history 

  showWeather: function (data) {
    const weatherInfo = {
      name: data.city.name,
      temp: data.list[0].main.temp,
      description: data.list[0].weather[0].description,
      icon: data.list[0].weather[0].icon,
      humidity: data.list[0].main.humidity,
      speed: data.list[0].wind.speed,
    };
    document.querySelector(".city").innerText = "Weather in: " + weatherInfo.name;
    document.querySelector(".description").innerText = weatherInfo.description;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + weatherInfo.icon + ".png";
    document.querySelector(".temp").innerText = weatherInfo.temp + "°F";
    document.querySelector(".humidity").innerText = weatherInfo.humidity + "%"
    document.querySelector(".wind").innerText = "Wind speed: " + weatherInfo.speed + " mph";
    console.log(weatherInfo)
  },
  
};

function searchWeather (event) {
 event.preventDefault();
 weather.fetchWeather(document.querySelector(".searchBar").value);
}

document.querySelector(".searchBtn").addEventListener("submit", searchWeather);
document.querySelector(".searchBtn").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    searchWeather(event);
  }
}); 

// TODO:
  //remember to add localStorage to save history. Append child to make a list
  //remmeber that this is a 5 day forecast. You might have to create/append divs to create different days 