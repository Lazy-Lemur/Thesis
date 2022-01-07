function click_info(evt){
    if(featureOverlay){
        featureOverlay.getSource().clear();
        map.removeLaer(featureOverlay);
    }

    feature = map.forEachFeatureAtPixel(evt.pixel,
        function(feature, layer){
            return feature;
        });

    var highlightStye = new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0)',
        }),
        stroke: new ol.style.Stroke({
            color: '#3399CC',
            width: 3,
        }),
        image: new ol.style.Circle({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.7)',
            }),
            stroke: new ol.style.Stroke({
                color: '#3399CC',
                width: 3,
            }),
            radius: 5
        }),
    });

    featureOverlay = new ol.layer.Vector({
        source: new ol.source.Vector(),
        map: map,
        style: highlightStyle
    });

    if(feature){
        var geometry = feature.getGeometry();
        var coord = geometry.getCoordinates();
        var coordinate = evt.coordinate;
        var content1 = '<h3>' + feature.get('barangay') + '</h3>';
        content1 += '<h5>' + 'Covid ' + value_param + ' ' + Math.round(feature.get([value_param])) + '</h5>';
        content.innerHTML = content1;
        overlay.setPosition(coordinate);
        featureOverlay.getSource().addFeature(feature);
    }
}