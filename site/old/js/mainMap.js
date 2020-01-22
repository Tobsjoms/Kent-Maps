$( document ).ready(function() {

});

$(window).on('load', (function(){
    var a = document.getElementById('stage');
    var svgDoc = a.contentDocument;
    var svgItem = svgDoc.getElementById("layer6");
    var svgItem2 = svgDoc.getElementById("layer5"); //Pathways
    var allSVG= svgDoc.getElementById("svg16");
    var b = svgItem.getElementsByTagName("path");
    var text = svgItem2.getElementsByTagName("tspan");
    
    $("#clicky").click(function() {
        for (var i=0; i < b.length; i++) {
            if (b[i].style.visibility = "visible") {
            b[i].style.visibility = "hidden";
            }
        }
    });
    
    $("#clicky2").click(function() {
        for (var i=0; i < b.length; i++) {
            if (b[i].style.visibility = "hidden") {
            b[i].style.visibility = "visible";
            }
        }
    });
    
    
        $("#clicky3").click(function() {
        for (var i=0; i < text.length; i++) {
            if (text[i].style.visibility = "visible") {
            text[i].style.visibility = "hidden";
            }
        }
    });
    
    $("#clicky4").click(function() {
        for (var i=0; i < text.length; i++) {
            if (text[i].style.visibility = "hidden") {
            text[i].style.visibility = "visible";
            }
        }
    });
    
// panning
    var panZoom = svgPanZoom(allSVG, {
        zoomEnabled: true,
        controlIconsEnabled: false
    });
    
    console.log(svgDoc);
    console.log(svgItem);
    console.log(b);
    var rectID = new Array();
    for(i=0; i < b.length; i++) {
        //pushing all rect elements within svgItem into an array for search functionality
        rectID.push(b[i].id);
        console.log(rectID[i]);
    }

    
        allSVG.onclick = function() {
        var currentID = event.target.id;
        //get current id of object within svgItem
        console.log(currentID);
    }
    
    function getRoomData(currentID) {
        //pass id of current room to this func
        //php script queries DB with roomID providing roomID is PK
        //php returns dataset, loops through and displays
        //as side popup
    }
    

    
}));