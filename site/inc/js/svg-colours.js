
var targets = ["Ground", "Roads", "Pathways", "Buidlings", "text"];

function updateSVGColourScheme() {
	// Get the SVG element
	var svgObject = document.getElementById("stage").contentDocument;
	// Get all groups
	var groups = svgObject.getElementsByTagName("g");

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
	    targetedNodes[i].style.removeProperty('opacity');
	}
}