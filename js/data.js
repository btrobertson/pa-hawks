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
            zoom: 7.5,
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
    layers: {
    },
    view: {
        screens: ['totals', 'county', 'local'],
        current: "totals",
    },
};

const hawks = 
    {
    norhar2: {
        name: "Northern Harrier",
        code: "norhar2",
        file: "harrier_2022_counts.geojson",
        birdFile: "norhar2_2022_data.csv",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Female_northern_harrier_in_flight-1672.jpg",
        imageAttr: '<a href="https://commons.wikimedia.org/wiki/File:Female_northern_harrier_in_flight-1672.jpg">Frank Schulenburg</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        info: "<p class='info'>Medium-sized hawk with long tail and thin wings. Flies with wings held in a V-shape, low over open fields and marshes, listening for rodents lurking below. Distinctive foraging behavior and conspicuous white patch on rump in all plumages. Females and immatures are warm brown. Adult males gray above and whitish below with black wingtips.</p><p class='source'>Source: <a href='https://ebird.org/species/norhar2'>ebird.org</a>"
    },
    rethaw: {
        name: "Red-tailed Hawk",
        code: "rethaw",
        file: "red-tail_2022_counts.geojson",
        birdFile: "red-tail_2022_data.csv",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/52/Red-tailed_hawk_in_Central_Park_%2824998%29.jpg",
        imageAttr: '<a href="https://commons.wikimedia.org/wiki/File:Red-tailed_hawk_in_Central_Park_(24998).jpg">Rhododendrites</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        info: "<p class='info'>Most common roadside raptor across much of North America. Often perches atop telephone poles, light posts, and edges of trees. Incredible variation in plumages, including less common dark morphs and various regional differences. Eastern adults have brilliant reddish-orange tail and pale underparts with obvious band of dark marks across belly. Western birds are typically darker. Immatures do not have a red tail.</p><p class='source'>Source: <a href='https://ebird.org/species/rethaw'>ebird.org</a>"
    },
    amekes: {
        name: "American Kestrel",
        code: "amekes",
        file: "kestrel_2022_counts.geojson",
        birdFile: "amekes_2022_data.csv",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Falco_sparverius_05.jpg",
        imageAttr: '<a href="https://commons.wikimedia.org/wiki/File:Falco_sparverius_05.jpg">Fedaro Fernando da Rosa</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons',
        info: "<p>Petite falcon roughly the same size as Mourning Dove, but with a larger head and wider tail. In flight, note long, narrow wings and square-tipped tail. Often seen perched on telephone wires, along roadsides, in open country with short vegetation and few trees. From a perch or hovering, they usually drop to the ground to snatch small mammals and insects. Nests in cavities. Widespread across the Americas.</p><p class='source'>Source: <a href='https://ebird.org/species/amekes'>ebird.org</a></p>"
    },
    coohaw: {
        name: "Cooper's Hawk",
        code: "coohaw",
        file: "cooper_2022_counts.geojson",
        birdFile: "coohaw_2022_data.csv",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Accipiter_cooperii_m_Sam_Smith_Toronto3.jpg",
        imageAttr: '<a href="https://commons.wikimedia.org/wiki/File:Accipiter_cooperii_m_Sam_Smith_Toronto3.jpg">Mykola Swarnyk</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons',
        info: "<p class='info'>Small to medium-sized hawk with relatively short rounded wings and rounded tail. Adults are gray above with pale orange barring below; immatures are browner and streaky. Very similar to Sharp-shinned Hawk, but larger with bigger head. Also note deeper, slower wingbeats. Breeds in forested areas; more common in suburban areas than Sharp-shinned Hawk. Feeds mainly on birds captured in flight. Often stalks feeders in search of prey.</p><p class='source'>Source: <a href='https://ebird.org/species/amekes'>ebird.org</a></p>"
    },
    shshaw: {
        name: "Sharp-shinned Hawk",
        code: "shshaw",
        file: "sharp-shinned_2022_counts.geojson",
        birdFile: "shshaw_2022_data.csv",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Sharp-shinned_Hawk_%2850958298391%29.jpg",
        imageAttr: '<a href="https://commons.wikimedia.org/wiki/File:Sharp-shinned_Hawk_(50958298391).jpg">Channel City Camera Club/Susan T. Cook</a>, <a href="https://creativecommons.org/licenses/by/2.0">CC BY 2.0</a>, via Wikimedia Commons',
        info: "<p class='info'> Small hawk with relatively short rounded wings. Adults are gray above with pale orange barring below; immatures are browner and streaky. Very similar to Cooper's Hawk, especially in plumage, but smaller overall with smaller head, more squared-off tail, and more petite feet. Also note quicker, snappier wingbeats. Breeds in extensive forests. Feeds mainly on birds captured in flight. Often stalks feeders in search of prey.</p><p class='source'>Source: <a href='https://ebird.org/species/shshaw'>ebird.org</a></p>"
    },
    perfal: {
        name: "Peregrine Falcon",
        code: "perfal",
        file: "perfal_2022_counts.geojson",
        birdFile: "perfal_2022_data.csv",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/93/Falco_peregrinus_113345020.jpg",
        imageAttr: '<a href="https://commons.wikimedia.org/wiki/File:Falco_peregrinus_113345020.jpg">Jonathan Eisen</a>, <a href="https://creativecommons.org/licenses/by/4.0">CC BY 4.0</a>, via Wikimedia Commons',
        info: "<p class='info'>Sleek, fast-flying large falcon. Always look for a grayish back in adults, long wings that almost reach the tail tip, and powerful but slender build. Dark mark below each eye varies in shape and size. Juveniles are more heavily patterned below than adults, and can be quite brownish above. Patterning varies considerably across a wide global range, with back color ranging from pale gray in Central Asian “Red-capped” to slaty-blue across much of northern Eurasia North America, to almost black in Asian “Shaheen.” Chases prey down at high speeds with continuous powerful wingbeats. Becoming increasingly common in parts of range, especially in cities, where they can nest on tall buildings and feed on pigeons. Adaptable, and can be seen in a wide range of habitats; often encountered in areas with steep cliffs, as well as around coastal mudflats and open areas with shorebirds.</p><p class='source'>Source: <a href='https://ebird.org/species/perfal'>ebird.org</a></p>"
    },
    reshaw: {
        name: "Red-shouldered Hawk",
        code: "reshaw",
        file: "reshaw_2022_counts.geojson",
        birdFile: "reshaw_2022_data.csv",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/62/Red-shouldered_Hawk_%28Buteo_lineatus%29_-_Blue_Cypress_Lake%2C_Florida.jpg",
        imageAttr: '<a href="https://commons.wikimedia.org/wiki/File:Red-shouldered_Hawk_(Buteo_lineatus)_-_Blue_Cypress_Lake,_Florida.jpg">Andy Morffew</a>, <a href="https://creativecommons.org/licenses/by/2.0">CC BY 2.0</a>, via Wikimedia Commons',
        info: "<p class='info'>Smaller than Red-tailed Hawk. Adults are beautiful with rich orange barring below and bold black-and-white checkerboard patterning on wings. Often in forested areas, where they hunt from perches. Perches on wires more frequently than Red-tailed Hawk. In flight, wings seem narrow and pushed forward compared to Red-tailed or Broad-winged Hawk; also note relatively long tail. Population in California is more richly colored (darker orange) than paler Eastern birds; while Florida birds are paler with gray head and back.</p><p class='source'>Source: <a href='https://ebird.org/species/reshaw'>ebird.org</a></p>"
    },
    norgos: {
        name: "Northern Goshawk",
        code: "norgos",
        file: "norgos_2022_counts.geojson",
        birdFile: "norgos_2022_data.csv",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/81/Northern_Goshawk_ad_M2.jpg",
        imageAttr: '<a href="https://commons.wikimedia.org/wiki/File:Northern_Goshawk_ad_M2.jpg">Norbert Kenntner, Berlin</a>, <a href="http://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>, via Wikimedia Commons',
        info: "<p class='info'>Powerfully-built forest-dwelling hawk, uncommon across much of range. Adults are distinctive if seen well: overall gray, paler below, blackish crown and cheek, white eyebrow, and red eye. Immature very similar to Eurasian Sparrowhawk and Cooper's Hawk, but larger and broader-winged with a more prominent white eyebrow, heavier streaking below (Eurasian Sparrowhawk barred below), and typically streaked undertail coverts. In most suburban areas, Cooper's and Sparrowhawk are more likely; goshawk typically requires extensive mature forest. Very aggressive around the nest. Feeds on large prey such as hares and grouse.</p><p class='source'>Source: <a href='https://ebird.org/species/norgos'>ebird.org</a></p>"
    },
    merlin: {
        name: "Merlin",
        code: "merlin",
        file: "merlin_2022_counts.geojson",
        birdFile: "merlin_2022_data.csv",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/70/Falco_columbarius_%28Merlin%29_%285530094753%29.jpg",
        imageAttr: '<a href="https://commons.wikimedia.org/wiki/File:Falco_columbarius_(Merlin)_(5530094753).jpg">David St. Louis</a>, <a href="https://creativecommons.org/licenses/by/2.0">CC BY 2.0</a>, via Wikimedia Commons',
        info: "<p class='info'>Small and fierce falcon. Dark above and paler below, with streaking on the underparts; darkness of plumage varies geographically. Feeds mainly on birds captured in flight. Found in a variety of habitats from grasslands, open forests, and especially coastal areas with shorebirds. Flies powerfully on pointed wings with quick, continuous wingbeats.</p><p class='source'>Source: <a href='https://ebird.org/species/merlin'>ebird.org</a></p>"
    }, 
    rolhaw: {
        name: "Rough-legged Hawk",
        code: "rolhaw",
        file: "rolhaw_2022_counts.geojson",
        birdFile: "rolhaw_2022_data.csv",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Buteo_lagopus_29283.JPG",
        imageAttr: '<a href="https://commons.wikimedia.org/wiki/File:Buteo_lagopus_29283.JPG">Walter Siegmund</a>, <a href="http://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>, via Wikimedia Commons',
        info: "<p class='info'>Long-winged, northern raptor found in open areas like fields and marshes. Plumage variable; light morphs generally pale with dark belly and dark patches on 'wrists'.Dark morphs have brown or blackish body with finely banded tail and striking white flight feathers. Some birds intermediate. Hovers often, kestrel-like, flapping wings while looking down. Also perches at edges of tree branches and tops of trees, places larger hawks are too heavy to perch. Breeds in far northern tundra and moves south irregularly to winter in open fields and grasslands. Compare with other Buteo hawks, such as Red-tailed Hawk and Common Buzzard, where ranges overlap. Note size, small bill, shaggy feathers on legs, and long and narrow wings.</p><p class='source'>Source: <a href='https://ebird.org/species/rolhaw'>ebird.org</a></p>"
    }
    };

    