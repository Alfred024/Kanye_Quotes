const express = require("express");
const app = express();
const bp = require("body-parser");
const https = require("https");
let randomQuote = "Click the refresh button to get a Kanye quote";


app.use(bp.urlencoded({extends:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function(req, res){
    let randomNum =  Math.floor(Math.random() * 6+1);
    let randomKanyeImg = "kanye"+randomNum+".jpg";
    res.render("quotes", {
        randomQuoteEJS: randomQuote, 
        randomYeImg: randomKanyeImg
    });
});

app.post("/", function(req,res){
    const url = "https://api.kanye.rest/text";

    https.get(url, function(resHTTPS){
        resHTTPS.on("data", function(data){
            randomQuote = data;
            res.redirect("/");
        });
    });
});

app.listen(2024, function(){
    console.log("Server 2024 working");
});

