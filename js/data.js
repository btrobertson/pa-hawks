const a = {
    data: {},
    location: {
        feedBack: '#locateFeedback',
        target: [38.0380543, -84.5048104],
        info: {},
        weather: {},
    },
    map: {
        div: "map",
        options: {
            zoomSnap: 0.1,
            zoomControl: false,
            zoom: 6,
            center: [40.02765615977412, -75.18601583979795],
        },
        fitOptions: {
            padding: [20, 20],
            animate: false,
        },
        zoomOptions: {
            position: "bottomright",
        },
    },
    tiles: {
        url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        options: {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        },
    },
    buttons: {
        locate: {
            id: "#geolocate-ui",
        },
    },
    
};