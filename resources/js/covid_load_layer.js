import 'ol/ol.css';
import Vector from 'ol/layer/Vector';
import {Style, Stroke, Fill, Text, Circle} from 'ol/style';
// import Vector from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';

const map_main = require('./map.js');

function load_layer(){
    overlay.setPosition(undefined);
            closer.blur();
    
    if(featureOverlay)
            {
            featureOverlay.getSource().clear();
            map.removeLayer(featureOverlay);
            
            //alert('karan');
            }
    
    if (lineGraph)
        {
        lineGraph.destroy();
        }
        if (barGraph)
        {
        barGraph.destroy();
        }
    //alert('karan');
    if(geojson)
            {
            geojson.getSource().clear();
            overlays.getLayers().remove(geojson);
            
            //alert('karan');
            }
          
          if(geojson_point)
            {
            geojson_point.getSource().clear();
            overlays.getLayers().remove(geojson_point);
            
            }
            
    var start_date = document.getElementById("start_date").value;
    var end_date = document.getElementById("end_date").value;
    var param = document.getElementById("parameter");
    value_param = param.options[param.selectedIndex].value;
    //var selectedradio = $("input:radio[name=layer_radio]:checked").val();
    start_date = convert_format(start_date);
    end_date = convert_format(end_date);
    let _token = $('meta[name="csrf_token"]').attr('content');
    console.log(_token);

    // $.ajax({
    //     url: 'get_geojson_layer_spatial',
    //     method: 'GET',
    //     dataType: 'json',
    //     success: function(response){
    //         console.log(response);
    //     }
    // });
    
    // $.ajaxSetup({
    //     headers: {
    //         'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
    //     }
    // });
    console.log(start_date);
    console.log(end_date);
    console.log(value_param);

    
    $.ajax({
        url: 'get_max_value_spatial',
        method: 'POST',
        data: {
            '_token': _token,
            'date1': start_date,
            'date2': end_date,
            'param': value_param
        },
        success: function(response){
            console.log(response.maximum[0].max);
            var max_value = response.maximum[0].max;

            var diff = max_value/7;
            var i;
            var k;
            var color = [[254, 217, 118, 0.7], [254, 178, 76, 0.7], [253, 141, 60, 0.7], [252, 78, 42, 0.7], [227, 26, 28, 0.7], [189, 0, 38, 0.7], [128, 0, 38, 0.7]];

            getStyle1 = function(feature, resolution){
                for(i=0;i<7;i++){
                    if(feature.get([value_param]) > (i*diff) && feature.get([value_param]) <= ((i+1)*diff)){
                        return new Style({
                            fill: new Fill({
                                color: color[i]
                            }),
                            stroke: new Stroke({
                                color: 'white',
                                lineDash: [2],
                                width: 2
                            })
                        });
                    }

                    if (value_param == 'vaccinations' || value_param == 'tests'){
                        $('#'+i).html(Math.round((i*diff)/1000000)+"M - "+Math.round(((i+1)*diff)/1000000)+"M");
                    }
                    else{
                        $("#"+i).html(Math.round((i*diff)/1000)+"K - "+Math.round(((i+1)*diff)/1000)+"K");
                    }
                    $("#legend_title").html("<b>Legend - COVID "+value_param+"</b>");
                }

                if (feature.get([value_level]) == 0){
                    return new Style({
                        fill: new Fill({
                            color: [254, 217, 118, 0.7]
                        }),
                        stroke: new Stroke({
                            color: 'white',
                            lineDash: [2],
                            width: 2
                        })
                    });
                }
            };
            
            var col = 'rgba(255, 255, 0, 0.6)';
            var col1 = 'rgba(255, 0, 0, 0.6)';
            getStyle2 = function(feature, resolution){
                var txt = new Text({
                    text: feature.get('country_name')+":"+feature.get([value_param]),
                    offsetX: 20,
                    offsetY: -15,
                    font: '12px Calibri, sans-serif',
                    fill: new Fill({
                        color: '#000',
                    }),
                    stroke: new Stroke({
                        color: '#fff',
                        width: 3
                    })
                });

                var fill = new Fill({color: col});
                var stroke = new Stroke({color: col1, width: 1});

                for (i = 0; i < 7; i++){
                    if(feature.get([value_param]) > (i*diff) && feature.get([value_param]) <= ((i+1)*diff)) {
                        return new Style({
                            image: new Circle({
                                radius: 5*(i+1),
                                fill: fill,
                                stroke: stroke
                            }),
                        });
                    }
                }
                if (feature.get([value_param]) == 0){
                    return new Style({
                        image: new Circle({
                            radius: 0,
                            fill: fill,
                            stroke: stroke
                        }),
                    });
                }
            };
        }
    });

    var get_multipolygon_data = function(){
        initializeAJAXRequest('get_geojson_layer_spatial', 'POST', make_multipolygon_request);
    }

    var get_point_data = function(){
        initializeAJAXRequest('get_geojson_layer_point_spatial', 'POST', make_point_request);
    }

    function make_point_request(result){
        return result;
    }

    function make_multipolygon_request(result){
        return result;
    }
    // data = get_point_data();
    // console.log(data);
    // console.log(get_multipolygon_data());

    
    function initializeAJAXRequest(url, method, callback){
        $.ajax({
            url: url,
            method: method,
            data: {
                '_token': _token,
                'date1': start_date,
                'date2': end_date,
                'param': value_param
            },
            success: function(response){
                callback(response);
            },
            error: function(err, msg){
                alert(msg);
            }
        });
    }
        
    geojson = new Vector({
         title: 'COVID '+value_param+'('+start_date+' to '+end_date+')',
              source: new Vector({
                 url: get_multipolygon_data,
              format: new GeoJSON()
              }),
              style: function (feature, resolution) {
            return getStyle1(feature, resolution);
        }
            });
            
            geojson.getSource().on('addfeature', function(){
            map.getView().fit(
            geojson.getSource().getExtent(),
            { duration: 0, size: map.getSize() }
        );
     });
     overlays.getLayers().push(geojson);
            //map.addLayer(geojson);		
    layerSwitcher.renderPanel();
    geojson_point = new Vector({
         title: 'COVID '+value_param+'('+start_date+' to '+end_date+')_circle',
              source: new ol.source.Vector({
                 url: get_point_data,
              format: new GeoJSON()
              }),
              style: function (feature, resolution) {
            return getStyle2(feature, resolution);
        }
            });
            
            geojson_point.getSource().on('addfeature', function(){
        map.getView().fit(
            geojson_point.getSource().getExtent(),
            { duration: 0, size: map.getSize() }
        );
     });
            
    map_main.overlays.getLayers().push(geojson_point);
    //map.addLayer(geojson_point);
    layerSwitcher.renderPanel();

    $.ajax({
        url: 'get_graph_world_cumulative',
        method: 'POST',
        data: {
            '_token': _token,
            'date1': start_date,
            'date2': end_date,
            'param': value_param
        },
        success: function(response){
            // console.log(response)
            // console.log(response[0].date);
            // console.log(response[0][value_param]);
            
            var date = [];
            var score = [];
            var score1 = [];
            var score2 = [];

            for(var i in response){
                date.push(response[i].date);
                score.push(response[i][value_param]);
            }

            var chartData = {
                labels: date,
                datasets: [
                    {
                        label: 'COVID ' + value_param,
                        backgroundColor: 'rgba(255, 0, 0, 1)',
                        borderColor: 'rgba(255, 0, 0, 1)',
                        hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
                        hoverBorderColor: 'rgba(200, 200, 200, 1)',
                        data: score,
                        fill: false
                    }
                ]
            };

            var ctx = $('#mycanvas1');
            lineGraph = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: {
                    response: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'World Cumulative COVID ' + value_param + '(' + start_date + ' to ' + end_date + ')'
                        }
                    },
                    tooltips: {
                        mode: 'index',
                        intersects: false,
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'COVID ' + value_param
                            },
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    }
                }
            });
        }
    });
    
    
    $.ajax({
        url: 'get_graph_world_daily',
        method: 'POST',
        data: {
            '_token' : _token,
            'date1': start_date,
            'date2': end_date,
            'param': value_param
        },
        success: function(response){
            var date = [];
            var score = [];
            for(var i in response){
                date.push(response[i].date);
                score.push(response[i][value_param]);
            }

            var chartdata = {
                labels: date,
                datasets: [
                    {
                        label: 'COVID ' + value_param,
                        backgroundColor: 'rgba(255, 0, 0, 1)',
                        borderColor: 'rgba(255, 0, 0, 1)',
                        hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
                        hoverBorderColor: 'rgba(200, 200, 200, 1)',
                        data: score,
                        fill: false
                    }
                ]
            };

            var ctx = $("#mycanvas2");
            barGraph = new Chart(ctx, {
                type: 'bar',
                data: chartdata,
                options: {
                    response:true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'World Daily COVID ' + value_param + '(' + start_date + ' to ' + end_date + ')'
                        }
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'COVID ' + value_param
                            },
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    }
                }
            });
        }
    });

    $.ajax({
        url: 'get_counter_world',
        method: 'POST',
        data: {
            '_token': _token,
            'date1': start_date,
            'date2': end_date
        },
        success: function(response){
            $('#cases').html('Cases: ' + response[0].cases);
            $('#deaths').html('Deaths: ' + response[0].deaths);
            $('#tests').html('Tests: ' + response[0].tests);
            $('#vaccinations').html('Vaccinations: ' + response[0].vaccinations);
        }
    });

    
    

    // $.ajax({
    //     url: 'get_counter_world',
    //     method: 'GET',
    //     dataType: 'json',
    //     success: function(response){
    //         console.log(response.data);
    //     }
    // });
                      
                     /*$(document).ready(function(){
        
        $.ajax({
            url: url_counter_world,
            method: "GET",
            success: function(data) {
                console.log(data[0].deaths);
            //alert(data[0].cases);
          $("#cases").html('Cases: '+data[0].cases);
         $("#deaths").html('Deaths: '+data[0].deaths);
     $("#tests").html('Tests: '+data[0].tests);
      $("#vaccinations").html('Vaccinations: '+data[0].vaccinations);
                
            },
            error: function(data) {
                console.log(data);
            }
        });
    });*/
    
    
}


function convert_format(dt){
    var dt_arr = dt.split('-');
    return (dt_arr[2] + '-' + dt_arr[1] + '-' + dt_arr[0]);
}
function say(txt){
    alert(txt);
}

module.exports = { load_layer, convert_format };
// export default load_layer;