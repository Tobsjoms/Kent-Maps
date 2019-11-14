$( document ).ready(function() {

});

$(window).on('load', (function(){

    var a = document.getElementById('stage');
    var svgDoc = a.contentDocument;
    var svgItem = svgDoc.getElementById("Offices");
    
    var b = svgItem.getElementsByTagName("rect");
    console.log(svgDoc);
    console.log(svgItem);
    console.log(b);
    var rectID = new Array();

 
    
    
    for(i=0; i < b.length; i++) {
        rectID.push(b[i].id);
    }
    
    

    svgItem.onclick = function() {
        
        var currentID = event.target.id;
    }
    
    function getRoomData(currentID) {
        //pass id of current room to this func
        //php script queries DB with roomID providing roomID is PK
        //php returns dataset, loops through and displays
        //as side popup
    }
    
}));