let weather = {
    apiKey: "7bdf813513618479b44d9d8a95f26f92",
    fetchWeather: function(city) {
        fetch("api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + this.apiKey)
     //learned from youtube to use this.apiKey since we already defined it.
     .then((response) => {
        if(!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
        } return response.json();
     })
     .then((data) => this.showWeather(data));
    },
}