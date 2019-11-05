$( document ).ready(function() {

$(function() {
    $("#stage").load('map.svg', function(response) {
        $(this).addClass("svgLoaded");
        
        if(!response) {
            alert("Error Loading SVG");
        }
    });
    
});


});