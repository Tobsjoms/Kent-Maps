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
minZoom: 0.8,
controlIconsEnabled: false
});

panZoom.zoom(0.8);
panZoom.center();

updateSVGColourScheme();
    
    
    
    
    
    
    
    
    
    var roomIDs = new Array();
    console.log(roomPaths);
    
    for(i=0; i < roomRect.length; i++) {
        //pushing all rect elements within mapRooms into an array for search functionality
        roomIDs.push(roomRect[i].id);
    }    
    
    for(i=0; i < roomPaths.length; i++) {
        //pushing all path elements within mapRooms into an array for search functionality
        roomIDs.push(roomPaths[i].id);
    }
    
    

    //Click anywhere on the SVG 
        mapRooms.onclick = function() {
        var currentID = event.target.id; //get current ID of object clicked on within 'AllSVG'
        console.log(currentID); //log each click in the console
        getRoomData(currentID); //call with current ID on each click
    }
    
    function getRoomData(currentID) {
    //    alert("you clicked on room " + currentID);
        //pass id of current room to this func
        //php script queries DB with roomID providing roomID is PK
        //php returns dataset, loops through and displays
        //as side popup
        roomPopup(currentID);
    }
    
    function roomPopup(currentID) {
       
        $("#timetable").html("Room: " + currentID);
        $("#timetable").css({"font-size": "26px"});
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