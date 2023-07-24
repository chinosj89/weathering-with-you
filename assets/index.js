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
    // city name is outside of the for loop since i only want it to appear in one div
    document.querySelector(".city").innerText = "Weather in: " + data.city.name;
    var historyPageEl = document.querySelector(".searchHistory")
    var historyPage = localStorage.getItem('searchHistory');
    // if statement creates the button for the previously searched city but also being able to use that betton to run the showWeather function again.
    // if statement also prevents duplicates within the local storage
    if (!historyPage) {
      historyPage = [];
    } else {
      historyPage = JSON.parse(historyPage)
    }
    if (!historyPage.includes(data.city.name)) {
    historyPage.push(data.city.name);
    localStorage.setItem('searchHistory', JSON.stringify(historyPage))
    var ulDiv = document.createElement("button")
    ulDiv.textContent = data.city.name
    ulDiv.classList.add("button");
    ulDiv.addEventListener("click", function () {
      weather.fetchWeather(data.city.name);
    })
    historyPageEl.appendChild(ulDiv);
  } 

  // for loop appends the data inside the div
// for loop logic: since the the api being used is the 5day/3hr forecast, the logic had to be created this way; i = 0, starts the first element; i < 40 since the count for the parameter is 40 since it is 8 sets of 3 hour intervals so 5 days = 8 sets; i += 8 is an increment to jump by 8 called since that would start a new date. 
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
      document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + data.city.name + "')"
      console.log(weatherInfo)
      console.log("Current dayDiv ID:", dayDiv.id);
    }
  }
};

// function for the submit button and input area
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