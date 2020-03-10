
$(window).on('load', (function(){
 
//------SVG Manipulation---------------------------------------------------------------//

    var a = document.getElementById('stage');
    var svgDoc = a.contentDocument;
    var allSVG= svgDoc.getElementById("Map");
    var buildingEntire = svgDoc.getElementById("Building");
    var buildingShape = buildingEntire.getElementsByTagName("path");
    console.log(buildingShape);
    var mapRooms = svgDoc.getElementById("Rooms"); //All Rooms
    var roomPaths = mapRooms.getElementsByTagName("path");
    var roomRect = mapRooms.getElementsByTagName("rect");
    var targets = ["Building", "Rooms", "Pathways", "Doors", "Icons", "Labels"];
    getBuildingRoomData();
    
function getBuildingRoomData() {
//loading in all data for all rooms on a floor, ready to colour each room
    //get mapName from URL file (buildingID="X-X-X".svg)
    var URL = window.location.href;
    console.log(URL);
    var mapName = URL.substring(
    URL.lastIndexOf("=") +1,
        URL.lastIndexOf(".svg")
        );
    console.log(mapName);
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
    for(var i = 0; i < buildingShape.length; i++) {
        var current = buildingShape[i];
        var att = document.createAttribute("filter");
       // att.value = "url(#shadow)";
        current.setAttribute("filter", "url(#shadow2)");
        console.log("set shadow");
    }
    
    //var textsObject = svgDoc.getElementById("Text");
   // var textElem = textsObject.getElementsByTagName("tspan");
}
    
    function loadColorCodes(data) {
        
        
        
    }
//-----------------------------------------------------------------------------------//
    
//-----------------PATHFINDING------------------------------------------------//
/**
    var pathLayer = svgDoc.getElementById("Pathways");
    var pathway = svgDoc.getElementById("path1142");
    var pathCoord = pathway.getAttribute("d");
    
    var sod = pathway.getAttribute("sodipodi:nodetypes");
    console.log(pathway);
    console.log(pathCoord);
    console.log(sod.length + " Paths");
    
    $(pathway).click(function() {
       buildThis();
        console.log("click");
    });
    
    function buildThis() {
        //M = base XY, H = Draw Horizontal, V = verticle
        //each number is a nodePoint
        pathway.setAttribute("d", "M 5.6594321,94.005023 H 16.557347 27.969756 43.685203 v 31.898617 h 17.679881 16.089625 10.944687 11.599498 11.505956 20.01848 40.5047 17.67988 v -8.60608 -8.60607" );
        
        //building new line - doesn't work (doesn't appear?)
       var newElem = document.createElement("path");
        newElem.setAttribute("style", "fill-opacity: 1; stroke-linecap: butt; stroke-linejoin: miter; stroke-opacity: 1;");
        newElem.setAttribute("d", pathCoord);
        newElem.setAttribute("inkscape:connector-curvature", "0");
        newElem.setAttribute("sodipodi:nodetypes", sod);
        newElem.style.stroke = "#ff0000";
        newElem.style.visibility = "true";
        newElem.style.strokeWidth = "5px";
        pathLayer.append(newElem);
    }
*/
    
//-------------------------------------------------------------------------//
  
//---Panning settings ----------------------------------------------------//
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
    document.getElementById("mapTab").click()
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






  
