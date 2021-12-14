import {Overlay, View, Map} from 'ol';
import {LayerSwitcher, MousePosition, Image, ZoomToExtent, OverviewMap, FullScreen, Zoom, ZoomSlider} from 'ol/control';
import {Group, Tile} from 'ol/layer';
import {OSM, XYZ, ImageWMS} from 'ol/source';

var geojson, geojson_point, map, lineGraph, barGraph, overlay, value_param, feature;
var featureOverlay;
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

/*
    Create an overlay to anchor the popup to the map.
*/
overlay = new Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});

/**
 * Add a click andler to hide the popup
 */

closer.onclick = function() {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};

$("#parameter").change(function() {
    load_layer();
});

$('#start_date').change(function() {
    load_layer();
});

$('#end_date').change(function() {
    load_layer();
});

var view = new View({
    projection: 'EPSG:4326',
    center: [82.00, 23.00],
    zoom: 5,
});

var view_ov = new View({
    project: 'EPSG:4326',
    center: [82.00, 23.00],
    zoom: 5,
});

var osm = new Tile({
    title: 'OSM',
    type: 'base',
    visible: true,
    source: new OSM()
});

var Satellite = new Tile({
    title: 'Satellite',
    type: 'base',
    visible: true,
    source: new XYZ({
        attributions: ['Powered by Esri',
            'Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographcs, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and te GIS User Community'
        ],
        attributionsCollapsible: false,
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        maxZoom: 23   
    })
});

var base_maps = new Group({
    'title': 'Base maps',
    layers: [osm, Satellite]
});

// var osm1 = new Tile({
//     source: new OSM(),
//     type: 'base',
//     title: 'OSM',
// });

var overlays = new Group({
    'title': 'Overlays',
    layers: [
        // new Image({
        //     title: 'india_state',
        //     // extent: [-180, -90, -180, 90],
        //     source: ImageWMS({
        //         url: 'http://localhost:8081/geoserver/wms',
        //         params: {'LAYERS': 'spatial:india_state_boundary'},
        //         ratio: 1,
        //         serverType: 'geoserver'
        //     })
        // })
    ]
});
/*
var layers = [
    new Tile({
        source: new OSM()
    }),
    new Image({
        // extent: [-180, -90, -180, 90],
        source: new ImageWMS({
            url: 'http://localhost:8081/geoserver/wms',
            params: {'LAYERS': 'spatial:india_state'},
            ratio: 1,
            serverType: 'geoserver'
        })
    })
]; */

map = new Map({
    target: 'map',
    // layers: [overlay],
    view: view,
    overlays: [overlay],
});

map.addLayer(base_maps);
// map.addLayer(osm1);
map.addLayer(overlays);

// map.addControl(new LayerSwitcher());

var layerSwitcher = new LayerSwitcher({
    acivationMode: 'click',
    startActive: true,
    tipLabel: 'Layers', //Optional Label for button
    groupSelectStyle: 'children', // can be 'children' [default], 'group', 'none'
    collapseTipLabel: 'Collapse layers',
});

map.addLayer(layerSwitcher);

var mouse_position = new MousePosition();
map.addControl(mouse_position);
var overview = new OverviewMap({view: view_ov, collapseLabel: 'O', label: 'O'});
map.addControl(overview);

var full_sc = new FullScreen({label: 'F'});
map.addControl(full_sc);

var zoom = new Zoom({zoomInLabel: '+', zoomOutLabel: '-'});
map.addControl(zoom);

var slider = new ZoomSlider();
map.addControl(slider);

var zoom_ex = new ZoomToExtent({
    extent: [
        65.9512481689453, 5.96124982833862,
        101.048751831055, 39.0387496948242
    ]
});

map.addControl(zoom_ex);

load_layer();

map.on('click', function(evt){
    click_info(evt);
    click_graph(evt);
});