
$(window).on('load', (function(){
 
//------SVG Manipulation---------------------------------------------------------------//

    var a = document.getElementById('stage');
    
    var svgDoc = a.contentDocument;
    
    var allSVG= svgDoc.getElementById("Map");
    
    var buildingEntire = svgDoc.getElementById("Building");
    
    var buildingShape = 
    buildingEntire.getElementsByTagName("BuildingShape");
    
    var buildingNodes = buildingEntire.getElementsByTagName("path");
    
    var mapRooms = svgDoc.getElementById("Rooms");//All Rooms
    var roomPaths = mapRooms.getElementsByTagName("path");
    var roomRect = mapRooms.getElementsByTagName("rect");
    
    var IconsObjects = svgDoc.getElementById("Icons");
   // var iconPaths = IconsObjects.getElementsByTagName("path");
    
    var targets = ["Building", "Rooms", "Pathways", "Doors", "Icons", "Labels"];
    getBuildingRoomData();
    

    
function getBuildingRoomData() {
//loading in all data for all rooms on a floor, ready to colour each room
    //get mapName from URL file (buildingID="X-X-X".svg)
    var URL = window.location.href;
    var mapName = URL.substring(
    URL.lastIndexOf("=") +1,
        URL.lastIndexOf(".svg")
        );

    getRoomData(mapName);
    
}
    
//Strip SVG Style
updateSVGColourScheme();
function updateSVGColourScheme() {
	// Get the SVG element
	//var svgObject = document.getElementById("stage").contentDocument;
	// Get all groups
	var groups = svgDoc.getElementsByTagName("g");

	var targetedNodes = {};

	for (var i = 0; i < groups.length; i++){
		// Get group label
		var groupName = groups[i].getAttribute("inkscape:label");
		// Set colours if it's something we're setting
		if (targets.includes(groupName)){
			targetedNodes = Array.from(targetedNodes).concat(Array.from(groups[i].childNodes));
		}
	}

	for (var i = 0; i < targetedNodes.length; i++) {
		// Skip weird # elements
		if (typeof targetedNodes[i].tagName === 'undefined'){continue};
		// Remove style
	    targetedNodes[i].style.removeProperty('fill');
	    targetedNodes[i].style.removeProperty('stroke');
	    targetedNodes[i].style.removeProperty('stroke-width');
	    targetedNodes[i].style.removeProperty('opacity');
	}
    
        //CHROME FIX FOR OBJECT SHADOWS
    //USES PRESET "<feDropShadow> shadow3" values inbedded in the "<def>" tag at the top of the SVG doc
    for(var i = 0; i < buildingNodes.length; i++) {
        var current = buildingNodes[i];
        var att = document.createAttribute("filter");
       // att.value = "url(#shadow)";
        current.setAttribute("filter", "url(#shadow2)");
        //current.style.fill = "#e01e52";

    }
    
    //var textsObject = svgDoc.getElementById("Text");
   // var textElem = textsObject.getElementsByTagName("tspan");
}
    
    function loadColorCodes(data) {
        
        
        
    }

var roomIDs = new Array();
var panZoom = svgPanZoom(allSVG, {
    zoomEnabled: true,
    minZoom: 0.8,
    controlIconsEnabled: false
});
    panZoom.zoom(0.8);
    panZoom.center();
    
    //indexing RoomIDs from SVG
    for(i=0; i < roomRect.length; i++) {
        //pushing all rect elements within mapRooms into an array for search functionality
        roomIDs.push(roomRect[i].id);
    }    
    for(i=0; i < roomPaths.length; i++) {
        roomIDs.push(roomPaths[i].id);
    }
    //Click anywhere on the SVG 
    mapRooms.onclick = function(event) {
    var currentID = event.target.id;
    getRoomData(currentID);
    }
    

}));

//----------------------------------------------------------------------//   
//-----API Calls & Obtaing Data----------------------------------------------------------------//

//obtain the roomData        
function getRoomData(id) {
    var roomData = []; //data prep for return JSON data
    $.ajax({
        type: "POST",
        url: "../Website/inc/php/getAllRoomData.php",
        data: {id: id}, //send roomID to script
        success: function(response) {
            //NEED TO INCLUDE EDGE CASES FOR DATABASE ERRORS ie. what happens if cannot connect to DB 
            roomData = JSON.parse(response); //parse as JSON object
            roomPopup(id, roomData); //pass room and JSON object to RoomPopup function
        }

    });
        
}






  
