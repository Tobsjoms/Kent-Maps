$( document ).ready(function() {

});

$(window).on('load', (function(){
    
    var a = document.getElementById('stage');
    var svgDoc = a.contentDocument;
    var allSVG= svgDoc.getElementById("CW-SW-GF");
    
    var mapRooms = svgDoc.getElementById("Rooms"); //AllRooms
        var roomPaths = mapRooms.getElementsByTagName("path");
        var roomRect = mapRooms.getElementsByTagName("rect");

    
// panning
var panZoom = svgPanZoom(allSVG, {
zoomEnabled: true,
minZoom: 0.8,
controlIconsEnabled: false
});

panZoom.zoom(0.8);
panZoom.center();


    
    var roomIDs = new Array();
    console.log(roomPaths);
    
    for(i=0; i < roomRect.length; i++) {
        //pushing all rect elements within mapRooms into an array for search functionality
        roomIDs.push(roomRect[i].id);
    }    
    
    for(i=0; i < roomPaths.length; i++) {
        //pushing all path elements within mapRooms into an array for search functionality
        roomIDs.push(roomPaths[i].id);
    }
    
    

    //Click anywhere on the SVG 
        mapRooms.onclick = function() {
        var currentID = event.target.id;
        getRoomData(currentID);

    }
    
//obtain the roomData        
function getRoomData(id) {
    var roomData = []; //data prep for return JSON data
    console.log(id);
    $.ajax({
        type: "POST",
        url: "../site/inc/php/getRoomData.php",
        data: {id: id}, //send roomID to script
        success: function(response) {
            roomData = JSON.parse(response); //parse as JSON object
            roomPopup(id, roomData); //pass room and JSON object to RoomPopup function
        }

    });
        
}

    function roomPopup(currentID, roomData) {
        //consider edge case for getting timetable html back
        //potentially can be done by clicking anywhere BUT a room returns specific ID and check for that ID returned If SO then don't change or change back to the timetable UI!
        console.log(roomData);
        //need more UI Divs to hook onto for each bit of data eg staffid, name, department
        $("#timetable").html("Room:"  + currentID);
        $("#timetable").css({"font-size": "26px"});
        
        var dataLength = roomData.length;
        str = '<ul>';
        p = '<p>Staff In: </p>' + currentID;
        for(i=0; i < dataLength; i++) {
            index = roomData[i];
            str += '<li>' + index.Name + '</li>';
            console.log(index.Name);
        }
        str += '</ul>';
        document.getElementById('timetable').innerHTML = p + str;

    }
    
$("#clicky").click(function() {
        for (var i=0; i < b.length; i++) {
            if (b[i].style.visibility = "visible") {
            b[i].style.visibility = "hidden";
            }
        }
    });
    
    $("#clicky2").click(function() {
        for (var i=0; i < b.length; i++) {
            if (b[i].style.visibility = "hidden") {
            b[i].style.visibility = "visible";
            }
        }
    });
    
    
        $("#clicky3").click(function() {
        for (var i=0; i < text.length; i++) {
            if (text[i].style.visibility = "visible") {
            text[i].style.visibility = "hidden";
            }
        }
    });
    
    $("#clicky4").click(function() {
        for (var i=0; i < text.length; i++) {
            if (text[i].style.visibility = "hidden") {
            text[i].style.visibility = "visible";
            }
        }
    });
    
}));