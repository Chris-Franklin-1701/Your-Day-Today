

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
