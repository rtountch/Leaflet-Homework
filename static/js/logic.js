
var map = L.map("map", {
    center: [33.7537, -84.3863],
    zoom: 2
  });
  

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: "pk.eyJ1IjoicnRvdW50Y2giLCJhIjoiY2s0YWozc2QwMDRlZDNvbXZ1NmNkMHk2NCJ9.BWuWVK7ThnNh5CENfnVRtg"
}).addTo(map);



d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson", function(data) {


  function format_select(one) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: shade(one.properties.mag),
      color: "#303030",
      radius: setRadius(one.properties.mag),
      stroke: true,
      weight: 1.0
    };
  }

  function setRadius(mag) {
    if (mag === 0) {
      return 0.1;
    }

    return mag * 4;
  }

  function shade(mag) {
    switch (true) {
    case mag > 5:
      return "#ff0000";
    case mag > 4.5:
      return "#ff6600";
    case mag > 4:
      return "#ffff00";
    default:
      return "#99ff99";
    }
  }


  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: format_select,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(map);


  
});
