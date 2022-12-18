# Falcons and Hawks Observed in Pennsylvania

## A Guide to Pennsylvania Hawks and Falcons
This project maps hawk and falcon sightings in Pennsylvania and provides information and images of each species mapped.

### Objectives
+ Provide a guide for hawk and falcon observers
+ Provide a resource for users interested in local wildlife

### Data Sources
Hawk and falcon observation data: [ebird.org](https://science.ebird.org/en/pa/use-ebird-data)

County boundaries: [US Census Bureau](https://catalog.data.gov/dataset/tiger-line-shapefile-2016-state-pennsylvania-current-county-subdivision-state-based)


### References 
[Pennsylvania Game Commission](https://www.pgc.pa.gov/Education/WildlifeNotesIndex/Pages/Hawks-and-Falcons.aspx)

[Axis Maps](https://www.axismaps.com/guide/proportional-symbols)

### Data Representation
Observations are shown as proportional points centered on the county in which they occurred. Clicking the point shows the individual observations at the location they occurred. 

### User Interface
The user can select a species to view from the dropdown list or choose to look at all recent (within the last 30 days) observations in their area.

### Technology Stack
+ QGIS
+ Visual Studio (code editor)
+ CSS
+ HTML
+ JavaScript
+ Bootstrap 5
+ Leaflet
+ GitHub

Data was extracted and processed using QGIS and exported to GeoJSON and CSV files. Recent observation data relies on the ebird.org API. 
Maps were created using the Leaflet JavaScript library.

