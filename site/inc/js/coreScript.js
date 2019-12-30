//includes scripts that go across entire site, none page specific such as search funtions.


//search display function
function displayResult(str) {
    console.log(str);
    $.ajax({
        type: "POST",
        url: "../php/liveSearch.php",
        data: {"searchFunc": str},
        success: function(response) {alert(response);}
    });
}


