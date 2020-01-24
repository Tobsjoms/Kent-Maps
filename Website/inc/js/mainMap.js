
// Object parent to all svg nodes
allSVG = null;

currentColourMode = null;

function changeColourMode(colourMode){
    allSVG.classList.remove(currentColourMode);
    allSVG.classList.add(colourMode);
    currentColourMode = colourMode;
}

$(window).on('load', (function(){
    var a = document.getElementById('stage');
    var svgDoc = a.contentDocument;

    
    var svgItem = svgDoc.getElementById("Buildings"); //buildings
    svgItem.classList.add("svg-buildings");

    var GroundObject = svgDoc.getElementById("Ground"); //Ground
    GroundObject.classList.add("svg-ground");

    var RoadObject = svgDoc.getElementById("Roads"); //Roads
    RoadObject.classList.add("svg-roads");

    var svgItem2 = svgDoc.getElementById("Pathways"); //Pathways
    svgItem2.classList.add("svg-pathways");

    var textsObject = svgDoc.getElementById("Text"); //Text Layer Objects
    textsObject.classList.add("svg-text");

    var iconsObject = svgDoc.getElementById("Icons"); //Icon Layer Objects
    iconsObject.classList.add("svg-icons");

    var parkIconsObject = svgDoc.getElementById("Park-Symbols"); //Park Symbols 
    parkIconsObject.classList.add("svg-parksymbols");


    allSVG = svgDoc.getElementById("svg16");

    var b = svgItem.getElementsByTagName("path");
    
    var targets = ["Ground", "Roads", "Pathways", "Buildings", "Text"];


    // Set SVG to have the user-set colour scheme (if we have it)
    if (document.body.id) 
        changeColourMode(document.body.id);
    else
        changeColourMode("default");

    /*
        REMOVE STYLES FROM SVG ELEMENTS
    */

    // Get all groups
	var groups = svgDoc.getElementsByTagName("g");
    // Holds target nodes
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
        targetedNodes[i].style.removeProperty('font');
	}
    
    //User Object filtering ------------------------------------------------

    
    var parkIcon = parkIconsObject.getElementsByTagName("use"); //actual parking icons

    $("#parkToggle").click(function() {
        console.log(parkIcon.length);
        var checkBox = document.getElementById("parkToggle");
        
        if (checkBox.checked == true) {
            for(i=0; i < parkIcon.length; i++) {
                parkIcon[i].style.visibility = "hidden";
            }
        }
        else {
            if (parkIcon[1].style.visibility = "hidden") {
                for(i=0; i < parkIcon.length; i++) {
                    parkIcon[i].style.visibility = "visible";
                }
            }
        }
    });
    
    //---------------------------------------------------------------------
    // panning config------------------------------------------------------
    var panZoom = svgPanZoom(allSVG, {
        zoomEnabled: true,
        minZoom: 0.8,
        controlIconsEnabled: false,
        preventMouseEventsDefault: false
    });
    panZoom.contain();
    panZoom.center();
    var rectID = new Array();
    for(i=0; i < b.length; i++) {
        //pushing all rect elements within svgItem into an array for search functionality
        rectID.push(b[i].id);
    }
    
    //zoomButtons
    $("#zoomIn").click(function() {
        panZoom.zoomIn();
    });    
    
    $("#zoomOut").click(function() {
        panZoom.zoomOut();
    });
    
    
    //Building Interactivity----------------------------------------------
    //--------------------------------------------------------------------
    svgItem.onclick = function(event) {
        var currentID = event.target.id;
        //get current id of object within svgItem
        getBuildingData(currentID);
    }
    
    function getBuildingData(id) {
        var buildingData = [] //JSON Data
        $.ajax({
        type: "POST",
        url: "../Website/inc/php/getBuildingData.php",
        data: {id: id}, //send roomID to script
        success: function(response) {
            buildingData = JSON.parse(response); //parse as JSON object
            buildingPopup(id, buildingData); //pass room and JSON object to RoomPopup function
            }
        });
    }
 
}));