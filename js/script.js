const birds = ['rethaw', 'amekes', 'coohaw', 'shshaw', 'perfal', 'reshaw', 'merlin', 'norhar2', 'rolhaw', 'redcro', 'goleag', 'obs'];
//const birds = ['rethaw', 'amekes', 'coohaw', 'norhar2', 'shshaw', 'perfal'];
//const birds = ['coohaw', 'rethaw'];

function createMap() {
    a.map.placed = L.map(a.map.div, a.map.options);
    new L.control.zoom(a.map.zoomOptions).addTo(a.map.placed);
    L.tileLayer(a.tiles.url, a.tiles.options).addTo(a.map.placed);
    a.layers.totalPointLayer = L.layerGroup();
    locateUI();
    getCountyData();
    //getBirds(birds[0]);
    loadImage(birds[0]);
    updateData();
}

function locateUI() {
   // a.buttons.locate.placed = document.querySelector(a.buttons.locate.id);
    a.location.info = document.querySelector(a.location.feedBack);
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (x) {
            console.log(x);
            a.location.current = [x.coords.latitude, x.coords.longitude];

        }, function (y) {

        }, {
            enableHighAccuracy: true,
            maximumAge: 0,
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
    /* a.buttons.locate.placed.addEventListener("click", function() {        
        clearMap();  
        geoLocate();
        getData();  
        updateData();
    }); */
}

function geoLocate() {
    //a.buttons.locate.placed.innerHTML = "Locating...";
    a.location.feedBack.innerHTML = "Locating...";
    let hiAcc = false;
    if(L.Browser.mobile) {
        hiAcc = true;
    }
    let bnds = L.latLngBounds();
    let n = 0;
    let timer;
    const nowPosition = function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const latlng = L.latLng(lat, lng);
        bnds.extend(latlng);
        n++;
        
        if (n == 5) {
            clearInterval(timer);
            a.location.center = bnds.getCenter();
            a.location.feedBack.innerHTML = "Location found";
            drawMapOnLocation();
        }
    };

    const error = function (err) {
        a.location.info.innerHTML = `No geolocation available on this browser.`
        console.log(err)
    };

    timer = setInterval(() => {
        navigator.geolocation.getCurrentPosition(nowPosition, error, {
        enableHighAccuracy: hiAcc,
        maximumAge: 0,
        });
    }, 1000);

}

/** Places marker on user's location **/
function drawMapOnLocation() {
    a.layers.marker = L.marker(a.location.center).addTo(a.map.placed);
    console.log("center: " + a.location.center);
    a.map.placed.setView(a.location.center, a.map.options.zoom + 3);
    //removeLegend();
    getData();
}

/** Updats observation map when dropdown is changed **/
function updateData() {
    const dropdown = document.querySelector('#dropdown-ui select');
    dropdown.addEventListener('change', function(e) {
        let species = e.target.value;
      //  console.log(species);
        console.log(a.view.current);
        clearMap();

        if(species == 'obs') {
            //a.view.current = 'local'; 
            geoLocate();
             
           // updateData();

        } else {         
          //  a.view.current = 'totals'; 
            getBirds(species);
            loadImage(species);
        }
        
        
    });
}

/** Uses ebird API to get nearby recent sightings **/
function getData(species) {
    const myKey = "7lldvh8bjeni";
    const myLoc = "US-PA";
    let myHeaders = new Headers();
    
    let url = `https://api.ebird.org/v2/data/obs/geo/recent?back=30&lat=${a.location.center.lat}&lng=${a.location.center.lng}`
   // let url = `https://api.ebird.org/v2/data/obs/${myLoc}/recent/?back=30`;
   //let url = `https://api.ebird.org/v2/data/obs/${myLoc}/historic/2010/11/30`
    myHeaders.append("X-eBirdApiToken", myKey);
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    if(species !== "" && species != null) {
        url = url + "/" + species;
    }

    fetch(url, requestOptions)
    
        .then(response => {
            return response.json();
        })
        .then(result => {
            //a.data.birds = result;
            processData(result);
            displayBirds();
        })       
        .catch(error => console.log('error', error));
}

/** Filters data returned from ebird API call **/
function processData(data) {
   // console.log(data);
    let birdData = [];
    
    for (let j of data) {
        //loop through bird list for a match
        for (i=0; i < birds.length; i++) {
            if(j.speciesCode == birds[i]) {
                birdData.push(j);
            }
        }       
    }

    a.data.birds = birdData;
}

/** Creates markers for data stored in a.data.birds **/
function displayBirds() {
    a.view.current = 'local';
    a.layers.api_markers = L.layerGroup();
    for (let j of a.data.birds) {
        let latlng = L.latLng(makeRandom(j.lat), makeRandom(j.lng));

        let marker = L.circleMarker(latlng, {radius:5, color:'#32814c'});
        marker.bindTooltip(`${j.comName} <br> Count: ${j.howMany}`).openTooltip();
        a.layers.api_markers.addLayer(marker).addTo(a.map.placed);
  
    }

}

/** Opens and stores county boundary data file **/
function getCountyData() {

    fetch("data/Pennsylvania_County_Boundaries.geojson")
        .then(function (response) {
            return response.json();
        })
        .then(function (counties) {   
            a.data.counties = counties;  
        })
        .then(function(){
            drawCounties();
            getBirds(birds[0]);
        })       
        .catch(function (error) {
            console.log(`An error has occurred`, error);
        }); // end fetch and promise chain
        
}

/** Finds file info for selected species **/
function getBirds(species) {
   // console.log(species)
    if(species == null) {
        species = birds[0];
    }
    fname = hawks[species].file;
    getSpeciesData(fname, species); 
    //fetchBirdPoints(species);  
    getCsvData(species);
}

/** Opens and stores bird data files **/
function getSpeciesData(fname, code) {
    
    fetch(`data/${fname}`)
        .then(function(data){
            return data.json();
        })
        .then(function(data) {
            a.data[code] = data;            
            processFileData(code);
        })
        .catch(function (error) {
            console.log(`An error has occurred`, error);
        }); // end fetch and promise chain
}

function fetchBirdPoints(code) {
    //console.log(hawks[code].birdFile)
    fetch(`data/${hawks[code].birdFile}`)
    .then(function(data){
        return data.json();
    })
    .then(function(data) {
        hawks[code].data = data;            
    })
    .catch(function (error) {
        console.log(`An error has occurred`, error);
    }); // end fetch and promise chain
}

/** Assigns breaks for bird data counts **/
function processFileData(code) {
    const counts = [];
    let sum = 0;
    a.data[code].features.sort(function(a, b) {
        return b.properties.NUMPOINTS - a.properties.NUMPOINTS;
    });
    a.data[code].features.forEach(function(county) {
        counts.push(county.properties.NUMPOINTS);
       // sum = sum + county.properties.NUMPOINTS;
        //counts.push(Number(county.properties.NUMPOINTS/county.properties.area));       
    });

    /* for(i=0; i<counts; i++) {
        counts[i] = parseInt(counts[i]/sum);
    } */
      //console.log(counts);
    //  var breaks = chroma.limits(counts, 'e', 5);

     /* var colorize = chroma.scale(chroma.brewer.YlGn)
                           .classes(breaks)
                           .mode('lab'); */
                           
    drawMap(code);
    //drawLegend(code);
}

/** **/
function drawMap(code) { 
    
    const dataLayer = L.geoJson(a.data[code], {
        pointToLayer: function(feature,latlng) {
            return L.circleMarker(latlng, {
              color: '#32814c',
              weight: 1,
              fillColor: '#32814c',
              fillOpacity: .5,
              radius: getRadius(feature.properties.NUMPOINTS)
            });
        },
        
        onEachFeature: function(feature, layer) {
            layer.on("mouseover", function() {
                layer
                    .setStyle({
                        color: "#ffcc00",
                        weight: 2
                    })
                    .bringToFront();
            });

            layer.on("mouseout", function() {
                layer.setStyle({
                    color: "#32814c",
                    weight: 1
                });
            });
            a.layers.totalPointLayer.addLayer(layer);
        }
      }).addTo(a.map.placed);
     // updateMap(pointLayer, code);
     updateMap(dataLayer, code);
}

//function updateMap(pointLayer, code) {
function updateMap(dataLayer, code) {
    a.view.current = 'totals'
    dataLayer.eachLayer(function(layer) {
        const props = layer.feature.properties;
        layer.setStyle({
       // fillColor: colorize(Number(props.NUMPOINTS))
        });
        let county = props.COUNTY_NAME.toLowerCase();
        county = county.replace(county[0], county[0].toUpperCase());
        let tooltipInfo = `<b>${county} County</b><br><b>${hawks[code].name}</b><br><b>Total Observations: ${props.NUMPOINTS}</b>`;
                          
        layer.bindTooltip(tooltipInfo, {
            sticky: true,
        });
        layer.addEventListener("mousedown", function() {
            clearMap();
            countyCode = "US-PA-" + props.FIPS_COUNTY_CODE;    
            addBirdPoints(code, countyCode);
        });
      
    });
    
    a.map.placed.setView(a.map.options.center, a.map.options.zoom);
}

function drawCounties() {
   // console.log(a.data.counties)
    a.layers.countyLayer = L.geoJson(a.data.counties, {
        style: function () {
          return {
            color: "#d9d9d9",
            weight: 1,
          };
        }
        
    }).addTo(a.map.placed);
   
}

function addBirdPoints(code, county) {
    a.view.current = 'county';

    let feat = hawks[code].data.data;
    let center;
    a.layers.markers = L.layerGroup();
   // console.log(feat);
    for (let j of feat) {
     //   console.log(county)
        if(j['COUNTY CODE'] == county) {
          //  console.log(j.properties['COUNTY CODE'])
            let latlng = L.latLng(makeRandom(j.LATITUDE), makeRandom(j.LONGITUDE));

            let marker = L.circleMarker(latlng, {radius:5, color: '#32814c'});
            //marker.bindTooltip(`${j.comName} <br> Count: ${j.howMany}`).openTooltip();
            a.layers.markers.addLayer(marker).addTo(a.map.placed);
            //change this to do a look up to set to county center
            center = [j.LATITUDE, j.LONGITUDE];
            
            let tooltipInfo = `<b>${j['COMMON NAME']}</b><br><b>Observation date: </b>${j['OBSERVATION DATE'].toLocaleString()}<br><b>Observer ID: </b>${j['OBSERVER ID']}`;
                          
        marker.bindTooltip(tooltipInfo, {
            sticky: true,
        });
            
        }
    }
   
    a.map.placed.setView(center, a.map.options.zoom + 2);
   
}

function makeRandom(coord) {
    const sign = Math.random() < 0.5 ? -1 : 1;
    return Number(coord) + (Math.random() * 0.001 * sign);
}

function getCsvData(code) { 
    Papa.parse(`data/${hawks[code].birdFile}`, {
        download: true,
        header: true,
        complete: function(data) {
        hawks[code].data = data;
        }
    });    
}

/** Removes layers to display point location map **/
function clearTotals() {
    a.layers.totalPointLayer.eachLayer(function (layer) { 
        a.map.placed.removeLayer(layer);
        
    });
}

function clearMap() {
    if(a.view.current == 'totals') {
        clearTotals();
    } else if(a.view.current == 'county') {
        clearCountyMarkers(a.layers.markers);
    } else if(a.view.current == 'local') {
        clearLocationMarker();
        clearCountyMarkers(a.layers.api_markers);
    }
}

function clearCountyMarkers(l) {
    //console.log(a.layers.markers)
    if(l != null) {
        console.log("remove bird markers")
        l.eachLayer(function (layer) {
            console.log(layer);
            a.map.placed.removeLayer(layer);
        });
    }
}
    
function clearLocationMarker() {
    if(a.layers.marker != null) {
        console.log("remove location marker")
        a.map.placed.removeLayer(a.layers.marker);
    }
}

    

    /* a.map.placed.eachLayer(function(layer) {
        console.log(layer._leaflet_id)
        console.log(a.ids)
        for(let i=0; i < a.ids.length; i++) {
            if(layer._leaflet_id == a.ids[i]) {
                a.map.placed.removeLayer(layer);
            }
        }
    });   
    */
    
    /* a.map.placed.eachLayer(function(layer) {
        if(layer._leaflet_id != 70 && layer._leaflet_id != 26) {
            a.map.placed.removeLayer(layer);
        }
    }); 
}*/

/** Switches image on dropdown change **/
function loadImage(code) {
    let imgDiv = document.querySelector("#bird-img");
    imgDiv.innerHTML = `<img src=${hawks[code].image}><p>${hawks[code].imageAttr}</p>`;

    let bname = document.querySelector("#bird-name");
    bname.innerHTML = `<h2>${hawks[code].name}</h2>`;
}

function drawLegend(code) {
    if(document.querySelector('.legend') == null) {
        const legendControl = L.control({
            position: 'topright'
          });
        
        legendControl.onAdd = function(map) {
            const legend = L.DomUtil.create('div', 'legend');
            return legend;
        };
    
        legendControl.addTo(a.map.placed);
        updateLegend(code);
    } else {
        updateLegend(code);
    }
    

}

function updateLegend(code) {
    const legend = document.querySelector('.legend');
      legend.innerHTML = `<h3>${hawks[code].name}</h3><div class="legend-circle"></div><div class="legend-label">Observation count by county</div>`;
}

/* function updateLegend(breaks, colorize, code) {
    const legend = document.querySelector('.legend');
      legend.innerHTML = `<h3>${hawks[code].name}</h3><ul>`;
      
      for (let i=0; i < breaks.length - 1; i++) {
        const color = colorize(breaks[i], breaks);
        const classRange = `<li><span style="background:${color}"></span>
          ${parseInt(breaks[i])} &ndash;
          ${parseInt(breaks[i+1])} </li>`;

          legend.innerHTML += classRange;
      }

      legend.innerHTML += "</ul>";
} */

function removeLegend() {
    const legend = document.querySelector('.legend');
    a.map.placed.removeControl(legend);
}

function getRadius(area) {
    var radius = Math.sqrt(area/Math.PI);
    return radius;
}
 