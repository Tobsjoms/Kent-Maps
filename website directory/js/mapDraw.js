$( document ).ready(function() {
    console.log( "ready!" );

    var m = Snap('#svg');
    var group = m.group();
    Snap.load("floorplans/Ground_Floor.svg", onSVGLoaded);

    function onSVGLoaded (svg) {
        group.append( svg );
        group.hover(function() { console.log("test");});
        }



//index rooms via id
//for loop iterate and obtain all rect ID, put in an array for reference 

});



