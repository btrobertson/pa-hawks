const a = {
    data: {},
    location: {
        feedBack: '#locateFeedback',
        target: [40.02765615977412, -75.18601583979795],
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

const hawks = 
    {
    norhar2: {
        name: "Northern Harrier",
        code: "norhar2",
        file: "harrier_2022_counts.geojson"
    },
    rethaw: {
        name: "Red-tailed Hawk",
        code: "rethaw",
        file: "red-tail_2022_counts.geojson",
    },
    amekes: {
        name: "American Kestrel",
        code: "amekes",
        file: "kestrel_2022_counts.geojson",
    },
    coohaw: {
        name: "Cooper's Hawk",
        code: "coohaw",
        file: "cooper_2022_counts.geojson",
    },
    }
