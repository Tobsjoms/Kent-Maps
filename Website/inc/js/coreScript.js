

//includes scripts that go across entire site, none page specific such as search funtions.
//consider edge case for getting timetable html back
//potentially can be done by clicking anywhere BUT a room returns specific ID and check for that ID returned If SO then don't change or change back to the timetable UI!
//need more UI Divs to hook onto for each bit of data eg staffid, name, department


$(window).on('load', (function(){

     $("#sButton").click(function() {
         var searchValue = document.getElementById("sInput").value;
             var searchData = []; //data prep for return JSON data

        console.log(searchValue);
         
          $.ajax({
        type: "POST",
        url: "../Website/inc/php/getSearchData.php",
        data: {value: searchValue}, 
        success: function(response) {
            searchData = JSON.parse(response); //parse as JSON object
            searchPopup(searchData);
        }

    });
         
         
    });

}));


 function searchPopup(searchData) {
    console.log("--------Data------------");
     console.log(searchData);
    console.log("------------------------");
     
    url = ".../Website/index.php?buildingID=search";

 }

function roomPopup(currentID, roomInfo) {
    //check room has data
    console.log("--------Data------------");
    console.log(roomInfo);
    console.log("------------------------");
    //Check for empty response from DB
    if (roomInfo.length == 0) {
        console.log("No DB.Room or DB.Staff Information for " + currentID);
    }
    else if (roomInfo.length > 0) {
        var checkRoomData = roomInfo[roomInfo.length-1].RoomType;
        if(typeof checkRoomData == "undefined") {
            console.log("No DB.Room Information for " + currentID);
        }
        var checkStaffData = roomInfo[0].StaffID;
        if(typeof checkStaffData == "undefined") {
            console.log("No DB.Staff Information for " + currentID);
            }
        }
    
    //plug data into UI elements
    
    
    
    
    /**
    $("#timetable").html("Room:"  + currentID);
    $("#timetable").css({"font-size": "26px"});

    var dataLength = roomInfo.length;
    str = '<ul>';
    p = '<p>Staff In: </p>' + currentID;
    for(i=0; i < dataLength; i++) {
            index = roomInfo[i];
            str += '<li>' + index.Name + '</li>';
        }
    str += '</ul>';
    document.getElementById('timetable').innerHTML = p + str;
*/
}    
  
function buildingPopup(currentID, buildingData) {
    var gotHOS = true; //got head of school data, assumed true
    var thisBuilding = buildingData[0];
    if(typeof thisBuilding == 'undefined') {
        thisBuilding = {BuildingID: "None", 
                        BuildingName: currentID, 
                        BuildingDescription: "None", 
                        BuildingFloorID: "0", 
                        FloorCount: "0"};
    }
    if(thisBuilding.StaffDepartment == null) {
        console.log("Null staff Data");
        gotHOS = false;
        document.getElementById("itemStaffInfo").innerHTML = ""; //empty the staff info div
        
    }
    document.getElementById('itemTitle').innerHTML = "<a>" + thisBuilding.BuildingName + "</a>";
    document.getElementById('itemInfo').innerHTML = "<a>" + thisBuilding.BuildingDescription + "</a>";
    
    if (gotHOS == true) {  //only adding staff data if avaliable
    document.getElementById('itemStaffInfo').innerHTML = "<a id = 'panel-title'>" + "Head Of School: " + "</br> </a>" + "<a>" + thisBuilding.StaffName + "</br>" + thisBuilding.StaffDescription + "</br>" + thisBuilding.StaffRoomID  + "</br>" + "</a>";
    }
    //build links to interior maps
    var mapLink = "";
    for(i=0; i < thisBuilding.FloorCount; i++) { //generate links to inteior maps based on floorcount of building
            if (i == 0) { long = " Ground Floor"; short = "GF"};
            if (i == 1) { long = " First Floor"; short = "FF"};
            if (i == 2) { long = " Second Floor"; short = "SF" };
            if (i == 3) { long = " Third Floor"; short = "TF" };
            if (i == 4) { long = " Fourth Floor"; short = "4F" };
        mapLink +=  '<a id = linkgen onclick=window.open("/Kent-Maps/Website/index.php?buildingID=' + thisBuilding.BuildingID + "-" + short + ".svg" + '")>' + thisBuilding.BuildingName + long + '</a> </br>';
    }
    document.getElementById("itemLinks").innerHTML = "<a id = 'panel-title'> Interior Map Links </a> </br>" + mapLink;
    
    var lecRooms = "<a> None </a> </br>";
    var CompRooms = "<a> None </a> </br>";
    var SemRooms = "<a> None </a> </br>";
    
    if(typeof buildingData[1] != "undefined" || typeof buildingData[1] != null){
        console.log(buildingData);
        for (i = 0; i < buildingData.length; i++) {
            
            if (buildingData[i].RoomType == "Lecture Theatre" && typeof buildingData[i].RoomID != "undefined") {
                if(lecRooms.includes("None")) {lecRooms = "";}
                lecRooms += "<a>" + buildingData[i].RoomID + "</a> </br>";
                
            }
            
            if (buildingData[i].RoomType == "Computer Room" && typeof buildingData[i].RoomID != "undefined") {
                if(CompRooms.includes("None")) {CompRooms = "";}
                CompRooms += "<a>" + buildingData[i].RoomID + "</a> </br>";
            }
            
            if (buildingData[i].RoomType == "Seminar Room" || buildingData[i].RoomType == "Classroom" && typeof buildingData[i].RoomID != "undefined") {
                if(SemRooms.includes("None")) {SemRooms = "";}
                SemRooms += "<a>" + buildingData[i].RoomID + "</a> </br>";
            }
        }
        

        document.getElementById("itemRooms").innerHTML = "<a id ='panel-title'> Lecture Rooms </a> </br>" + lecRooms + "<a id ='panel-title'> Computing Rooms </a> </br>" + CompRooms + "<a id ='panel-title'> Seminar Rooms </a> </br>" + SemRooms;
    }
}

