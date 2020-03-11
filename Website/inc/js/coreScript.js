

//includes scripts that go across entire site, none page specific such as search funtions.
//consider edge case for getting timetable html back
//potentially can be done by clicking anywhere BUT a room returns specific ID and check for that ID returned If SO then don't change or change back to the timetable UI!
//need more UI Divs to hook onto for each bit of data eg staffid, name, department

$(window).on('load', (function(){


    
    var searchValue = "";
    var URL = window.location.href; 
    if (URL.includes("search")) {
    var URLSearchValue = URL.substring(
    URL.lastIndexOf("=") +1);
    }
    
    if (typeof URLSearchValue != "undefined" ||  typeof URLSearchValue != null || URLSearchValue != "" ) {
        
        searchValue = URLSearchValue;
    }
    
    
    var storedSearchValue = sessionStorage.getItem("searchValue");
    
     if (URL.includes("search")) {
            if (searchValue != "") {
                $.ajax({
                    type: "POST",
                    url: "../Website/inc/php/getSearchData.php",
                    data: {value: searchValue}, 
                    success: function(response) {
                        searchData = JSON.parse(response); //parse as JSON object
                        searchPopup(searchData);
                            }
                        });
                    }
                }
    
     $("#sButton").click(function() {
         if(searchValue != "" || searchValue != null || typeof searchValue != "undefined" ) {
             var searchValue = document.getElementById("sInput").value;
         }
         
        sessionStorage.setItem("searchValue", searchValue);
        location.replace("/Kent-Maps/Website/index.php?search=" + searchValue);
        var searchData = []; //data prep for return JSON data
        
    
         
     });
}));


 function searchPopup(searchData) {
/*    console.log("--------Data------------");
     console.log(searchData);
    console.log("------------------------");
  */   //loop through data
     //add to page on each loop inside a list element
     //you could check if data exists, so like on lines 79 and 81 if you check for a column and it doesnt exist
     //then it will return undefined when you try to access it, use that to your advantage in a big if statement

 }

function roomPopup(currentID, roomInfo) {
    //check room has data
   
    //Check for empty response from DB
    if (roomInfo.length == 0) {
        console.log("No DB.Room or DB.Staff Information for " + currentID);
    }
    else if (roomInfo.length > 0) {
        
        var checkRoomData = roomInfo[roomInfo.length-1].RoomType;
        
        if(typeof checkRoomData == "undefined") {
            
            console.log("No DB.Room Information for " + currentID);
            document.getElementById('itemInfo').innerHTML = "<a> " + "Staff Office" + "</a> </br>";
            
        } else {
            
            document.getElementById('itemInfo').innerHTML = "<a> " + roomInfo[roomInfo.length-1].RoomType + "</a> </br>";
               }
        
        var checkStaffData = roomInfo[0].StaffID;
        if(typeof checkStaffData == "undefined") {
            console.log("No DB.Staff Information for " + currentID);
            }
        }
    document.getElementById('itemTitle').innerHTML = "<a id = 'panel-title'> " + currentID
    

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
    
    //Title and Info
    console.log(currentID);
    document.getElementById('itemTitle').innerHTML = "<a>" + thisBuilding.BuildingName + "</a>";

    
    //Building Image
    var placeholderImg = "<img id = 'itemIMG' src = ../Website/inc/img/buildings/Placeholder.jpg >";
    var img = "<img id = 'itemIMG' src = ../Website/inc/img/buildings/" + currentID + ".jpg" + " style= 'object-fit: contain'>";
    document.getElementById('itemPicture').innerHTML = img;
    //Image error handling
    $("#itemIMG").on("error", function() {
        console.log("NO IMAGE");
        document.getElementById('itemPicture').innerHTML = placeholderImg;
    });
    
    //School Type
    document.getElementById('itemInfo').innerHTML = "<a>" + thisBuilding.BuildingDescription + "</a>";
    
    //Head of School information
    if (gotHOS == true) {  //only adding staff data if avaliable
    document.getElementById('itemStaffInfo').innerHTML = "<a id = 'panel-title'>" + "Head Of School: " + "</br> </a>" + "<a>" + thisBuilding.StaffName + "</br>" + thisBuilding.StaffDescription + "</br>" + thisBuilding.StaffRoomID  + "</br>" + "</a>";
    }
    //Interior Maps links
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
    
    //Room Types availiable
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

            function zoom(zoomIn){
        if (zoomIn){
            panZoom.zoomIn();
        }
        else{
            panZoom.zoomOut();
        }
    }