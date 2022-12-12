const birds = ['rethaw', 'amekes', 'coohaw', 'shshaw', 'perfal', 'reshaw', 'merlin', 'norhar2', 'rolhaw', 'redcro', 'goleag', 'obs'];
//const birds = ['rethaw', 'amekes', 'coohaw', 'norhar2', 'shshaw', 'perfal'];
//const birds = ['coohaw', 'rethaw'];

function createMap() {
    a.map.placed = L.map(a.map.div, a.map.options);
    new L.control.zoom(a.map.zoomOptions).addTo(a.map.placed);
    L.tileLayer(a.tiles.url, a.tiles.options).addTo(a.map.placed);
    locateUI();
    getCountyData();
    getBirds(birds[0]);
    loadImage(birds[0]);
}

function locateUI() {
   // a.buttons.locate.placed = document.querySelector(a.buttons.locate.id);
    a.location.info = document.querySelector(a.location.feedBack);
    
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
    L.marker(a.location.center).addTo(a.map.placed);
   // console.log(a.location.center);
    a.map.placed.setView(a.location.center, a.map.options.zoom + 3);
    removeLegend();
    getData();
}

/** Updats observation map when dropdown is changed **/
function updateData() {
    const dropdown = document.querySelector('#dropdown-ui select');
    dropdown.addEventListener('change', function(e) {
        let species = e.target.value;
       // console.log(species);
        if(species == 'obs') {
            clearMap();  
            geoLocate();
            getData();  
            updateData();

        } else {
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
 
    for (let j of a.data.birds) {
        let latlng = L.latLng(makeRandom(j.lat), makeRandom(j.lng));

        let marker = L.circleMarker(latlng, {radius:5, color:'#32814c'});
        marker.bindTooltip(`${j.comName} <br> Count: ${j.howMany}`).openTooltip();
        marker.addTo(a.map.placed);
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
    a.data[code].features.forEach(function(county) {
        counts.push(Number(county.properties.NUMPOINTS));
        sum = sum + county.properties.NUMPOINTS;
        //counts.push(Number(county.properties.NUMPOINTS/county.properties.area));       
    });

    for(i=0; i<counts; i++) {
        counts[i] = parseInt(counts[i]/sum);
    }
      //console.log(counts);
      var breaks = chroma.limits(counts, 'e', 5);

      var colorize = chroma.scale(chroma.brewer.YlGn)
                           .classes(breaks)
                           .mode('lab'); 
                           
    drawMap(colorize, code);
    drawLegend(breaks, colorize, code);
}

/** **/
function drawMap(colorize, code) {
    const dataLayer = L.geoJson(a.data[code], {
        style: function (feature) {
          return {
            color: "#d9d9d9",
            weight: 1,
            fillOpacity: 1,
            fillColor: "#1f78b4"
          };
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
                    color: "#d9d9d9",
                    weight: 1
                });
            });
        }
      }).addTo(a.map.placed);
      updateMap(dataLayer, colorize, code);
}

function updateMap(dataLayer, colorize, code) {
    
    dataLayer.eachLayer(function(layer) {
        const props = layer.feature.properties;
        layer.setStyle({
        fillColor: colorize(Number(props.NUMPOINTS))
        });

        let tooltipInfo = `<b>${hawks[code].name}</b><br><b>${props.NUMPOINTS}</b>`;
                          
        layer.bindTooltip(tooltipInfo, {
            sticky: true,
        });
        layer.addEventListener("mousedown", function() {
            countyCode = "US-PA-" + props.FIPS_COUNTY_CODE;  
           // console.log(countyCode);   
            addBirdPoints(code, countyCode);
        });
        
    });
    
    a.map.placed.setView(a.map.options.center, a.map.options.zoom);
}

function addBirdPoints(code, county) {
    clearMap()
   // console.log(hawks[code].data.data[0])
    //let feat = hawks[code].data.features;
    let feat = hawks[code].data.data;
    let center;
    //console.log(feat);
    for (let j of feat) {
     //   console.log(county)
        if(j['COUNTY CODE'] == county) {
          //  console.log(j.properties['COUNTY CODE'])
            let latlng = L.latLng(makeRandom(j.LATITUDE), makeRandom(j.LONGITUDE));

            let marker = L.circleMarker(latlng, {radius:5, color: '#32814c'});
            //marker.bindTooltip(`${j.comName} <br> Count: ${j.howMany}`).openTooltip();
            marker.addTo(a.map.placed);
            center = [j.LATITUDE, j.LONGITUDE];
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
        });//end of Papa.parse()    
}

/** Removes layers to display point location map **/
function clearMap() {
    a.map.placed.eachLayer(function(layer) {
        if(layer._leaflet_id != 26) {
            a.map.placed.removeLayer(layer);
        }
    });
}

/** Switches image on dropdown change **/
function loadImage(code) {
    let imgDiv = document.querySelector("#bird-img");
    imgDiv.innerHTML = `<img src=${hawks[code].image}><p>${hawks[code].imageAttr}</p>`;

    let bname = document.querySelector("#bird-name");
    bname.innerHTML = `<h2>${hawks[code].name}</h2>`;
}

function drawLegend(breaks, colorize, code) {
    if(document.querySelector('.legend') == null) {
        const legendControl = L.control({
            position: 'topright'
          });
        
        legendControl.onAdd = function(map) {
            const legend = L.DomUtil.create('div', 'legend');
            return legend;
        };
    
        legendControl.addTo(a.map.placed);
        updateLegend(breaks, colorize, code);
    } else {
        updateLegend(breaks, colorize, code);
    }
    

}

function updateLegend(breaks, colorize, code) {
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
}

function removeLegend() {
    const legend = document.querySelector('.legend');
    a.map.placed.removeControl(legend);
}
 