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
            zoom: 7,
            center: [40.854673821881114, -77.68387082785095],
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
        url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
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
        file: "harrier_2022_counts.geojson",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Female_northern_harrier_in_flight-1672.jpg",
        imageAttr: '<a href="https://commons.wikimedia.org/wiki/File:Female_northern_harrier_in_flight-1672.jpg">Frank Schulenburg</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
    },
    rethaw: {
        name: "Red-tailed Hawk",
        code: "rethaw",
        file: "red-tail_2022_counts.geojson",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/52/Red-tailed_hawk_in_Central_Park_%2824998%29.jpg",
        imageAttr: '<a href="https://commons.wikimedia.org/wiki/File:Red-tailed_hawk_in_Central_Park_(24998).jpg">Rhododendrites</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
    },
    amekes: {
        name: "American Kestrel",
        code: "amekes",
        file: "kestrel_2022_counts.geojson",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Falco_sparverius_05.jpg",
        imageAttr: '<a href="https://commons.wikimedia.org/wiki/File:Falco_sparverius_05.jpg">Fedaro Fernando da Rosa</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons',
    },
    coohaw: {
        name: "Cooper's Hawk",
        code: "coohaw",
        file: "cooper_2022_counts.geojson",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Accipiter_cooperii_m_Sam_Smith_Toronto3.jpg",
        imageAttr: '<a href="https://commons.wikimedia.org/wiki/File:Accipiter_cooperii_m_Sam_Smith_Toronto3.jpg">Mykola Swarnyk</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons',
    },
    shshaw: {
        name: "Sharp-shinned Hawk",
        code: "shshaw",
        file: "sharp-shinned_2022_counts.geojson",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Sharp-shinned_Hawk_%2850958298391%29.jpg",
        imageAttr: '<a href="https://commons.wikimedia.org/wiki/File:Sharp-shinned_Hawk_(50958298391).jpg">Channel City Camera Club/Susan T. Cook</a>, <a href="https://creativecommons.org/licenses/by/2.0">CC BY 2.0</a>, via Wikimedia Commons',
    },
    perfal: {
        name: "Peregrine Falcon",
        code: "perfal",
        file: "perfal_2022_counts.geojson",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/93/Falco_peregrinus_113345020.jpg",
        imageAttr: '<a href="https://commons.wikimedia.org/wiki/File:Falco_peregrinus_113345020.jpg">Jonathan Eisen</a>, <a href="https://creativecommons.org/licenses/by/4.0">CC BY 4.0</a>, via Wikimedia Commons',
    },
    };

    