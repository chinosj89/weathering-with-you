# Simple Weather App 
## Deployed Site: 
## User Story:
`AS A traveler`<br />
`I WANT to see the weather outlook for multiple cities`<br />
`SO THAT I can plan a trip accordingly`<br />

## Acceptance Criteria:
`GIVEN a weather dashboard with form inputs`<br />
`WHEN I search for a city`<br />
`THEN I am presented with current and future conditions for that city and that city is added to the search history`<br />
`WHEN I view current weather conditions for that city`<br />
`THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed`<br />
`WHEN I view future weather conditions for that city`<br />
`THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity`<br />
`WHEN I click on a city in the search history`<br />
`THEN I am again presented with current and future conditions for that city`<br />

## Weather App:
![alt](/assets/Images/Screenshot%202023-07-24%20144658.png)

## References: 
I used this youtube video for reference and as a guide to create my app: 
- Fetching the API properly
- Fetching the correct parameters to match the Unsplash images and the city searched
- The transparent background of the boxes

https://www.youtube.com/watch?v=WZNG8UomjSI

### Issues: 
With the referenced youtube, I realized late that it is only calling on the Current Day Api of https://openweathermap.org/ <br />
I then had to study the documentation for the 5 Day / 3 Hour Forecast which was what we were supposed to use. <br />

One of the biggest issue I ran across was the fact that the Api call was the 3 hour intervals. I then found on Stack Overflow https://stackoverflow.com/questions/59935038/openweathermap-api-forecast-for-only-days how to make sure that you are able to call upon 1 full day. <br />
`for (let i = 0; i < 40; i += 8)` <br />
The answer was within this for loop in which you are saying: <br />
- `let i = 0`, to start the first element <br />
- `i < 40`, since the count for the parameter is 40 the loop has to run until the condition is true <br />
- `i += 8`, the Api goes by 8 sets of 3 hour intervals so 5 days = 8 sets and the logic is to increment by 8 thus getting a new day each time. 