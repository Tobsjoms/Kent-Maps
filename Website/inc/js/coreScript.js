

//includes scripts that go across entire site, none page specific such as search funtions.
//consider edge case for getting timetable html back
//potentially can be done by clicking anywhere BUT a room returns specific ID and check for that ID returned If SO then don't change or change back to the timetable UI!
//need more UI Divs to hook onto for each bit of data eg staffid, name, department


$(window).on('load', (function(){

    $('#overlay').delay(400).fadeOut(200);  
    
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

var LongNames = [
    ["CW-S-GF", "Cornwallis South Ground"],
    ["CW-S-FF", "Cornwallis South First"],
    ["CW-E-GF", "Cornwallis East Ground"],
    ["CW-E-FF", "Cornwallis East First"],
    ["CW-SW-GF", "Cornwallis SouthWest Ground"],
    ["CW-SW-FF", "Cornwallis SouthWest First"],
    ["CW-Oct-GF", "Cornwallis Octogon Ground"],
    ["CW-NW-GF", "Cornwallis NorthWest First"],
    ["CW-NW-FF", "Cornwallis NorthWest First"]
];

function getCurrentMap() {
    //finds map name from the filename of the loaded map in 'stage'
    var mapObj = document.getElementById("stage");
    var dataURL = mapObj.data;
    
    var name = dataURL.substring(
    dataURL.lastIndexOf("floorplans/") +11,
        dataURL.lastIndexOf(".svg")
        );
    
    
    //if a building longname exists, replace it instead of shortname
    for(i = 0; i < LongNames.length; i++) {
        if (name == LongNames[i][0]) {
            name = LongNames[i][1];
        }
    }
    return name;
}





 function searchPopup(searchData) {
    console.log("--------Data------------");
     console.log(searchData);
    console.log("------------------------");
     //loop through data
     //add to page on each loop inside a list element
     //you could check if data exists, so like on lines 79 and 81 if you check for a column and it doesnt exist
     //then it will return undefined when you try to access it, use that to your advantage in a big if statement
     
     
     //README
     //call roomPopup or building popup with new payload

 }

function roomPopup(currentID, roomInfo) { //-----------------------------------------------
    document.getElementById("itemPicture").innerHTML = "";
    var gotRoom = true;
    var gotStaff = true;
    var staffLength;
    console.log(roomInfo);

    //-------IF RETURN DATA IS EMPTY-------------------------------------------
    if (roomInfo.length == 0) {
        console.log("No DB.Room or DB.Staff Information for " + currentID);
        gotRoom = false;
        gotStaff = false;
    }
    //---------IF RETURN DATA IS NOT EMPTY-------------------------------------
    else if (roomInfo.length > 0) {
        //-------------Check if specific room data exists------------
        var checkRoomData = roomInfo[roomInfo.length-1].RoomType;
        if(typeof checkRoomData == "undefined") {
            gotRoom = false;
        } else {
            gotRoom = true;
               }
        //------------Check If Room's Staff data Exists--------------
        var checkStaffData = roomInfo[0].StaffID;
        if(typeof checkStaffData == "undefined") {
            gotStaff = false;
            }
        
        else {
            if (gotStaff) {
                    if(gotRoom) {
                        staffLength = roomInfo.length -1;
                        console.log(staffLength);
                    }
                    if(!gotRoom) {
                        staffLength = roomInfo.length;
                        console.log(staffLength);
                    }
                

                
            }
             
            
            }
        }
    
    /*---------------------putting into page------------------------
    ---------------------------------------------------------------*/
    
    //---------if we don't have room info--------------------
    if(!gotRoom) {
        document.getElementById('itemTitle').innerHTML = "<a> " + "Unknown Room" + "</a> </br>";
        document.getElementById('itemInfo').innerHTML = "<a> Sorry! it appears we don't have any data for this room! </br> If you think this room is accessible then report this issue to </br> <a id = 'linkgen'> help@UKCGuru.com </a> </a> ";
        document.getElementById('itemLinks').innerHTML = "";
        document.getElementById('itemRooms').innerHTML = "";
    }
    
    //--------if we DO have room Info-----------------------
    if (gotRoom) {
        document.getElementById('itemTitle').innerHTML = " <a> " + roomInfo[roomInfo.length-1].RoomType + "</a> </br>";
        document.getElementById('itemInfo').innerHTML = "<a id = 'panel-title'> Room: " + currentID + "</br>" + getCurrentMap() + "</br>";
        document.getElementById('itemRooms').innerHTML = "</br> <a id = 'textSeperator'> Other Room Details </a> </br> <a id = 'smallRoomDetails'> Equipment:  "+ roomInfo[roomInfo.length-1].Equipment + "</br> Disabled Access: " + roomInfo[roomInfo.length-1]["Disabled Access"] + "</br> Capactiy: " + roomInfo[roomInfo.length-1].Capacity + " </a>"
    }
    
    //-------if we DONT have staff info---------------------
    
    if (!gotStaff) {
        document.getElementById("itemStaffInfo").innerHTML = "</br> <a id = 'panel-title-h1'> Staff Details </br> " + "</br> <a id = 'panel-title-h2'> There is no staff assigned to this room </a>";
    }
    
    
    
    //--------if We DO have Staff Info----------------------
    
    if(gotStaff) {
        document.getElementById("itemStaffInfo").innerHTML = "</br> <a id = 'panel-title-h1'> Staff Details </a> </br>";
        
        for(i = 0; i < staffLength; i++) {
            document.getElementById("itemStaffInfo").innerHTML += "</br> <a id = 'panel-title-h2'> " + roomInfo[i].StaffName + " (" + roomInfo[i].StaffID + ")</a>" + "<div id = 'sDetails" + i + "'" + "</div>";
            elemID = "sDetails" + i;
            document.getElementById(elemID).innerHTML += "<a>"+ roomInfo[i].StaffDescription + "</br>" + roomInfo[i].StaffEmail +"</a>";
        }
        
    }
            

    document.getElementById('search-result').click();
    
    

}//--------------------------------------------------------------------------------------------



  
function buildingPopup(currentID, buildingData) {
    console.log("popup");
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
    document.getElementById('search-result').click();
}

            function zoom(zoomIn){
        if (zoomIn){
            panZoom.zoomIn();
        }
        else{
            panZoom.zoomOut();
        }
    }