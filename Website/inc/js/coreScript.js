

//includes scripts that go across entire site, none page specific such as search funtions.
//consider edge case for getting timetable html back
//potentially can be done by clicking anywhere BUT a room returns specific ID and check for that ID returned If SO then don't change or change back to the timetable UI!
//need more UI Divs to hook onto for each bit of data eg staffid, name, department


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
        thisBuilding = {BuildingID: "None", BuildingName: currentID, BuildingDescription: "None", BuildingFloorID: "0", FloorCount: "0"}
    }
    if(thisBuilding.StaffDepartment == null) {
        console.log("Null Data");
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
    for(i=0; i < thisBuilding.FloorCount; i++) {
            if (i == 0) { long = " Ground Floor"; short = "GF"};
            if (i == 1) { long = " First Floor"; short = "FF"};
            if (i == 2) { long = " Second Floor"; short = "SF" };
        mapLink +=  '<a id = linkgen onclick=window.open("/Kent-Maps/Website/index.php?buildingID=' + thisBuilding.BuildingID + "-" + short + ".svg" + '")>' + thisBuilding.BuildingName + long + '</a> </br>';
    }
    document.getElementById("itemLinks").innerHTML = "<a id = 'panel-title'> Interior Map Links </a> </br>" + mapLink;
    console.log(mapLink);
}



function buildingPopupOld(currentID, buildingData) {

    //need more UI Divs to hook onto for each bit of data eg staffid, name, department
    var thisBuilding = buildingData[0];

        //check building has data - if not do this
    if (typeof thisBuilding == 'undefined') {
        console.log("data not found");
        thisBuilding = {BuildingID: "None", BuildingName: currentID, BuildingDescription: "None", BuildingFloorID: "0", FloorCount: "0"}
        }

        console.log("data found!");
        var name = thisBuilding.BuildingName;
        var id = thisBuilding.BuildingID;
        var desc = thisBuilding.BuildingDescription;
        var floorCount = thisBuilding.FloorCount; //NO OFF-BY-ONE errors because of the datatype from a database ...JSON
        $("#timetable").css({"font-size": "26px"});
        str = '<ul>';
        title = '<p id = test> Building Name:' + name; + '</p>' + '</br>';
        knownAs = '<p> Buiding Info: </p>' + desc + '</br>';
        p = '<p>Avaliable Floors: </p>';
        var x = "";
        for(i=0; i < floorCount; i++) {
            if (i == 0) { long = " Ground Floor"; short = "GF"};
            if (i == 1) { long = " First Floor"; short = "FF"};
            if (i == 2) { long = " Second Floor"; short = "SF" };
            str += '<li id = linkgen onclick=window.open("/Kent-Maps/Website/index.php?buildingID=' + id + "-" + short + ".svg" + '")>' + name + long + '</li>';
        }
            str += '</ul>';

        //build into DOM
        document.getElementById('timetable').innerHTML = title + knownAs + p + str;
        //enable links

    //maybe run consider adding more info such as lecture rooms, etc etc

}
/**
link1 = document.getElementById("linkElem0");
$("#timetable").on("click", "#linkElem0", function(event){
    window.location.replace("127.0.0.1/Kent-Maps/site/temp.php?buildingID=" + link1);
});
*/
