$( document ).ready(function() {

});

$(window).on('load', (function(){
    var a = document.getElementById('stage');
    var svgDoc = a.contentDocument;
    var svgItem = svgDoc.getElementById("Buildings");
    var svgItem2 = svgDoc.getElementById("Pathways"); //Pathways
    var allSVG= svgDoc.getElementById("svg16");
    var b = svgItem.getElementsByTagName("path");
    var text = svgItem2.getElementsByTagName("tspan");
    
    
var targets = ["Ground", "Roads", "Pathways", "Buildings", "text"];

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
    
// panning
var panZoom = svgPanZoom(allSVG, {
				        zoomEnabled: true,
				        minZoom: 0.8,
				        controlIconsEnabled: false
				    });

				    panZoom.zoom(0.8);
				    panZoom.center();

				    updateSVGColourScheme();
    
    console.log(svgDoc);
    console.log(svgItem);
    console.log(b);
    
    var rectID = new Array();
    for(i=0; i < b.length; i++) {
        //pushing all rect elements within svgItem into an array for search functionality
        rectID.push(b[i].id);
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