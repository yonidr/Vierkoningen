var express = require('express');
var request = require('request');
var path = require('path');

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static('public'));

var appListeningOnPort = 'Node luistert op poort 8000';
app.listen(8000, function() {
  console.log(appListeningOnPort);
});

console.log("Webserver draait");

var geodataApi;
request('https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek/MapServer/289/query?where=1=1&outfields=*&f=geojson',

  function(error, response, body){
    geodataApi = JSON.parse(body);

    for(var i=0; i < geodataApi.features.length; i++) {
        console.log(geodataApi.features[i].geometry.coordinates[0]);
    }

  }
);


app.get('/', function(req, res){
  res.render('home',{
    title: "Home"
  });
});

app.get('/bikespot', function(req, res){
  res.render('bikespot',{
    bikespot: geodataApi,
    title: "Bikespot"
  });
});

app.get('/about', function(req, res){
  res.render('about',{
    title: "Over"
  });
});

app.get('/info', function(req, res){
  var bikespotID = req.query.bikespot;
  res.render('info',{
    info: geodataApi,
    title: "Informatie",
    spotID: bikespotID
  });
});

app.get('/contact', function(req, res){
  res.render('contact',{
    title: "Contact"
  });
});
