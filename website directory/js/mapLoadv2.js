$( document ).ready(function() {

$(function() {
    $("#stage").load('map.svg', function(response) {
        $(this).addClass("svgLoaded");
        
        if(!response) {
            alert("Error Loading SVG");
        }
    });
    
});
    
    $("svgLoaded").each(function(){
        var $img = $(this);
        console.log($img);
    })

});