// Mapbox Access Token
mapboxgl.accessToken =
  "pk.eyJ1IjoiaWxvdmVkdWNrcyIsImEiOiJja2p6emZtejIwY2pzMnBsaW05dWViY29oIn0.4rEirIA_mNlMgkAqbSbZJQ";

// Load Map and Style

const map = new mapboxgl.Map({
  container: "map", // container
  style: "mapbox://styles/iloveducks/clda8ah9x000u01rtnskkk9mh",
  center: [-3.5, 56.5], // map center on Scotland
  zoom: 6,
  attributionControl: false
}).addControl(
  new mapboxgl.AttributionControl({
    customAttribution: "Map design by Rudi Paul"
  })
); //map design credit

map.on("load", () => {
  map.getCanvas().style.cursor =
    "url(https://p-tarmigan.github.io/squirells/squirrel.svg), auto"; // Squirrel cursor

  //Add layer that changes style on hover
  map.addSource("hover", {
    type: "geojson",
    data: { type: "FeatureCollection", features: [] }
  }); //Create Empty Feature Collection

  map.addLayer({
    id: "dz-hover", //adding the empty hover layer
    type: "line",
    source: "hover",
    layout: {},
    paint: {
      "line-color": "black",
      "line-width": 3 //style as thick outline
    },
    maxzoom: 8 //only show when gridded view present
  });

  //Slider interaction code

  //define expressions and filters. filterType deals with the zoomed in point layer, polygon layer is filtertype1.

  //setting intial slider and filter values
  filterType = ["!=", ["get", "Common name"], "placeholder"]; //point species
  filterType2 = ["!=", ["get", "name"], "placeholder"]; //polygon species
  filterYear = ["==", ["get", "Start date year"], 2021]; //point year
  filterYear2 = ["==", ["get", "year"], 2021]; //polygon year

  map.setFilter("grey-red-merged-2", ["all", filterYear2, filterType]); //filter initial point data
  map.setFilter("squirells-dcguii", ["all", filterYear, filterType]); //filter intitial polygon data

  //Get the current month from the slider
  document.getElementById("slider").addEventListener("input", (event) => {
    const year = parseInt(event.target.value);
    // update the filters
    filterYear = ["==", ["get", "Start date year"], year]; //point
    filterYear2 = ["==", ["get", "year"], year]; //polygon

    map.setFilter("squirells-dcguii", ["all", filterYear, filterType]); //set filter point
    map.setFilter("grey-red-merged-2", ["all", filterYear2, filterType2]); //set filter polygon

    // update text in the UI
    document.getElementById("active-year").innerText = year;
  });

  //Radio button interaction code
  document.getElementById("filters").addEventListener("change", (event) => {
    //Get the  value from the activated radio button
    const type = event.target.value;
    // update the map filter - point data
    if (type == "all") {
      filterType = ["!=", ["get", "Common name"], "placeholder"];
    } else if (type == "Eurasian Red Squirrel") {
      filterType = ["==", ["get", "Common name"], "Eurasian Red Squirrel"];
    } else if (type == "Eastern Grey Squirrel") {
      filterType = ["==", ["get", "Common name"], "Eastern Grey Squirrel"];
    } else {
      console.log("error");
    }

    //update the map filter - polygon data
    if (type == "all") {
      filterType2 = ["!=", ["get", "species"], "placeholder"];
    } else if (type == "Eurasian Red Squirrel") {
      filterType2 = ["==", ["get", "species"], "red"];
    } else if (type == "Eastern Grey Squirrel") {
      filterType2 = ["==", ["get", "species"], "grey"];
    } else {
      console.log("error");
    }

    //Set the type filters
    map.setFilter("squirells-dcguii", ["all", filterYear, filterType]);
    map.setFilter("grey-red-merged-2", ["all", filterYear2, filterType2]);
  });

  // Legend

  //Layer names: empty uses dots
  const layers = [
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "..."
  ];

  //colours derived from possible overlays. 16 possible combinations
  const colors = [
    "#ffffff89",
    "#80808089",
    "#40404089",
    "#00000089",
    "#f99e9e89",
    "#d49595c8",
    "#bf8181c8",
    "#ab6c6cc8",
    "#f53d3d89",
    "#d15252c8",
    "#bd3d3dc8",
    "#a82929c8",
    "#91080889",
    "#8c2e2ec8",
    "#781a1ac8",
    "#630505c8"
  ];

  // create legend
  const legend = document.getElementById("legend");

  layers.forEach((layer, i) => {
    const color = colors[i]; //get color for each element
    const key = document.createElement("div");
    key.style.color = color; //text colour
    key.className = "legend-key";
    key.style.backgroundColor = color; //background colour
    key.innerHTML = `${layer}`; //text

    legend.appendChild(key);
  });

  const value = document.createElement("span");
  value.innerHTML = ``;
  item.appendChild(key);
  item.appendChild(value);
  legend.appendChild(item);
});

//hover interaction

map.on("mousemove", (event) => {
  const dzone = map.queryRenderedFeatures(event.point, {
    layers: ["chart-data-84leew"]
  }); // gets data from grid cell that is hovered over - used to populated chart and hover styling

  // Chart Creation - labels are year, data comes from values stored in hover dataset dzone
  new Chart(document.getElementById("myChart"), {
    type: "line",
    data: {
      labels: [
        2000,
        2001,
        2002,
        2003,
        2004,
        2005,
        2006,
        2007,
        2008,
        2009,
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020,
        2021
      ],
      datasets: [
        //grey data
        {
          data: [
            dzone[0].properties.grey2000,
            dzone[0].properties.grey2001,
            dzone[0].properties.grey2002,
            dzone[0].properties.grey2003,
            dzone[0].properties.grey2004,
            dzone[0].properties.grey2005,
            dzone[0].properties.grey2006,
            dzone[0].properties.grey2007,
            dzone[0].properties.grey2008,
            dzone[0].properties.grey2009,
            dzone[0].properties.grey2010,
            dzone[0].properties.grey2011,
            dzone[0].properties.grey2012,
            dzone[0].properties.grey2013,
            dzone[0].properties.grey2014,
            dzone[0].properties.grey2015,
            dzone[0].properties.grey2016,
            dzone[0].properties.grey2017,
            dzone[0].properties.grey2018,
            dzone[0].properties.grey2019,
            dzone[0].properties.grey2020,
            dzone[0].properties.grey2021
          ],
          label: "Grey",
          borderColor: "#746d6d",
          fill: false //styling
        },
        //red data
        {
          data: [
            dzone[0].properties.red2000,
            dzone[0].properties.red2001,
            dzone[0].properties.red2002,
            dzone[0].properties.red2003,
            dzone[0].properties.red2004,
            dzone[0].properties.red2005,
            dzone[0].properties.red2006,
            dzone[0].properties.red2007,
            dzone[0].properties.red2008,
            dzone[0].properties.red2009,
            dzone[0].properties.red2010,
            dzone[0].properties.red2011,
            dzone[0].properties.red2012,
            dzone[0].properties.red2013,
            dzone[0].properties.red2014,
            dzone[0].properties.red2015,
            dzone[0].properties.red2016,
            dzone[0].properties.red2017,
            dzone[0].properties.red2018,
            dzone[0].properties.red2019,
            dzone[0].properties.red2020,
            dzone[0].properties.red2021
          ],
          label: "Red",
          borderColor: "#a30a0a",
          fill: false //styling
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: [dzone[0].properties.TILE_NAME] //tile name is title
      },
      events: [] //disable interactivity
    }
  });

  //populates hover dataset styled above as thick boundary line
  map.getSource("hover").setData({
    type: "FeatureCollection",
    features: dzone.map(function (f) {
      return { type: "Feature", geometry: f.geometry };
    })
  });
});

//Adds navigation controls
map.addControl(new mapboxgl.NavigationControl(), "top-right");

//Adds user geolocation
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  }),
  "top-right"
);

//Token Legend on and off visible
var lbtn = document.getElementsByClassName("legend-button");

lbtn[0].addEventListener("click", function () {
  this.classList.toggle("active");
  var content = this.nextElementSibling;
  if (content.style.display === "block") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
});

var abtn = document.getElementsByClassName("about-button");

abtn[0].addEventListener("click", function () {
  this.classList.toggle("active");
  var content = this.nextElementSibling;
  if (content.style.display === "block") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
});