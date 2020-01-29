$(window).on('load', (function(){
 
     $("#sButton").click(function() {
         var searchValue = document.getElementById("sInput").value;
             var searchData = []; //data prep for return JSON data

        console.log(searchValue);
         
          $.ajax({
        type: "POST",
        url: "../Website/inc/php/getSearchData.php",
        data: {value: searchValue}, 
        success: function(response) {
            searchData = JSON.parse(response); //parse as JSON object
            searchPopup(searchData);
        }

    });
         
         
    });
    
//------SVG Manipulation---------------------------------------------------------------//

    var a = document.getElementById('stage');
    var svgDoc = a.contentDocument;
    var allSVG= svgDoc.getElementById("Map");
    var mapRooms = svgDoc.getElementById("Rooms"); //All Rooms
    var roomPaths = mapRooms.getElementsByTagName("path");
    var roomRect = mapRooms.getElementsByTagName("rect");
    var targets = ["Building", "Rooms", "Pathways", "Doors", "Icons", "Labels"];
    
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





var roomIDs = new Array();

function runSearch() {
var searchValue = document.getElementById("sInput").value;
    console.log("")
for(var j = 0; j < roomIDs.length; j++) {
    if (roomIDs[j].match(searchValue)) { 
        
        }
    } 
}

  