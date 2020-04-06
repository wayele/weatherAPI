
var cityBtn = $(".cityName");

// Function to display the previously searched cities
function RenderBtns(city) {
    var cities = localStorage.getItem('cities');

    // If no cities data, create an array
    // Otherwise, convert the localStorage string to an array
    cities = cities ? cities.split(',') : [];
    console.log(cities)

    // Add new data to localStorage Array
    if (city) {
        cities.push(city);
    }
    // Set cities to local storage array
    localStorage.setItem('cities', cities.toString());
    // Clear the city button div after a search
    cityBtn.empty()
    // For loop to create the previously searched cities and append to button
    for (var i = 0; i < cities.length; i++) {
        var recall = $("<button>").text(cities[i]);
        cityBtn.append(recall);
    }

}

// Function to pull all the weather data from the api call for current weather and uv index
function getInfo(cityName) {

    // Unique API key to add to url
    var APIKey = "c3761f477e44a6f32dc9b9f51d244e21";
    // Build the url with city name and api key
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";


    // Create an AJAX call for the current weather data
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);
        console.log(response);
        // create a moment variable to display current time by changing the format from the response object
        var date = moment.unix(response.dt).format("M/DD/YYYY")
        console.log(date)
        // Use jquery to update the div class for the different weather resuls form the response object
        $(".city").text(response.name + " (" + date + ")");
        $(".temp").text("Temperature: " + response.main.temp + " °F");
        $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");

        // Create a variable to pull the lat and long from the response object
        var location = response.coord;
        // Use the location lat and long to build a new url for the uv index api call
        var uvIndexurl = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + location.lat + "&lon=" + location.lon;
        // Create an ajax call for the uv index data
        $.ajax({
            url: uvIndexurl,
            method: "GET"
        }).then(function (uvResponse) {
            // console.log(uvResponse);
            // Use jquery to update the div class for the uv index result from the repsonse data object
            // If conditin to associate different levels of UV results with their exposure levels and appropriate colors
            var uvStatus = ""
            if (uvResponse.value > 10) {
                uvStatus = "ExtremeUV"
            } else if (uvResponse.value <= 10 && uvResponse.value >= 8) {
                uvStatus = "veryhighUV"
            } else if (uvResponse.value < 8 && uvResponse.value >= 6) {
                uvStatus = "highUV"
            } else if (uvResponse.value < 6 && uvResponse.value >= 3) {
                uvStatus = "mediumUV"
            } else {
                uvStatus = "goodUV"
            }

            $(".uvIndex").html("<span>UV Index: <span class=" + uvStatus + ">" + uvResponse.value + "</span>" + "</span>")

        });
        // Create a variable to build the 5-day forecast url
        var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey + "&units=imperial";
        // Create an ajax call for the 5-day forecast data
        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function (forecastResponse) {
            // console.log(forecastResponse);
            // Pasrse through the forecast response json to get the date, temp, humidity and icon for the 5days
            // Use 12noon as the reference point to get the required data for 5day forecast
            // Day 1 of 5
            var day1data = forecastResponse.list[5].dt_txt;
            // Convert the date from the forecast response data to day1 of the forecast using moment js.
            var day1date = moment(day1data).format('L');
            // console.log(day1date);
            var day1temp = forecastResponse.list[5].main.temp;
            var day1humidity = forecastResponse.list[5].main.humidity;
            var day1icon = forecastResponse.list[5].weather[0].icon;
            // Use jquery to update the div class for the forecast result from the forecast repsonse data object
            $('#day1-date').text(day1date);
            // console.log(day1temp);
            $('#day1-temp').text(day1temp + " °F");
            $('#day1-hum').text("Humidity: " + day1humidity + "%");
            $('#day1-icon').html("<img class='weatherIcon' src='http://openweathermap.org/img/wn/" + day1icon + "@2x.png'>");
            // Day 2 of 5
            var day2data = forecastResponse.list[13].dt_txt;
            var day2date = moment(day2data).format('L');
            var day2temp = forecastResponse.list[13].main.temp;
            var day2humidity = forecastResponse.list[13].main.humidity;
            var day2icon = forecastResponse.list[13].weather[0].icon;
            $('#day2-date').text(day2date);
            $('#day2-temp').text(day2temp + " °F");
            $('#day2-hum').text("Humidity: " + day2humidity + "%");
            $('#day2-icon').html("<img class='weatherIcon' src='http://openweathermap.org/img/wn/" + day2icon + "@2x.png'>");
            // // Day 3 of 5
            var day3data = forecastResponse.list[21].dt_txt;
            var day3date = moment(day3data).format('L');
            var day3temp = forecastResponse.list[21].main.temp;
            var day3humidity = forecastResponse.list[21].main.humidity;
            var day3icon = forecastResponse.list[21].weather[0].icon;
            $('#day3-date').text(day3date);
            $('#day3-temp').text(day3temp + " °F");
            $('#day3-hum').text("Humidity: " + day3humidity + "%");
            $('#day3-icon').html("<img class='weatherIcon' src='http://openweathermap.org/img/wn/" + day3icon + "@2x.png'>");
            // // Day 4 of 5
            var day4data = forecastResponse.list[29].dt_txt;
            var day4date = moment(day4data).format('L');
            var day4temp = forecastResponse.list[29].main.temp;
            var day4humidity = forecastResponse.list[29].main.humidity;
            var day4icon = forecastResponse.list[29].weather[0].icon;
            $('#day4-date').text(day4date);
            $('#day4-temp').text(day4temp + " °F");
            $('#day4-hum').text("Humidity: " + day4humidity + "%");
            $('#day4-icon').html("<img class='weatherIcon' src='http://openweathermap.org/img/wn/" + day4icon + "@2x.png'>");
            // // Day 5 of 5
            var day5data = forecastResponse.list[37].dt_txt;
            var day5date = moment(day5data).format('L');
            var day5temp = forecastResponse.list[37].main.temp;
            var day5humidity = forecastResponse.list[37].main.humidity;
            var day5icon = forecastResponse.list[37].weather[0].icon;
            $('#day5-date').text(day5date);
            $('#day5-temp').text(day5temp + " °F");
            $('#day5-hum').text("Humidity: " + day5humidity + "%");
            $('#day5-icon').html("<img class='weatherIcon' src='http://openweathermap.org/img/wn/" + day5icon + "@2x.png'>");

        });
    });
};
// Call the render buttons function
RenderBtns()
// Create an on click event for the search button
$("#button").on("click", function (event) {
    event.preventDefault();
    // Define a variable for city name being searched
    var cityName = $("#city-input").val();
    // If a city is entered in search box, execute the renderBtns function to add that city to local storage and make the api call to get the data
    if (cityName) {

        RenderBtns(cityName)
        getInfo(cityName)

    }
});
// On click function to display the previously searched cities
$(".cityName").on("click", "button", function () {
    var city = $(this).text();
    // console.log(city);
    $("#city-input").val(city);
    getInfo(city)

})