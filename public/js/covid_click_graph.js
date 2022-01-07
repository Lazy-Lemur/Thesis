function click_graph(evt){

    if (lineGraph)
        {
        lineGraph.destroy();
        }
        if (barGraph)
        {
        barGraph.destroy();
        }
    
    
    feature = map.forEachFeatureAtPixel(evt.pixel,
          function(feature, layer) {
            return feature;
          });
          if (feature) {
    //alert(feature.get('country_name'));
    var country_name = feature.get('country_name');
    var start_date = document.getElementById("start_date").value;
    var end_date = document.getElementById("end_date").value;
    var param = document.getElementById("parameter");
    value_param = param.options[param.selectedIndex].value;
    
            var url_cum_graph = "jsp_files1/graph_country_cumulative.jsp";
                        url_cum_graph += "?parameter="+value_param;
                       url_cum_graph += "&date1="+start_date;
                      url_cum_graph += "&date2="+end_date;
                       url_cum_graph += "&country="+country_name;
            
    //alert(url_cum_graph);
    
        $.getJSON(url_cum_graph, function(data) {
                //console.log(data);
                var date = [];
                var score = [];
                var score1 = [];
                var score2 = [];
                for(var i in data) {
                    date.push(data[i].date);
                    score.push(data[i][value_param]);
                    //score1.push(data[i].production);
                    //score2.push(data[i].yield);
                    //alert(i);
                }
    
                var chartdata = {
                    labels: date,
                    datasets : [
                        {
                            label: 'COVID '+value_param,
                            backgroundColor: 'rgba(255, 0, 0, 1)',
                            borderColor: 'rgba(255, 0, 0, 1)',
                            hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
                            hoverBorderColor: 'rgba(200, 200, 200, 1)',
                            data: score,
                            fill: false
                        
                        }
                    ]
                };
    
                var ctx = $("#mycanvas1");
              // var ctx = document.getElementById('#mycanvas');
                 lineGraph = new Chart(ctx, {
                    type: 'line',
                    data: chartdata,
                    options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                    title: {
                        display: true,
                        text: country_name+' - Cumulative COVID '+value_param+'('+start_date+' to '+end_date+')'
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
                                text: 'COVID '+value_param
                            },
                                 ticks: {
                    beginAtZero: true
                       }
                        }
                    }
                }
                    
                });
            });
    
    var url_daily_graph = "jsp_files1/graph_country_daily.jsp";
                        url_daily_graph += "?parameter="+value_param;
                       url_daily_graph += "&date1="+start_date;
                      url_daily_graph += "&date2="+end_date;
                      url_daily_graph += "&country="+country_name;
    
    $.getJSON(url_daily_graph, function(data)  {
                //console.log(data);
                var date = [];
                var score = [];
                var score1 = [];
                var score2 = [];
                for(var i in data) {
                    date.push(data[i].date);
                    score.push(data[i][value_param]);
                    //score1.push(data[i].production);
                    //score2.push(data[i].yield);
                    //alert(i);
                }
    
                var chartdata = {
                    labels: date,
                    datasets : [
                        {
                            label: 'COVID '+value_param,
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
              // var ctx = document.getElementById('#mycanvas');
                 barGraph = new Chart(ctx, {
                    type: 'bar',
                    data: chartdata,
                    options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                    title: {
                        display: true,
                        text: country_name+' - Daily COVID '+value_param+'('+start_date+' to '+end_date+')'
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
                                text: 'COVID '+value_param
                            },
                                 ticks: {
                    beginAtZero: true
                       }
                        }
                    }
                }
                    
                });
            });
    
    var url_counter_country = "jsp_files1/counter_country.jsp";
                        url_counter_country += "?date1="+start_date;
                      url_counter_country += "&date2="+end_date;
                       url_counter_country += "&country="+country_name;
                      // alert(url_counter_country);
                       
                       $.getJSON(url_counter_country, function(data) {
                     // console.log(data[0].deaths);
            //alert(data[0].cases);
         $("#cases").html('Cases: '+Math.round(data[0].cases));
         $("#deaths").html('Deaths: '+Math.round(data[0].deaths));
     $("#tests").html('Tests: '+Math.round(data[0].tests));
      $("#vaccinations").html('Vaccinations: '+Math.round(data[0].vaccinations));
                      });
                    
    
    }
    else{load_layer();}
    }