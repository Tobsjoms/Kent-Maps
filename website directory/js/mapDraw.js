$( document ).ready(function() {
    
    console.log( "ready!" );
    var currentMap = "floorplans/Ground_Floor.svg";
    var m = Snap('#svg');
    var MapGroup = m.group();
    Snap.load(currentMap, onSVGLoaded);
    var mapArray = [];

    function onSVGLoaded (svg) {
        //  m.append(layer0);
        MapGroup.append(svg);
        getMapLayers();

    }

    function getMapLayers() {
        //traverse through the 'g' layers in the svg tree and pick out the
        //inkscape layer names (not just 'layer1' but the inscape:label ID)
        var local = MapGroup.selectAll('g');
        local.forEach(function(el){
            var p = el.select("inkscape:label");
            mapArray[el.attr('g')]; //this is coming up empty
        });
        console.log(mapArray);
        console.log(local);

    }

    function getLayerChildObjects(layerID) {

    }
        

    



//index rooms via id
//for loop iterate and obtain all rect ID, put in an array for reference 

});



