var appleValue = $("#apple-value");
var microsoftValue = $("#microsoft-value");
var amazonValue = $("#amazon-value");
var googleValue = $("#google-value")


$(document).ready(function(){
    console.log("Worked!");
    getValueInfo();
})

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
    $(microsoftValue).html("<br>"+"$"+data.quoteResponse.result[1].regularMarketPreviousClose);
    $(amazonValue).html("<br>"+"$"+data.quoteResponse.result[2].regularMarketPreviousClose);
    $(googleValue).html("<br>"+"$"+data.quoteResponse.result[3].regularMarketPreviousClose);

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