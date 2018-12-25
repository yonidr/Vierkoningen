//var map = L.map('map').setView([51.22, 4.4], 12);

/*
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    id: 'mapbox-streets',
    accessToken: 'bikespot'
}).addTo(map);
*/

var stratenplan = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.emerald',
  accessToken: 'pk.eyJ1IjoieW9uaWRyaWprb25pbmdlbiIsImEiOiJjanBjcXVuMHkwYTE2M3VvM2c2bTV3cGYxIn0.2mpKMglwqz4lUPKcBS-uYA'
});

var fietsroutes = L.tileLayer('http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey={apikey}', {
attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
apikey: 'db5ae1f5778a448ca662554581f283c5'
});

//Initialise map for Multiple map selection
var map = L.map('map', { layers: [stratenplan] }).setView([51.22, 4.4], 12);

var baseLayers = {
  "Stratenplan": stratenplan,
  "Fietsroutes": fietsroutes
};

L.control.layers(baseLayers).addTo(map);

map.locate({setView: true, maxZoom: 16});

function onLocationFound(e) {
    var radius = e.accuracy / 2;
    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);
