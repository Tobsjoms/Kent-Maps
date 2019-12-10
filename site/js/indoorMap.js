$( document ).ready(function() {

});

$(window).on('load', (function(){
    
    var a = document.getElementById('stage');
    var svgDoc = a.contentDocument;
    var allSVG= svgDoc.getElementById("CW-SW-GF");
    
    var mapRooms = svgDoc.getElementById("Rooms"); //AllRooms
        var roomPaths = mapRooms.getElementsByTagName("path");
        var roomRect = mapRooms.getElementsByTagName("rect");
    
    
    
    
    
    
    
    
    
// panning
    var panZoom = svgPanZoom(allSVG, {
        zoomEnabled: true,
        controlIconsEnabled: false
    });
    
    var rectID = new Array();
    console.log(roomPaths);
    for(i=0; i < roomRect.length; i++) {
        //pushing all rect elements within svgItem into an array for search functionality
        rectID.push(roomRect[i].id);
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
    
}));