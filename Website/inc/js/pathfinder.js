    
var splitcheck;



$(window).on('load', (function(){ 

    var a = document.getElementById('stage');

    var svgDoc = a.contentDocument;
        
        var mapString = a.data;
        var splitcheck = mapString.includes("Campus");
        if (splitcheck) {
            var allSVG= svgDoc.getElementById("svg16");
        } else {
            var allSVG= svgDoc.getElementById("Map");
        }
        
 
       // console.log(allSVG);
    var pathways = allSVG.getElementById("Pathways");
    //path objects
       // console.log(pathways);
    var pathwayObjects = pathways.getElementsByTagName('path');

   //col()
        
     highlight();
        
        function col() {
        for (i = 0; i < pathwayObjects.length; i++) {
                var temp = pathwayObjects[i];
               temp.style.fill = "none";

            }

        }
        

            
    
   // console.log(pathways);

    //PATHFINDING
    //Variables
        
     

    }));

function getBuildingID() {

        //get mapName from URL file (buildingID="X-X-X".svg)
    var URL = window.location.href;
    var mapName = URL.substring(
    URL.lastIndexOf("buildingID=") +11, //THIS IS DODGY BUT GENIUS
        URL.lastIndexOf(".svg")
        );
     
    
    var notMain = URL.includes("buildingID=");
     if (!notMain){
         mapName = "mainMap";
     }
        
        return mapName;
     
    }


var nodeObjects = [];

getBuildingID();

    class Pathfinder {
        // Nodes in queue waiting to be visited
        queue;

        // Nodes already visited
        visitedNodes;

        paths;

        getPath(node) {
            for(var i = 0; i < nodeObjects.length; i++) {
                if (nodeObjects[i].getCurrent() == node) {
                    return i;
                } 
            }
            return -1;
        }

        findPathToGoal(start, goal) {
            this.paths = new Array();
            this.queue = new Array();
            this.visitedNodes = new Array();

            // Add start node to path
            let currentNode = nodeObjects[this.getPath(start)];

            // Add start node (current node) to visited nodes
            this.visitedNodes.push(currentNode.getCurrent());

            // Add valid directions to queue
            this.addToQueue(currentNode);

            // Case:
            // If two directions (i.e loops) 
            // Add currentNode to path all the way back to previous node of next node in queue
            // E.g. P8->P10->P27->P26->P25->P24: IF STATEMENT USING containsNode()
            // P24->P25->P26->P27->P10->P8->P7

            // Explores all paths
            while (currentNode.containsNode(goal) == false) {
                currentNode = nodeObjects[this.getPath(this.queue[0])];
                this.visitedNodes.push(currentNode.getCurrent());
                this.queue.shift(); 

                // Stop looping if currentNode contains goal after updating from queue
                if (currentNode.containsNode(goal) == true) {
                    this.createPath(start, currentNode, goal);
                    break;
                }
                this.addToQueue(currentNode);
            }

            this.visitedNodes.pop();
            currentNode.setPrevious("null");

            while (this.queue.length != 0) {
                currentNode = nodeObjects[this.getPath(this.queue[0])];
                this.visitedNodes.push(currentNode.getCurrent());
                this.queue.shift(); 

                // Stop looping if currentNode contains goal after updating from queue
                if (currentNode.containsNode(goal) == true) {
                    this.createPath(start, currentNode, goal);
                    break;
                }

                this.addToQueue(currentNode);  
            }
            // Plot path to goal
            pathPlot(this.paths, goal);
        }

        addToQueue(currentNode) {
            // Checks:
            //  - != null || ends with 'D'
            //  - not already visited
            //  - not in queue 
            var index = 0;
            let nodeQueue = []
            nodeQueue = Array.from(this.queue);
            this.queue = [];
            if (currentNode.getNorth().startsWith("P") == true) {
                if (this.visitedNodes.indexOf(currentNode.getNorth()) == -1) {
                    const nextNode = nodeObjects[this.getPath(currentNode.getNorth())];
                    // Only set previous if previous is null (hasn't been set)
                    if (nextNode.getPrevious() == "null") {
                        nextNode.setPrevious(currentNode.getCurrent());
                    }
                    this.queue.splice(index, 0, nextNode.getCurrent());
                    ++index;
                }
            } 

            if (currentNode.getSouth().startsWith("P") == true) {
                if (this.visitedNodes.indexOf(currentNode.getSouth()) == -1) {
                    const nextNode = nodeObjects[this.getPath(currentNode.getSouth())];
                    // Only set previous if previous is null (hasn't been set)
                    if (nextNode.getPrevious() == "null") {
                        nextNode.setPrevious(currentNode.getCurrent());
                    }
                    this.queue.splice(index, 0, nextNode.getCurrent());
                    ++index;
                }
            }

            if (currentNode.getEast().startsWith("P") == true) {
                if (this.visitedNodes.indexOf(currentNode.getEast()) == -1) { 
                    const nextNode = nodeObjects[this.getPath(currentNode.getEast())];
                    // Only set previous if previous is null (hasn't been set)
                    if (nextNode.getPrevious() == "null") {
                        nextNode.setPrevious(currentNode.getCurrent());
                    }
                    this.queue.splice(index, 0, nextNode.getCurrent());
                    ++index;
                }
            } 

            if (currentNode.getWest().startsWith("P") == true) {
                if (this.visitedNodes.indexOf(currentNode.getWest()) == -1) {
                    const nextNode = nodeObjects[this.getPath(currentNode.getWest())];
                    // Only set previous if previous is null (hasn't been set)
                    if (nextNode.getPrevious() == "null") {
                        nextNode.setPrevious(currentNode.getCurrent());
                    }
                    this.queue.splice(index, 0, nextNode.getCurrent());
                    ++index;
                }
            }
            this.queue = this.queue.concat(nodeQueue);
        }


        // Creates path from start to finish
        createPath(start, current, goalNode) {
            let path = [];
            let currentNode = current;

            path.push(currentNode.getCurrent());
            while(currentNode.getPrevious() != start) {
                var index = this.visitedNodes.indexOf(currentNode.getPrevious());
                currentNode = nodeObjects[this.getPath(this.visitedNodes[index])];
                path.splice(0, 0, currentNode.getCurrent());
            }
            path.splice(0,0, start);
            path.push(goalNode);

            this.paths.push(path);
        }

    }
        

    class PathNode {
        constructor(node) {
            this.currentNode = node.current;
            this.northNode = node.north;
            this.southNode = node.south;
            this.eastNode = node.east;
            this.westNode = node.west;
            this.previous = "null";
        }

        getCurrent() {return this.currentNode;}
        getNorth() {return this.northNode;}
        getSouth() {return this.southNode;}
        getEast() {return this.eastNode;}
        getWest() {return this.westNode;}
        getPrevious() {return this.previous;}

        setPrevious(node) {this.previous = node;}

        containsNode(node) {
            if (this.currentNode == node) {
                return true;
            } else if (this.northNode == node) {
                return true;
            } else if (this.southNode == node) {
                return true;
            } else if (this.eastNode == node) {
                return true;
            } else if (this.westNode == node) {
                return true;
            }
            return false;
        }
    }




    function loadData() {
        var a = document.getElementById('stage');
        var svgDoc = a.contentDocument;
        var mapString = a.data;
        var gotMainMap = mapString.includes("Campus");
        if (gotMainMap) {
            var allSVG= svgDoc.getElementById("svg16");
        } else {
            var allSVG= svgDoc.getElementById("Map");
        }
        var type = getBuildingID();
        console.log("LOADING for: " + type);
            $.ajax({
                type: "GET",
                url: "inc/JSON/" + type + ".json",
                dataType: 'json',
                error: function(xhr, thrownError) {
                  console.log(xhr.status);
                    console.log(thrownError);
                },
                success: function(data) {
                    console.log("success!");
                    for(var j = 0; j < data.pathNodes.length; j++) {
                        node = new PathNode(data.pathNodes[j]);
                        nodeObjects[j] = node;
                    }

                    // Starting room
                    var start = document.getElementById("options").value;
                    start = start.toUpperCase();
                    
                    if(gotMainMap) {
                start = start;
            } else {

                    if ((start == "E1") || (start == "E2") || (start == "E3")) {
                        start = start;
                    } else if(start == "SE13") {
                        start = "SE14D";
                    } else {
                        start = start + "D";
                    }
            }

                    // Goal room    
                    var goal = document.getElementById("room").value;
                    goal = goal.toUpperCase(); 
                    
                    if (gotMainMap) {
                        goal = goal;
                    } 
                    
                    else {
                        if ((goal == "E1") || (goal == "E2") || (goal == "E3")) {
                        goal = goal;
                        } else if (goal == "SE13") {
                        goal = "SE14D";
                        } else {
                        goal = goal + "D";
                        } 
                    }

                    findPath(start, goal);

                    function searchFile(room) {
                        for(var i = 0; i < nodeObjects.length; i++) {
                            if(nodeObjects[i].getCurrent() == room) {
                                return true;
                            }
                        }
                        return false;
                    }

                    function findPath(start, goal) {
                        console.log(goal);
                        if ((start.length != 0) && (goal.length != 0)) {
                            if ((searchFile(start) != false) || searchFile(goal != false)) {
                                path = new Pathfinder();
                                path.findPathToGoal(start, goal);
                            } else {
                                document.getElementById("demo").innerHTML = "Invalid room. Please check room names.";
                            }
                        } else {
                            document.getElementById("demo").innerHTML = "Please enter a valid room.";
                        }
                    }
                }
            })
        }
        
        
    
        function pathPlot(path, goal) {
            var a = document.getElementById('stage');

    var svgDoc = a.contentDocument;
        
        var mapString = a.data;
        var splitcheck = mapString.includes("Campus");
        console.log(splitcheck);
        if (splitcheck) {
            var allSVG= svgDoc.getElementById("svg16");
        } else {
            var allSVG= svgDoc.getElementById("Map");
        }
        
 
       // console.log(allSVG);
    var pathways = allSVG.getElementById("Pathways");
    //path objects
       // console.log(pathways);
    var pathwayObjects = pathways.getElementsByTagName('path');
         //   console.log(pathwayObjects);

            let shortest = document.getElementById("shortest").checked;

            // Find shortest path by length of node arrays inside path
            let index = path[0];
            for(var i = 0; i < path.length; i++) {
                if (path[i].length < index.length) {
                    index = path[i];
                }
            }
        for (i = 0; i < pathwayObjects.length; i++) {
                var temp = pathwayObjects[i];
               temp.style.fill = "none";

            }
                    if (shortest == true) {
                        for (var j = 0; j < index.length; j++) {
                            var currentNode = index[j];
                           // d3.select("#" + currentNode).style("fill", "red");

                        }
                    } else {
                        for (var i = 0; i < path.length; i++) {
                            for (var j = 0; j < path[i].length; j++) {
                                var currentNode = path[i][j];
                             var temp = allSVG.getElementById(currentNode);
                            var jqTemp = allSVG.getElementById(currentNode);
                             if (/D/i.test(currentNode)) {
                                 temp.style.fill = "#2f2f2f";
                                    temp.style.stroke = "#black";
                        $(jqTemp).animate({opacity: '0.5'}, "slow" );
                        $(jqTemp).animate({opacity: '1'}, "slow" );
                         $(jqTemp).animate({opacity: '0.5'}, "slow" );
                         $(jqTemp).animate({opacity: '1'}, "slow" );
                        
                    } else {
                        temp.style.fill = "#ff4400";
                    }
                            }       
                        }
                    }
			
        }
        
        

        function highlight() {
            var a = document.getElementById('stage');

    var svgDoc = a.contentDocument;
        
        var mapString = a.data;
        var gotMainMap = mapString.includes("Campus");
    
        if (gotMainMap) {
            var allSVG= svgDoc.getElementById("svg16");
        } else {
            var allSVG= svgDoc.getElementById("Map");
        }
        
 
      //  console.log(allSVG);
    var pathways = allSVG.getElementById("Pathways");
    //path objects
       // console.log(pathways);
    var pathwayObjects = pathways.getElementsByTagName('path');


                   // console.log("highlight called");
            // Starting room
            var start = document.getElementById("options").value;
            start = start.toUpperCase();
            
            if(gotMainMap) {
                start = start;
            } else {

                if ((start == "E1") || (start == "E2") || (start == "E3")) {
                start = start;
                } else if(start == "SE13") {
                start = "SE14D";
                }   else {
                start = start + "D";
                }
            }
            //console.log(pathwayObjects);
           // console.log(start);
                    for (i = 0; i < pathwayObjects.length; i++) {
            
                        
                var temp = pathwayObjects[i];
               temp.style.fill = "none";

            }
                  //  d3.select("#" + start).style("fill", "red");
                    var temp2 = allSVG.getElementById(start);

                    if (/D/i.test(start)) {
                        temp2.style.fill = "black";
                    } else {
                        temp2.style.fill = "#ff4400";
                    }
                    
			
        }





