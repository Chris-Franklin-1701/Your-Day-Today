var appleValue = $("#apple-value");
var microsoftValue = $("#microsoft-value");
var amazonValue = $("#amazon-value");
var googleValue = $("#google-value")
var formSubmit = $("#search-btn");
var historyEl = $("#list-history");
var clearBtn = $("clear-btn");
var currentLocation = $("#currentLocation");
var currentLongitude = $("#lon");
var currentLatitude = $("lat");
var currentTemp = $("#temperature");
var currentFeels = $("#feels-like");
var currentMax = $("#temp-max");
var currentMin = $("#temp-min");
var currentPressure = $("#pressure");
var currentHumidity = $("#humidity");
var currentWindSpeed = $("#wind-speed");
var currentUvIndex = $("#uv-index");
var sCity = [];
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
console.log(searchHistory);






$(document).ready(function(){
    console.log("Worked!");
    getValueInfo();
    currentWeather(searchHistory[searchHistory.length-1])
    futureForecast(searchHistory[searchHistory.length-1]);
})

function find(l) {
    for (var i = 0; i < sCity.length; i++){
        if (l.toUpperCase()===sCity[i]){
            return -1
        }
    }
    return 1;
}

function getValueInfo() {

    fetch("https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/quote?symbols=AAPL%2CMSFT%2CAMZN%2CGOOGL&lang=EN&region=US", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "stock-data-yahoo-finance-alternative.p.rapidapi.com",
		"x-rapidapi-key": "4102441971msh65197a98f3e25b3p15b68djsn57948f580054"
	}
})
.then(response => {
	return response.json();
})
.then(function(data){
    console.log(data);

    //$(appleValue).html("<br>"+"$"+data.quoteResponse.result[0].regularMarketPreviousClose);
    //$(microsoftValue).html("<br>"+"$"+data.quoteResponse.result[1].regularMarketPreviousClose);
    //$(amazonValue).html("<br>"+"$"+data.quoteResponse.result[2].regularMarketPreviousClose);
    //$(googleValue).html("<br>"+"$"+data.quoteResponse.result[3].regularMarketPreviousClose);

    var changeApple = data.quoteResponse.result[0].regularMarketChangePercent;
    var changeMicrosoft = data.quoteResponse.result[1].regularMarketChangePercent;
    var changeAmazon = data.quoteResponse.result[2].regularMarketChangePercent;
    var changeGoogle = data.quoteResponse.result[3].regularMarketChangePercent;


    var appleChange = data.quoteResponse.result[0].regularMarketPreviousClose;
    var btnApple = $("<span>").addClass("button is-small").text("$"+appleChange);
    if (changeApple < 0){
        btnApple.addClass("is-danger");
    }else if (changeApple > 0){
        btnApple.addClass("is-success");
    }else{
        btnApple.addClass("is-warning");
    }

    $(appleValue).html(btnApple);


    var microsoftChange = data.quoteResponse.result[1].regularMarketPreviousClose;
    var btnMicrosoft = $("<span>").addClass("button is-small").text("$"+microsoftChange);
    if (changeMicrosoft < 0){
        btnMicrosoft.addClass("is-danger");
    }else if (changeMicrosoft > 0){
        btnMicrosoft.addClass("is-success");
    }else{
        btnMicrosoft.addClass("is-warning");
    }

    $(microsoftValue).html(btnMicrosoft);


    var amazonChange = data.quoteResponse.result[2].regularMarketPreviousClose;
    var btnAmazon = $("<span>").addClass("button is-small").text("$"+amazonChange);
    if (changeAmazon < 0){
        btnAmazon.addClass("is-danger");
    }else if (changeAmazon > 0){
        btnAmazon.addClass("is-success");
    }else{
        btnAmazon.addClass("is-warning");
    }

    $(amazonValue).html(btnAmazon);


    var googleChange = data.quoteResponse.result[3].regularMarketPreviousClose;
    var btnGoogle = $("<span>").addClass("button is-small").text("$"+googleChange);
    if (changeGoogle < 0){
        btnGoogle.addClass("is-danger");
    }else if (changeApple > 0){
        btnGoogle.addClass("is-success");
    }else{
        btnGoogle.addClass("is-warning");
    }

    $(googleValue).html(btnGoogle);

})

};

$(formSubmit).on("click",function(event){
    var location;
    var searchLocation = $("#search-value");
    event.preventDefault();
    console.log("worked?");
    location = searchLocation.val().trim();
    console.log(location);
        currentWeather(location);
        futureForecast(location);
        $("#future-weather").show();
        searchHistory.push(location);
        localStorage.setItem("search",JSON.stringify(searchHistory));
        getSearchHistory();
});

function currentWeather(location) {
    var requestedURL = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&units=imperial&appid=d06b4b9bd23164f4a665e77178e06ab9";


    fetch(requestedURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
                console.log(data);
        

        var lon = data.coord.lon
        var lat = data.coord.lat
        var lastURL ="https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&appid=d06b4b9bd23164f4a665e77178e06ab9";

    fetch(lastURL)
        .then(function(steve){
            return steve.json();
    })
    .then(function(karen){
            console.log(karen);

    
        //}else{
          //  alert("Error");
       // };
    //});
        
        //var weatherIcon = (data.weather[0].icon);
        var iconUrl = "http://openweathermap.org/img/wn/"+ data.weather[0].icon +"@2x.png";
        var currentDate = new Date(data.dt*1000).toLocaleDateString();
        $(currentLocation).html(data.name + " ("+currentDate+") "+"<img src="+iconUrl+">");
        $(currentTemp).html(data.main.temp+"°F");
        $(currentWindSpeed).html(data.wind.speed+" MPH");
        $(currentLongitude).html(data.coord.lon);
        $(currentLatitude).html(data.coord.lat);
        $(currentFeels).html(data.main.feels_like+"°F");
        $(currentPressure).html(data.main.pressure+" inHG");
        $(currentHumidity).html(data.main.humidity+"%");
        $(currentMax).html(data.main.temp_max+"°F");
        $(currentMin).html(data.main.temp_min+"°F");
        
        var uvKaren = karen.current.uvi;
        var btn = $("<span>").addClass("btn btn-sm").text(uvKaren);
        if (uvKaren < 3){
            btn.addClass("btn-success");
        } else if (uvKaren < 7){
            btn.addClass("btn-warning");
        } else {
            btn.addClass("btn-danger");
        }

        $(currentUvIndex).html(btn);

        if (lastURL.cod==200) {
            sCity=JSON.parse(localStorage.getItem("locationName"));
            console.log(sCity);
            if (sCity==null) {
                sCity=[];
                sCity.push(location.toUpperCase());
                localStorage.setItem("locationName",JSON.stringify(sCity));
                addToList(location);
            }else{
                if (find(location)>0){
                    sCity.push(location.toUpperCase());
                    localStorage.setItem("locationName",JSON.stringify(sCity));
                    addToList(location);
                }
            }
        }
        
        
        /*UVIndex(data.coord.lon, data.coord.lat);
        forcast(data.id);
        if(data.cod===200) {
            searchLocation=JSON.parse(localStorage.getItem("locationName"));
            console.log(searchLocation);
            if (searchLocation === null) {
                searchLocation=[];
                searchLocation.push(location.toUpperCase()
                );
                localStorage.setItem("locationName",JSON.stringify(searchLocation));
                addToList(location);
            }else{
                if(find(location)>0){
                    searchLocation.push(location.toUpperCase());
                    localStorage.setItem("locationName",JSON.stringify(searchLocation));
                    addToList(location);
                }
            }
        };*/
    });
    });
};

function futureForecast(location) {
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&units=imperial&appid=d06b4b9bd23164f4a665e77178e06ab9";


    fetch(requestURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
                console.log(data);
        

        var lon = data.coord.lon
        var lat = data.coord.lat
        var lastURL ="https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&appid=d06b4b9bd23164f4a665e77178e06ab9";

    fetch(lastURL)
        .then(function(steve){
            return steve.json();
    })
    .then(function(karen){
            console.log(karen);
    
        for (i = 0; i < 7; i++){
            var date = new Date((karen.daily[(i+1)-1].dt)*1000).toLocaleDateString();
            var icon = karen.daily[(i+1)-1].weather[0].icon;
            var iconUrl = "https://openweathermap.org/img/wn/"+icon+".png";
            var temp = karen.daily[(i+1)-1].temp.day+"°F";
            var humidity = karen.daily[(i+1)-1].humidity+"%";
            var pressure = karen.daily[(i+1)-1].pressure+" inHG";
            var uvIndex = karen.daily[(i+1)-1].uvi;
            var uvBtn = $("<span>").addClass("btn btn-sm").text(uvIndex);
            if (uvIndex < 3){
                uvBtn.addClass("btn-success");
            } else if (uvIndex < 7){
                uvBtn.addClass("btn-warning");
            } else {
                uvBtn.addClass("btn-danger");
            };
    
            



            
            $("#futureDate"+i).html(date);
            $("#futureImg"+i).html("<img src="+iconUrl+">");
            $("#futureTemp"+i).html(temp);
            $("#futureHumidity"+i).html(humidity);
            $("#futurePressure"+i).html(pressure);
            $("#futureUvindex"+i).html(uvBtn);
        }


    });


    });


}


function getSearchHistory(){
if (searchHistory.length > 0){
    currentWeather(searchHistory[searchHistory.length]);
    futureForecast(searchHistory[searchHistory.length]);
};}


/*function getSearchHistory(){
    historyEl.html("");
    for (var i = 0; i < searchHistory.length;i++){
        currentWeather(historyItem.value);
        }
        historyEl.append(historyItem);
};*/



//quote API
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://quotes15.p.rapidapi.com/quotes/random/?language_code=en",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "quotes15.p.rapidapi.com",
		"x-rapidapi-key": "b5cd3c15fcmsha9bad04e5c443d8p12d8fejsn7daab5771468"
	}
};

$.ajax(settings).done(function (response) {

    $("#content").append('"' + response.content + '"')
    $("#name").append("- " + response.originator.name)
});
