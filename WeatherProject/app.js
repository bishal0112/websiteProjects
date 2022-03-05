const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");

const app = express();
app.use(urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
   
    
});

app.post("/", function(req, res){
    
    const query = req.body.city;
    const apiKey = "240aa64afe93577f8732dabbc0ba8b88";
    const units = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ units +"&appid="+ apiKey;


    https.get(url, function(response){
    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const WeatherDesc = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
        res.write("<p>Today's forcast is: " + WeatherDesc + "</p>");
        res.write("<h1>The temperature in "+ query +" is :" + temp + "degree celcius</h1>");
        res.write("<img src="+ imageUrl +">");
        res.send();
    });
});
})




app.listen(3000, function(){
    console.log("Listening on port: 3000");
});