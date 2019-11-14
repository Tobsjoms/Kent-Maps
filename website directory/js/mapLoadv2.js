$( document ).ready(function() {

});

$(window).on('load', (function(){

    var a = document.getElementById('stage');
    var svgDoc = a.contentDocument;
    var svgItem = svgDoc.getElementById("Offices"); //All items under the Office Layer
    var allSVG= svgDoc.getElementById("svg8");
    var b = svgItem.getElementsByTagName("rect");
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