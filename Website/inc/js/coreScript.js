

//includes scripts that go across entire site, none page specific such as search funtions.
//consider edge case for getting timetable html back
//potentially can be done by clicking anywhere BUT a room returns specific ID and check for that ID returned If SO then don't change or change back to the timetable UI!
//need more UI Divs to hook onto for each bit of data eg staffid, name, department
    function getBuildingID() {

        //get mapName from URL file (buildingID="X-X-X".svg)
    var URL = window.location.href;
    var mapName = URL.substring(
    URL.lastIndexOf("buildingID=") +11, 
        URL.lastIndexOf(".svg")
        );
     
    
    var notMain = URL.includes("buildingID=");
     if (!notMain){
         mapName = "mainMap";
     }
        
        return mapName;
     
    }

$(window).on('load', (function(){
    
     var a = document.getElementById('stage');
    var svgDoc = a.contentDocument;
    
    
    


    $('#overlay').delay(400).fadeOut(200);
    
    $("#logo").click(function() {
       location.replace("/Kent-Maps/Website/index.php");
    }); 
    
    $("#home").click(function() {
       location.replace("/Kent-Maps/Website/index.php");
    });
    
    

    

    
//----------------------------------SEARCH------------------------------------------------------------------------//
    var searchValue = "";
    var URL = window.location.href; 
    if (URL.includes("search")) {
    
    var URLSearchValue = URL.substring(
    URL.lastIndexOf("=") +1);
        ajaxSearch(URL, URLSearchValue);
        
        if(URLSearchValue != "undefined") {
            document.getElementById("sInput").value = URLSearchValue;
        }
    }
    
    if ( URLSearchValue != "undefined" ||   URLSearchValue != null || URLSearchValue != "" ) {
        
        searchValue = URLSearchValue;
    }
    var storedSearchValue = sessionStorage.getItem("searchValue");
    
        sessionStorage.setItem("searchValue", searchValue);
         var urlMapID = getBuildingID();
         

    
         $("#sButton").click(function() {
         if(searchValue != "" || searchValue != null || typeof searchValue != "undefined" ) {
             var searchValue = document.getElementById("sInput").value;
             console.log(searchValue);
             ajaxSearch(URL, searchValue);
             
         }
            if (urlMapID == "mainMap") {
             var url2 = "/Kent-Maps/Website/index.php?search=" + searchValue;
             window.history.pushState("index", "UKC Maps", url2);
         } else {
             var url3 = "/Kent-Maps/Website/index.php?buildingID="+ urlMapID + ".svg&search=" + searchValue;
             window.history.pushState("index", "UKC Maps", url3);
         }
        var searchData = []; //data prep for return JSON data
        
    
         
     });
             
     
}));//end of window.onload()----------------------





//----------Search Ajax Call-------------------//
function ajaxSearch(URL, searchValue) {
    if (searchValue != "") {
        $.ajax({
            type: "POST",
            url: "../Website/inc/php/getSearchData.php",
            data: {value: searchValue}, 
            success: function(response) {
                searchData = JSON.parse(response);//parse as JSON object
                searchPopup(searchData, searchValue);
                    }
                });
            }
    }


 function searchPopup(searchData, searchValue) {
     
     var a = document.getElementById('stage');
     var svgDoc = a.contentDocument;
     var svgItem = svgDoc.getElementById("Buildings");

     
     var mapType = getBuildingID();
     console.log("--------Data------------");
     console.log(searchData);
     console.log("------------------------");
     var searchDiv = document.getElementById("search results");
     
     searchDiv.style.opacity = "0";
    
     searchDiv.innerHTML = "<h1> Search Results: </h1> <div id = resultList </div> <div> ";
     
     searchDiv.innerHTML += "<div id = 'resultList2' > </div>";
     searchDiv.innerHTML += "<div id = 'resultList3' > </div>";
     
     var resultsSection = document.getElementById("resultList");
     var resultsSection2 = document.getElementById("resultList2");
     var resultsSection3 = document.getElementById("resultList3");
     var resultsLength = searchData.length;
     

     var StaffIDLength = 0;
     var RoomIDLength = 0;
     var BuildingIDLength = 0;
     
     var indexOfStaffID = findIndex("StaffID");
     console.log("staffID start: " + indexOfStaffID);
     var indexOfBuilding = findIndex("BuildingID");
     console.log("BuildingID start: " + indexOfBuilding);
     var indexOfRoom = findIndex("RoomID");
     console.log("RoomID start: " + indexOfRoom);
     
     function getRoomIDs() {
    if (getBuildingID() != "mainMap") {
    var a = document.getElementById('stage');
    var svgDoc = a.contentDocument;    
    var mapRooms = svgDoc.getElementById("Rooms");//All Rooms
    var roomPaths = mapRooms.getElementsByTagName("path");
    var roomRect = mapRooms.getElementsByTagName("rect");
    var roomIDs = new Array();
    for(i=0; i < roomRect.length; i++) {

    roomIDs.push(roomRect[i].id);
    }    
    for(i=0; i < roomPaths.length; i++) {
        roomIDs.push(roomPaths[i].id);
    } console.log(roomIDs);
    } return roomIDs;
    }
     
     
     function findIndex(type) {
         
        if (type == "StaffID") {
            for (i = 0; i < resultsLength; i++) {
                if ( typeof searchData[i].StaffID != "undefined") {
                    break;
                }
                else if (i == resultsLength-1) {
                    return "none";
                }
            }
        }
        else if (type == "RoomID") {
            for (i = 0; i < resultsLength; i++) {
                if (typeof searchData[i].RoomID != "undefined") {
                    break;
                }
                                else if (i == resultsLength-1) {
                    return "none";
                }
            }
        }
        else if (type == "BuildingID") {
            for (i = 0; i < resultsLength; i++) {
                if ( typeof searchData[i].BuildingID != "undefined") {
                    break;
                }
                                else if (i == resultsLength-1) {
                    return "none";
                }
            }
        }
        
         return i;
    }
     
     if (indexOfStaffID != "none") {
         StaffIDLength = resultsLength - indexOfStaffID; 
     } else {StaffIDLength = 0;}
     
     if (indexOfRoom != "none") {
         if (indexOfStaffID != "none") {
         RoomIDLength = indexOfStaffID-1 - indexOfRoom;
         }
         else {
             RoomIDLength = indexOfRoom - resultsLength;
         }
     } else { RoomIDLength = 0; }
     
     if (indexOfBuilding !="none") {
         if (indexOfRoom != "none") {
         BuildingIDLength = indexOfRoom -1;
         }
         else if (indexOfStaffID !="none") {
             BuildingIDLength = indexOfStaffID;
         } else {BuildingIDLength = resultsLength;} 
         
    } else {BuildingIDLength = 0;}
     
              console.log("Building Data Length " + BuildingIDLength );
         console.log("Room Data Length " + RoomIDLength );
         console.log("Staff Data Length " + StaffIDLength );
     
     if (mapType == "mainMap") {

         //Prioritise building search results
         resultsBuilderBuilding(indexOfBuilding, BuildingIDLength,searchData);
         function resultsBuilderBuilding(indexOfBuilding, BuildingIDLength, searchData) {
         if(indexOfBuilding != "none") {
             resultsSection.innerHTML = "<div id = 'buildingResult'> <a id = 'panel-title-h2'> Campus Buildings: </a> </br></div>";
             for(i = indexOfBuilding; i < BuildingIDLength; i++) {
                 var tuckingID = searchData[i].BuildingID;
                 document.getElementById("buildingResult").innerHTML += "<a id='names'>" +  searchData[i].BuildingName + "</a>" + " - <a class ='linkSet' id = 'link"+ i+"'>" +searchData[i].BuildingID +"</a></br>";
                
             }
             
             $(".linkSet").click(function() {
                 var current = event.target.id;
                 var fullValue = document.getElementById(current).textContent; 
                 
                 var selectBuilding = svgDoc.getElementById(fullValue);
                 focusSvgElement(selectBuilding);
                 buildingPopup(fullValue);
                      
        var res = document.getElementById("search results");
        $(res).slideUp();
                 
                 
             });
             
             

        } 
    }
         resultsBuilderStaff(indexOfStaffID, StaffIDLength, searchData);
    function resultsBuilderStaff(indexOfStaffID, StaffIDLength,searchData) {
        if(indexOfStaffID != "none") {
            resultsSection2.innerHTML = "<div id = 'staffResult'> <a id = 'panel-title-h2'> </br> Staff Information: </a> </br> </div>";
            var flag = 0;
            for (i = indexOfStaffID; i < resultsLength; i++) {
                flag++
                if(flag < 4) {
                    document.getElementById('staffResult').innerHTML += "<a id = 'smallTextTopBorder'>" + searchData[i].StaffName + "</a>" + "<a id ='smallRoomDetails'>" + "<br>" +searchData[i].StaffEmail + "<br>" + searchData[i].StaffDepartment + "</br>"+ searchData[i].StaffRoomID +"</a> </br>";

                } else { break; }
                
            } //massive edge case - can be fixed in database with inner join
            if (indexOfStaffID !="none" && indexOfBuilding == "none") {
                if (searchData[indexOfStaffID].StaffBuildingID == "CW-S") {
                    var setLength = 1;
                    var index = 0;
                    var tempSet = [{BuildingID: "CW-S", BuildingName: "Cornwallis South"}];
                    resultsBuilderBuilding(index, setLength, tempSet);
                    if (indexOfRoom == "none") {
                        var newTempSet = [{RoomID: "S104", RoomType: "Office", BuildingID: "CW-S"}];
                        resultsBuilderRoom(index, setLength, newTempSet);
                    }
                    
                }

            }
        }
    }
    resultsBuilderRoom(indexOfRoom, RoomIDLength, searchData);
    function resultsBuilderRoom(indexOfRoom, RoomIDLength, searchData) {
         if(indexOfRoom !="none") {
             resultsSection3.innerHTML = "<div id = 'roomsResult'></br> <a id = 'panel-title-h2'> Building Rooms: </a> </br> </div>";
             var forLength = 0;
             for(i = indexOfRoom; i < RoomIDLength; i++) {
                 forLength++
                 if(forLength < 5) {
                 document.getElementById("roomsResult").innerHTML += "<a>" + searchData[i].RoomID + "(" + searchData[i].RoomType + ") - " + searchData[i].BuildingID + "</a> </br>";
                 }
                 else {break;}
             }
         }
         
    }
     }else {
         
         
         resultsBuilderIndoor(indexOfRoom, RoomIDLength, searchData)
         function resultsBuilderIndoor(indexOfRoom, RoomIDLength, searchData) {
             var roomIDs = getRoomIDs();
             for(i = 0; i < roomIDs.length; i++) {
                 if(searchValue == roomIDs[i]) {
                     var selectBuilding = svgDoc.getElementById(searchValue);
                    
                     focusIndoorSvgElement(selectBuilding);
                 }
             }
             resultsBuilderIndoorRoom(indexOfRoom, RoomIDLength, searchData) 
             
             function resultsBuilderIndoorRoom(indexOfRoom, RoomIDLength, searchData) {
             if (indexOfRoom != "none") {
             resultsSection3.innerHTML = "<div id = 'roomsResult'></br> <a id = 'panel-title-h2'> Building Rooms: </a> </br> </div>";
                              var forLength = 0;
             for(i = indexOfRoom; i < RoomIDLength; i++) {
                 forLength++
                 if(forLength < 5) {
                 document.getElementById("roomsResult").innerHTML += "<a>" + searchData[i].RoomID + "(" + searchData[i].RoomType + ") - " + searchData[i].BuildingID + "</a> </br>";
                 }
                 else {break;}
                }
                }
             }
             resultsBuilderBuildingIndoor(indexOfRoom, RoomIDLength, searchData)
            function  resultsBuilderBuildingIndoor(indexOfRoom, RoomIDLength, searchData) {
             if(indexOfBuilding != "none" && BuildingIDLength >= 0) {
                resultsSection.innerHTML = "<div id = 'buildingResult'> <a id = 'panel-title-h2'> Campus Buildings: </a> </br></div>";
                              for(i = indexOfBuilding; i < BuildingIDLength; i++) {
                 var tuckingID = searchData[i].BuildingID;
                 document.getElementById("buildingResult").innerHTML += "<a id='names'>" +  searchData[i].BuildingName + "</a>" + " - <a class ='linkSet' id = 'link"+ i+"'>" +searchData[i].BuildingID +"</a></br>";
                
             }
                 
             }
         }
             if(indexOfStaffID != "none") {
                resultsSection2.innerHTML = "<div id = 'staffResult'> <a id = 'panel-title-h2'> </br> Staff Information: </a> </br> </div>";
                             var flag = 0;
            for (i = indexOfStaffID; i < resultsLength; i++) {
                flag++
                if(flag < 4) {
                    document.getElementById('staffResult').innerHTML += "<a id = 'smallTextTopBorder'>" + searchData[i].StaffName + "</a>" + "<a id ='smallRoomDetails'>" + "<br>" +searchData[i].StaffEmail + "<br>" + searchData[i].StaffDepartment + "</br>"+ searchData[i].StaffRoomID +"</a> </br>";

                } else { break; }
                
                }
                             if (indexOfStaffID !="none" && indexOfBuilding == "none") {
                if (searchData[indexOfStaffID].StaffBuildingID == "CW-S") {
                    var setLength = 1;
                    var index = 0;
                    var tempSet = [{BuildingID: "CW-S", BuildingName: "Cornwallis South"}];
                    resultsBuilderBuildingIndoor(index, setLength, tempSet);
                    if (indexOfRoom == "none") {
                        var newTempSet = [{RoomID: "S104", RoomType: "Office", BuildingID: "CW-S"}];
                        resultsBuilderIndoorRoom(index, setLength, newTempSet);
                    }
                    
                }

            }
                 
                 
                 
             }
         }    
     }
          
     function linkHandler(id, obj) {
         console.log("link!");
         return function() {
             buildingPopup(id, obj)
         };
     }
     
     
             if ($('#sidebar').hasClass('open')) {
     
    } else {
        document.getElementById('search-result').click();
    }
    
     
     
        var res = document.getElementById("search results");
        $(res).slideDown();
     

     
    
    $(searchDiv).animate({opacity: "1"}, 100);
    $("#staffResult").animate({opacity: "1"}, 100);
    // $("#staffR").animate({opacity: "1"}, 100);
         function focusIndoorSvgElement(currentItem) {
        
        var roomIDs = getRoomIDs();
        //pass object
        currentID = currentItem.id;
        
        for(i = 0; i < roomIDs.length; i++) {
            if (currentID != roomIDs[i]) {
                svgDoc.getElementById(roomIDs[i]).style.removeProperty('fill'); 
                svgDoc.getElementById(roomIDs[i]).style.removeProperty('stroke'); 
            }
        }
        
         currentItem.style.fill = "#ffd461";
         currentItem.style.stroke = "#695000";
        getRoomData(currentID);
        
    }
     
 }
    function focusSvgElement(currentItem) {
        
    var a = document.getElementById('stage');
    var svgDoc = a.contentDocument;
    var svgItem = svgDoc.getElementById("Buildings");
    var b = svgItem.getElementsByTagName("path");
    var rectID = new Array();
    for(i=0; i < b.length; i++) {
        //pushing all rect elements within svgItem into an array for search functionality
        rectID.push(b[i].id);
    }
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



//--------------------------------------------------------------------------------------------------------------//    
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
    //finds map name from the filename of the loaded map in 'stage' BUT INCLUDES LONGNAMES
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


function roomPopup(currentID, roomInfo) { //-----------------------------------------------
    document.getElementById("itemPicture").innerHTML = "";
    var gotRoom = true;
    var gotStaff = true;
    var staffLength;
    console.log(roomInfo);
    
    document.getElementById("itemTitle").style.opacity = "0";
    document.getElementById("itemInfo").style.opacity = "0";
    document.getElementById("itemPicture").style.opacity = "0";
    //document.getElementById("itemIMG").style.opacity = "0";
    document.getElementById("itemStaffInfo").style.opacity = "0";
    document.getElementById("itemLinks").style.opacity = "0";
    document.getElementById("itemRooms").style.opacity = "0"
    

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
            

        if ($('#sidebar').hasClass('open')) {
     
    } else {
        document.getElementById('search-result').click();
    }
    
    $("#itemTitle").animate({opacity: "1"}, 100);
    $("#itemInfo").animate({opacity: "1"}, 100);
    $("#itemPicture").animate({opacity: "1"}, 100);
    $("#itemIMG").animate({opacity: "1"}, 100);
    $("#itemStaffInfo").animate({opacity: "1"}, 100);
    $("#itemLinks").animate({opacity: "1"}, 100);
    $("#itemRooms").animate({opacity: "1"}, 100);
    
    

}//--------------------------------------------------------------------------------------------



  
function buildingPopup(id) {
    var buildingData = [] //JSON Data
        $.ajax({
        type: "POST",
        url: "../Website/inc/php/getBuildingData.php",
        data: {id: id}, //send roomID to script
        success: function(response) {
            
            buildingData = JSON.parse(response); //parse as JSON object
            mainPopup(id, buildingData); //pass room and JSON object to RoomPopup function
            }
        });
    
    function mainPopup(currentID, buildingData) {
    
    console.log(buildingData);
    document.getElementById("itemTitle").style.opacity = "0";
    document.getElementById("itemInfo").style.opacity = "0";
    document.getElementById("itemPicture").style.opacity = "0";
    document.getElementById("itemIMG").style.opacity = "0";
    document.getElementById("itemStaffInfo").style.opacity = "0";
    document.getElementById("itemLinks").style.opacity = "0";
    document.getElementById("itemRooms").style.opacity = "0";
    
    
    
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
    document.getElementById('itemStaffInfo').innerHTML = " <a id = 'panel-title-h2'>" + "Head Of School: " + "</br> </a>" + "<a>" + thisBuilding.StaffName + "</br>" + thisBuilding.StaffDescription + "</br>" + thisBuilding.StaffRoomID  + "</br>" + "</a> </br>";
    }
    //Interior Maps links
    var mapLink = "";
    for(i=0; i < thisBuilding.FloorCount; i++) { //generate links to inteior maps based on floorcount of building
            if (i == 0) { long = " Ground Floor"; short = "GF"};
            if (i == 1) { long = " First Floor"; short = "FF"};
            if (i == 2) { long = " Second Floor"; short = "SF" };
            if (i == 3) { long = " Third Floor"; short = "TF" };
            if (i == 4) { long = " Fourth Floor"; short = "4F" };
        mapLink +=  '<a id = linkgen onclick=location.replace("/Kent-Maps/Website/index.php?buildingID=' + thisBuilding.BuildingID + "-" + short + ".svg" + '")>' + thisBuilding.BuildingName + long + '</a> </br>';
    }
    document.getElementById("itemLinks").innerHTML = "<a id = 'panel-title'> Interior Map Links </a> </br>" + mapLink;
    
    //Room Types availiable
    var lecRooms = "<a> None </a> </br>";
    var CompRooms = "<a> None </a> </br>";
    var SemRooms = "<a> None </a> </br>";
    
    if(typeof buildingData[1] != "undefined" || typeof buildingData[1] != null){
       // console.log(buildingData);
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
    
    if ($('#sidebar').hasClass('open')) {
     
    } else {
        document.getElementById('search-result').click();
    }
    
    $("#itemTitle").animate({opacity: "1"}, 100);
    $("#itemInfo").animate({opacity: "1"}, 100);
    $("#itemPicture").animate({opacity: "1"}, 100);
    $("#itemIMG").animate({opacity: "1"}, 100);
    $("#itemStaffInfo").animate({opacity: "1"}, 100);
    $("#itemLinks").animate({opacity: "1"}, 100);
    $("#itemRooms").animate({opacity: "1"}, 100);
        
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