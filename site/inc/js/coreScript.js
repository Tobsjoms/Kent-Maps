    //includes scripts that go across entire site, none page specific such as search funtions.
    //consider edge case for getting timetable html back
    //potentially can be done by clicking anywhere BUT a room returns specific ID and check for that ID returned If SO then don't change or change back to the timetable UI!
    //need more UI Divs to hook onto for each bit of data eg staffid, name, department
function roomPopup(currentID, staffData) {
    //check room has data
    console.log(currentID);
    var thisRoom = staffData[0];
    if (typeof thisRoom == 'undefined') {
        thisRoom = ["Room Data Not Availiable "];
        alert(thisRoom[0] + "for " + currentID);
    }
    //potentially refactor to display data error in sidebar
    
    $("#timetable").html("Room:"  + currentID);
    $("#timetable").css({"font-size": "26px"});

    var dataLength = staffData.length;
    str = '<ul>';
    p = '<p>Staff In: </p>' + currentID;
    for(i=0; i < dataLength; i++) {
            index = staffData[i];
            str += '<li>' + index.Name + '</li>';
            console.log(index.Name);
        }
    str += '</ul>';
    document.getElementById('timetable').innerHTML = p + str;

    }    

function buildingPopup(currentID, buildingData) {
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
            str += '<li id = linkgen onclick=window.open("/Kent-Maps/site/temp.php?buildingID=' + id + "-" + short + ".svg" + '")>' + name + long + '</li>';
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
