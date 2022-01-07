var geojson, geojson_point, map, lineGraph, barGraph, overlay, value_param, feature;
var featureOverlay;
 var container = document.getElementById('popup');]
 var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');


var show_map = {
  display: function() {
    var overlay = new ol.Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

   
s
      /**
       * Add a click handler to hide the popup.
       * 
       */
      closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
      };




  $("#parameter" ).change(function () {
    load_layer();
    console.log('changed');
    // fetchData();
  });

  // function fetchData(){
  //   $.ajax({
  //     url: 'fetch_data',
  //     type: 'GET',
  //     dataType: 'json',
  //     success: function(response){
  //       console.log(response.data);
  //     }
  //   })
  // }

  $("#start_date" ).change(function () {
  // load_layer();
  });


  $("#end_date" ).change(function () {
  // load_layer();
  });


  var view = new ol.View({
  projection: 'EPSG:4326',
        center: [82.00, 23.00],
          zoom: 5,
      
        });
    var view_ov = new ol.View({
  projection: 'EPSG:4326',
        center: [82.00, 23.00],
          zoom: 5,
        });
    var OSM =  new ol.layer.Tile({
                        title: 'OSM',
                        type: 'base',
                        visible: true,
                        source: new ol.source.OSM()
                    });
    var Satellite =  new ol.layer.Tile({
            title: 'Satellite',
            type: 'base',
            visible: true,
            source: new ol.source.XYZ({
                attributions: ['Powered by Esri',
                    'Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community'
                ],
                attributionsCollapsible: false,
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                maxZoom: 23
            })
        });
    var base_maps = new ol.layer.Group({
                'title': 'Base maps',
                layers: [ OSM, Satellite ]
            });
      
    /*var OSM1 = new ol.layer.Tile({
            source: new ol.source.OSM(),
      type: 'base',
      title: 'OSM',
          });*/
      
      var overlays = new ol.layer.Group({
                'title': 'Overlays',
                layers: [
    /*new ol.layer.Image({
      title: 'india_state',
        // extent: [-180, -90, -180, 90],
          source: new ol.source.ImageWMS({
            url: 'http://localhost:8081/geoserver/wms',
            params: {'LAYERS': 'spatial:india_state_boundary'},
            ratio: 1,
            serverType: 'geoserver'
          })
        })*/
    
    ]
    });
    /*var layers = [
    new ol.layer.Tile({
            source: new ol.source.OSM()
          }),
    new ol.layer.Image({
        // extent: [-180, -90, -180, 90],
          source: new ol.source.ImageWMS({
            url: 'http://localhost:8081/geoserver/wms',
            params: {'LAYERS': 'spatial:india_state'},
            ratio: 1,
            serverType: 'geoserver'
          })
        })
    ];*/


    
      map = new ol.Map({
        target: 'map',
          
        //layers: [ overlay],
        view: view,
    overlays: [overlay]
      });
    
    map.addLayer(base_maps);
  // map.addLayer(OSM1);
    map.addLayer(overlays);
    

    
    //map.addControl(new ol.control.LayerSwitcher());
    
    var layerSwitcher = new ol.control.LayerSwitcher({
    activationMode: 'click',
    startActive: true,
  tipLabel: 'Layers', // Optional label for button
    groupSelectStyle: 'children', // Can be 'children' [default], 'group' or 'none'
    collapseTipLabel: 'Collapse layers',
  });
  map.addControl(layerSwitcher);

  var mouse_position = new ol.control.MousePosition();
  map.addControl(mouse_position);
  var overview = new ol.control.OverviewMap({view: view_ov, collapseLabel:'O', label: 'O'});
  map.addControl(overview);

  var full_sc = new ol.control.FullScreen({label:'F'});
  map.addControl(full_sc);

  var zoom = new ol.control.Zoom({zoomInLabel:'+', zoomOutLabel:'-'});
  map.addControl(zoom);

  var slider = new ol.control.ZoomSlider();
  map.addControl(slider);



  var zoom_ex = new ol.control.ZoomToExtent({
  extent:[
              65.9512481689453, 5.96124982833862,
                    101.048751831055, 39.0387496948242
            ]
      });
  map.addControl(zoom_ex);

  // load_layer();


    map.on('click', function(evt){
  //	alert('hdg');
  // click_info(evt);
  // click_graph(evt);

  });
  }
}      
      

// $(function(){
//     alert('hey!');
// });

export default show_map;