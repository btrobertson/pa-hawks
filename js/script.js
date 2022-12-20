const birds = ['rethaw', 'amekes', 'coohaw', 'shshaw', 'perfal', 'reshaw', 'merlin', 'norhar2', 'rolhaw', 'redcro', 'goleag', 'obs'];

function createMap() {
    a.map.placed = L.map(a.map.div, a.map.options);
    new L.control.zoom(a.map.zoomOptions).addTo(a.map.placed);
    L.tileLayer(a.tiles.url, a.tiles.options).addTo(a.map.placed);
    a.layers.totalPointLayer = L.layerGroup();
    locateUI();
    getCountyData();
    loadImage(birds[0]);
    updateData();
}


function locateUI() {
 
    a.location.info = document.querySelector(a.location.feedBack);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (x) {
            a.location.current = [x.coords.latitude, x.coords.longitude];

        }, function (y) {

        }, {
            enableHighAccuracy: true,
            maximumAge: 0,
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}


function geoLocate() {

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
            document.querySelector('#locateFeedback').innerHTML = "Location found";
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
    removeLegend();
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
            document.querySelector('#locateFeedback').innerHTML = "Locating...";
            geoLocate();
             
           // updateData();

        } else {         
          //  a.view.current = 'totals';
          document.querySelector('#locateFeedback').innerHTML = ""; 
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

        let marker = L.circleMarker(latlng, {radius:5, color: 'rgb(102, 51, 0)', fillOpacity:.4, weight: 1});
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
    if(species == null) {
        species = birds[0];
    }
    fname = hawks[species].file;
    getSpeciesData(fname, species);   
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
    });
                           
    drawMap(code);
    drawLegend(code);
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
      }).addTo(a.map.placed);;
     updateMap(dataLayer, code);
}


//function updateMap(pointLayer, code) {
function updateMap(dataLayer, code) {
    a.view.current = 'totals'
    dataLayer.eachLayer(function(layer) {
        const props = layer.feature.properties;
        const coords = layer.feature.geometry.coordinates;

        let county = props.COUNTY_NAME.toLowerCase();
        county = county.replace(county[0], county[0].toUpperCase());
        let tooltipInfo = `<b>${county} County</b><br><b>${hawks[code].name}</b><br><b>Total Observations: ${props.NUMPOINTS}</b>`;
                          
        layer.bindTooltip(tooltipInfo, {
            sticky: true,
        });
        layer.addEventListener("mousedown", function() {
            clearMap();
            countyCode = "US-PA-" + props.FIPS_COUNTY_CODE;    
            addBirdPoints(code, countyCode, county,coords);
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


function addBirdPoints(code, county, countyName, coords) {
    a.view.current = 'county';
    let legendText = `<h4>${hawks[code].name} - ${countyName} County</h4><div class="county-circle"></div><div class="legend-label">Individual observations</div>`;
    updateLegend(legendText);
    let feat = hawks[code].data.data;
    let center;
    a.layers.markers = L.layerGroup();
 
    for (let j of feat) {

        if(j['COUNTY CODE'] == county) {
    
            let latlng = L.latLng(makeRandom(j.LATITUDE), makeRandom(j.LONGITUDE));

            let marker = L.circleMarker(latlng, {radius:5, color: 'rgb(102, 51, 0)', fillOpacity:.4, weight: 1});
            a.layers.markers.addLayer(marker).addTo(a.map.placed);
            
            let tooltipInfo = `<b>${j['COMMON NAME']}</b><br><b>Observation date: </b>${j['OBSERVATION DATE'].toLocaleString()}<br><b>Observer ID: </b>${j['OBSERVER ID']}`;
                          
        marker.bindTooltip(tooltipInfo, {
            sticky: true,
        });
            
        }
    }
    center = [coords[1], coords[0]];
    a.map.placed.setView(center, a.map.options.zoom + 2.5); 
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


/** Switches image on dropdown change **/
function loadImage(code) {
    let imgDiv = document.querySelector("#bird-img");
    imgDiv.innerHTML = `<img src=${hawks[code].image}><p  class="bird-attr">Image by: ${hawks[code].imageAttr}</p>`;

    let bname = document.querySelector("#bird-name");
    bname.innerHTML = `<h2>${hawks[code].name}</h2>`;

    let info = document.querySelector("#bird-des");
    info.innerHTML = `${hawks[code].info}`;
}


function drawLegend(code) {
    let legendText = `<h3>${hawks[code].name}</h3><div class="legend-circle"></div><div class="legend-label">Observation count by county</div>`;
    if(document.querySelector('.legend') == null) {
        const legendControl = L.control({
            position: 'topright'
          });
        
        legendControl.onAdd = function(map) {
            const legend = L.DomUtil.create('div', 'legend');
            return legend;
        };
    
        legendControl.addTo(a.map.placed);
        updateLegend(legendText);
    } else {
        updateLegend(legendText);
    }
}


function updateLegend(text) {
    const legend = document.querySelector('.legend');
      legend.innerHTML = text;
}


function removeLegend() {
    const legend = document.querySelector('.legend');
    if(legend != null) {
        a.map.placed.removeControl(legend);
    }   
}


function getRadius(area) {
    var radius = Math.sqrt(area/Math.PI);
    return radius;
}
 