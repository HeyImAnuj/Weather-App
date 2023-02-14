const express = require("express");
const https = require("node:https");
const bodyParser = require("body-parser");

require('dotenv').config();
console.log(process.env.app_Key);

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post('/', function(req, res){
    var data = req.body;
    var city = data.city;
    var country =data.country;
    const appKey = process.env.app_Key;
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+city+","+country+"&appid="+appKey+"&units=metric";
    https.get(url, function(response){
        response.on("data", function(data){
            var weather = JSON.parse(data);
            var temp = weather.main.temp
            var weatherDiscription = weather.weather[0].description
            const imgId = weather.weather[0].icon
            const imgUrl = "http://openweathermap.org/img/wn/"+imgId+"@2x.png"
            res.write("<p>The weather description is "+weatherDiscription+"</p>");
            res.write("<h1>The temprature in "+ city +" is "+ temp+" degrees celcius </h1>");
            res.write(" <img src='"+imgUrl+"' >");
           res.send();
        })
    })
    
})









app.listen(3000, function(){
    console.log("app is listening on port 3000");
})