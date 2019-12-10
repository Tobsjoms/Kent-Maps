$( document ).ready(function() {

    window.addEventListener("load", function() {
        var svgObject = document.getElementById('svg-object').contentDocument;
        var svg = svgObject.getElementById('maproot');
        var greenbox = svgObject.getElementById("Green1");
        console.log(svg);
        console.log(greenbox);
        
        var obs = Array.from(svgObject.querySelectorAll("layer2"));
        console.log(obs);
        
 //<![CDATA[     
        greenbox.onmouseover = (function() {
            greenbox.style.fill = "black";
            
        });

//]]



    });





});