$( document ).ready(function() {

});

$(window).on('load', (function(){
    var a = document.getElementById('stage');
    var svgDoc = a.contentDocument;

    
    var svgItem = svgDoc.getElementById("Buildings"); //buildings
    var GroundObject = svgDoc.getElementById("Ground"); //Ground
    var RoadObject = svgDoc.getElementById("Roads"); //Roads
    var svgItem2 = svgDoc.getElementById("Pathways"); //Pathways
    var textsObject = svgDoc.getElementById("Text"); //Text Layer Objects
    var iconsObject = svgDoc.getElementById("Icons"); //Icon Layer Objects
    var parkIconsObject = svgDoc.getElementById("Park-Symbols"); //Park Symbols 
    var allSVG= svgDoc.getElementById("svg16");
    var b = svgItem.getElementsByTagName("path");
    
    var targets = ["Ground", "Roads", "Pathways", "Buildings", "Text"];

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
        controlIconsEnabled: false
        });
    panZoom.zoom(0.8);
    panZoom.center();
    var rectID = new Array();
    for(i=0; i < b.length; i++) {
        //pushing all rect elements within svgItem into an array for search functionality
        rectID.push(b[i].id);
    }
    
//Building Interactivity----------------------------------------------
//--------------------------------------------------------------------
svgItem.onclick = function(event) {
var currentID = event.target.id;
    //get current id of object within svgItem
getBuildingData(currentID);
    ColourModeSet();
}
    
    function getBuildingData(id) {
        var buildingData = [] //JSON Data
        $.ajax({
        type: "POST",
        url: "../site/inc/php/getBuildingData.php",
        data: {id: id}, //send roomID to script
        success: function(response) {
            buildingData = JSON.parse(response); //parse as JSON object
            buildingPopup(id, buildingData); //pass room and JSON object to RoomPopup function
            }
        });
    }
    
//Map Colour Modes (Dark Mode, etc)------------------------------------
//---------------------------------------------------------------------
    
    
$("#sClick").click(function(){
    var darky = "Dark";
    ColourModeSet(darky); 
});    
    
    function ColourModeSet(colour) {
        //takes colour as param (pass from elsewhere), sets respective colour set and applies
        //ColSet order is defined as follows - 
        //[Ground, Buildings, Roads, Pathways, Text, Icons, Background] ground = grass
        var colSet = [];
        if (colour == "Dark") {
            colSet = ["#85b184","#778494","#363636","#c7c7c7","#484848","#707070","#58595a"];
        }
        else if (colour == "Light") {
            colSet = [""];
        }
        else if (colour == "Blind") {
            colSet = [""];
        }
        //Ground Objects
        var GroundElems = GroundObject.getElementsByTagName("path"); 
        
        var svgBackground = GroundObject.getElementsByTagName("rect"); 
        //Building Objects
        var BuildingElems = svgItem.getElementsByTagName("path"); 
        //Road Objects
        var RoadElems = RoadObject.getElementsByTagName("path");
        //Pathway Objects
        var PathwayElems = svgItem2.getElementsByTagName("path"); 
        //Text Objects
        var textElems = textsObject.getElementsByTagName("tspan");
        //icons objects
        var iconsElems = iconsObject.getElementsByTagName("use");
        
        
        
        //loops for each layer (though could be a single recursive if im smart) potentially via case switch
        
        for(i = 0; i < GroundElems.length; i++ ) { //Buildings
            GroundElems[i].style.fill = colSet[0];
        }
        for(i = 0; i < BuildingElems.length; i++ ) { //Pathways
            BuildingElems[i].style.fill = colSet[1];
        }
        for(i = 0; i < RoadElems.length; i++ ) { //Buildings
            RoadElems[i].style.fill = colSet[2];
        }
        for(i = 0; i < PathwayElems.length; i++ ) { //Pathways
            PathwayElems[i].style.fill = colSet[3];
        }
        for(i = 0; i < textElems.length; i++ ) { //Icons
            textElems[i].style.fill = colSet[4];
        }
        for(i = 0; i < iconsElems.length; i++ ) { //Icons
            iconsElems[i].style.fill = colSet[5];
            svgBackground[i].style.fill = colSet[6];
        }
        
    }
    
    
    
    
    
    
}));