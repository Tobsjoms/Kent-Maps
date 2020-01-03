$( document ).ready(function() {

});

var roomIDs = new Array();

function runSearch() {
var searchValue = document.getElementById("sInput").value;
for(var j = 0; j < roomIDs.length; j++) {
    if (roomIDs[j].match(searchValue)) { 
        
        }
    } getRoomData(searchValue);
}

$(window).on('load', (function(){
    
    var a = document.getElementById('stage');
    var svgDoc = a.contentDocument;
    //below line will be changed to be generic
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

    //indexing RoomIDs from SVG
    
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
    var currentID = event.target.id;
        
    getRoomData(currentID);

}
    
  
    
}));



    

//obtain the roomData        
function getRoomData(id) {
    var roomData = []; //data prep for return JSON data
    console.log(id);
    $.ajax({
        type: "POST",
        url: "../site/inc/php/getRoomData.php",
        data: {id: id}, //send roomID to script
        success: function(response) {
            roomData = JSON.parse(response); //parse as JSON object
            roomPopup(id, roomData); //pass room and JSON object to RoomPopup function
        }

    });
        
}



  