
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
    
    var BusIconsObject = svgDoc.getElementById("Bus-Symbols");
   // BusIconsObject.classList.add("svg-bussymbols");

   // console.log(parkIconsObject);
    allSVG = svgDoc.getElementById("svg16");

    var b = svgItem.getElementsByTagName("path");
    var parkIcon = parkIconsObject.getElementsByTagName("path");
    var busIcon = BusIconsObject.getElementsByTagName("path");
    var textElem = textsObject.getElementsByTagName("tspan");
    
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
        //console.log(targetedNodes[i])
		// Skip weird # elements
		if (typeof targetedNodes[i].tagName === 'undefined'){continue};
		// Remove style
	    targetedNodes[i].style.removeProperty('fill');
	    targetedNodes[i].style.removeProperty('stroke');
	    targetedNodes[i].style.removeProperty('stroke-width');
	    targetedNodes[i].style.removeProperty('opacity');
        targetedNodes[i].style.removeProperty('font');
        targetedNodes[i].style.removeProperty('font-family');
        

            
    }
    //CHROME FIX FOR OBJECT SHADOWS
    //USES PRESET "<feDropShadow> shadow3" values inbedded in the "<def>" tag at the top of the SVG doc
    for(var i = 0; i < b.length; i++) {
        var current = b[i];
        var att = document.createAttribute("filter");
       // att.value = "url(#shadow)";
        current.setAttribute("filter", "url(#shadow3)");
        //console.log("set shadow");
    }
    for(var i = 0; i < parkIcon.length; i++) {
        var current = parkIcon[i];
        
        var att = document.createAttribute("filter");
       // att.value = "url(#shadow)";
        current.setAttribute("filter", "url(#shadow3)");
        //console.log("set shadow");
    }
    
        for(var i = 0; i < busIcon.length; i++) {
        var current = busIcon[i];
        
        var att = document.createAttribute("filter");
       // att.value = "url(#shadow)";
        current.setAttribute("filter", "url(#shadow3)");
        //console.log("set shadow");
    }
        for(var i = 0; i < textElem.length; i++) {
        var current = textElem[i];
        var att = document.createAttribute("filter");
       // att.value = "url(#shadow)";
        current.setAttribute("filter", "url(#shadow)");
        
      //  console.log("set shadow");
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
// SVG-pan-Zoom config------------------------------------------------------
    
        //stop overpanning code
    
   
    
    var panZoom = svgPanZoom(allSVG, {
        zoomEnabled: true,
        minZoom: 0.8,
        refreshRate: 80,
        controlIconsEnabled: false,
        mouseWheelZoomEnabled: false,
        preventMouseEventsDefault: false,
        dblClickZoomEnabled: false
  
    });
    
    
    panZoom.contain();
    panZoom.center();
    panZoom.setZoomScaleSensitivity(0.5);
    
    var rectID = new Array();
    for(i=0; i < b.length; i++) {
        //pushing all rect elements within svgItem into an array for search functionality
        rectID.push(b[i].id);
    }

    
    function customZoomBy(amount, zoomtype) {
        var animationTime = 300 // ms
            , animationStepTime = 15 // one frame per 30 ms
            , animationSteps = animationTime / animationStepTime
            , animationStep = 0
            , intervalID = null
            , stepX = amount.x / animationSteps
            , stepY = amount.y / animationSteps

          intervalID = setInterval(function(){
            if (animationStep++ < animationSteps) {
                if (zoomtype == "zoomIn") {
                    panZoom.zoomBy(amount);
                }
                else if (zoomtype == "zoomOut") {
                    panZoom.zoomBy(amount);
                }
                
                else if (zoomtype == "pan") {
                    panZoom.panBy({x: stepX, y: stepY});
                }

                
              
            } else {
              // Cancel interval
              clearInterval(intervalID)
            }
          }, animationStepTime)
        }
 
    $("#zoomIn").click(function() {
            customZoomBy(1.02, "zoomIn");

    });    
    
    $("#zoomOut").click(function() {
        customZoomBy(0.98, "zoomOut");
    });
    
    
    $('#map_centre').click(function() {
        customZoomBy(0.95, "zoomOut");
        customZoomBy({x: 25, y: 50}, "pan");
        
    });
    
    $(allSVG).on('wheel', function(e) {
        var delta = e.originalEvent.deltaY;
        
        if (delta > 0) {
            //down
            customZoomBy(0.98, "zoomOut");
        }
        else {
            //up
            customZoomBy(1.02, "zoomIn");
        }
    })
    
    
    //Building Interactivity----------------------------------------------
    //--------------------------------------------------------------------
    svgItem.onclick = function(event) {
        
        var currentID = event.target.id;
        
        var currentItem = event.target;
        focusSvgElement(currentItem);
            
        console.log("click!"+ currentID);
        //get current id of object within svgItem
        getBuildingData(currentID);
        console.log();
        var res = document.getElementById("search results");
        $(res).slideUp();
        

    }
    
    
    function focusSvgElement(currentItem) {
        //pass object
        currentID = currentItem.id;
        for(i = 0; i < rectID.length; i++) {
            if (currentID != rectID[i]) {
                svgDoc.getElementById(rectID[i]).style.removeProperty('fill'); 
                svgDoc.getElementById(rectID[i]).style.removeProperty('stroke'); 
            }
        }
        
         currentItem.style.fill = "#efdfab";
         currentItem.style.stroke = "#ffc400";

        
    }
    
    function getBuildingData(id) {
            buildingPopup(id);
    }
    
    function inspectBuilding(id) {
        id.style.fill = "red";
    }
 
    
  
    
}));