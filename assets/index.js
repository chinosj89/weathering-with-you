let weather = {
  apiKey: "7bdf813513618479b44d9d8a95f26f92",
  fetchWeather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/forecast/?q="
      + city
      + "&cnt=40&appid="
      + this.apiKey
      + "&units=imperial")
      //response learned from youtube https://www.youtube.com/watch?v=WZNG8UomjSI
      .then((response) => response.json())
      .then((data) => this.showWeather(data));
  },

  //Youtube dev created a const per category. I will be placing them under 1 data since I want to take the name of the city and place it in a history 

  showWeather: function (data) {
    document.querySelector(".city").innerText = "Weather in: " + data.city.name;
    var historyPageEl = document.querySelector(".searchHistory")
    var historyPage = localStorage.getItem('searchHistory');
    if (!historyPage) {
      historyPage = [];
    } else {
      historyPage = JSON.parse(historyPage)
    }
    historyPage.push(data.city.name);
    localStorage.setItem('searchHistory', JSON.stringify(historyPage));
    var ulDiv = document.createElement("ul")
    ulDiv.textContent = data.city.name
    historyPageEl.appendChild(ulDiv);


    for (let i = 0; i < 40; i += 8) {
      const weatherInfo = {
        dt: data.list[i].dt,
        temp: data.list[i].main.temp,
        description: data.list[i].weather[0].description,
        icon: data.list[i].weather[0].icon,
        humidity: data.list[i].main.humidity,
        speed: data.list[i].wind.speed,
      };

      //This line worked! 
      //https://stackoverflow.com/questions/59935038/openweathermap-api-forecast-for-only-days 
      var dayDiv = document.getElementById("day" + (i / 8 + 1));
      dayDiv.querySelector(".time").innerText = dayjs.unix(weatherInfo.dt).format('MMM DD YYYY');
      dayDiv.querySelector(".description").innerText = weatherInfo.description;
      dayDiv.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + weatherInfo.icon + ".png";
      dayDiv.querySelector(".temp").innerText = weatherInfo.temp + "°F";
      dayDiv.querySelector(".humidity").innerText = weatherInfo.humidity + "%"
      dayDiv.querySelector(".wind").innerText = "Wind speed: " + weatherInfo.speed + " mph";
      console.log(weatherInfo)
      console.log("Current dayDiv ID:", dayDiv.id);
    }
  }
};


// append name - still an issue of not being able to append data.city.name without having to add this function above. but it loops in with the for loo

function searchWeather(event) {
  event.preventDefault();
  weather.fetchWeather(document.querySelector(".searchBar").value);

  //Removes d-none for history page as well
  var historyPage = document.querySelector(".searchHistory")
  historyPage.classList.remove('d-none')

  // Removes d-none when function runs
  var weatherPages = document.querySelectorAll(".weatherPage")
  weatherPages.forEach(function (weatherPage) {
    weatherPage.classList.remove('d-none');
  });
}
document.querySelector(".searchBtn").addEventListener("submit", searchWeather);

/*document.querySelector(".searchBtn").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    searchWeather(event);
  }
});*/

// TODO:
//remember to add localStorage to save history. Append child to make a list
