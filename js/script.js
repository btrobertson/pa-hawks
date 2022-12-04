const birds = ['rethaw', 'baleag', 'amekes', 'coohaw', 'shshaw', 'perfal', 'reshaw', 'norgos', 'merlin', 'norhar2', 'rolhaw', 'redcro', 'goleag'];



function createMap() {
    a.map.placed = L.map(a.map.div, a.map.options);
    new L.control.zoom(a.map.zoomOptions).addTo(a.map.placed);
    L.tileLayer(a.tiles.url, a.tiles.options).addTo(a.map.placed);
    locateUI();
}

function locateUI() {
    a.buttons.locate.placed = document.querySelector(a.buttons.locate.id);
    a.location.info = document.querySelector(a.location.feedBack);
    a.buttons.locate.placed.addEventListener("click", function() {
        geoLocate();
    });
}

function geoLocate() {
    a.buttons.locate.placed.innerHTML = "Locating...";
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
      //  console.log("N: " + n);
        if (n == 5) {
            clearInterval(timer);
            a.location.center = bnds.getCenter();
            a.buttons.locate.placed.innerHTML = "Location found";
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

function drawMapOnLocation() {
    L.marker(a.location.center).addTo(a.map.placed);
    console.log(a.location.center);
    a.map.placed.setView(a.location.center, a.map.options.zoom + 4);
    getData();

}

function updateData() {
    const dropdown = document.querySelector('#dropdown-ui select');
    dropdown.addEventListener('change', function(e) {
        let species = e.target.value;
        getData(species)
      //  console.log(species);
    });
}

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

function processData(data) {
    console.log(data);
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
    console.log(a.data.birds);
}

function displayBirds() {
    console.log(a.data.birds);
   
    for (let j of a.data.birds) {
        let latlng = L.latLng(j.lat, j.lng);

        let marker = L.circleMarker(latlng, {radius:5});
        marker.bindTooltip(`${j.comName} <br> Count: ${j.howMany}`).openTooltip();
        marker.addTo(a.map.placed);
    }

}