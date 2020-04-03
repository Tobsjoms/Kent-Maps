<?php
	session_start();
	include 'inc/php/timetable-funcs.php';
	include('inc/php/db.php');

    
	$loggedIn = isset($_SESSION['email']);

	if ($loggedIn){
		// Get timetable url and colour scheme
		$url = $_SESSION['timetable_url'];
		$col = $_SESSION['colour_scheme'];
		// Retrieve timetable information if it has been set
		if (isset($_SESSION['timetable_url']) && $_SESSION['timetable_url'] != NULL){
			// Timetable source
			$file = "http://" . $_SESSION['timetable_url'];
			$iCal = new iCal($file);
			// Dates
			$day = date('w');
			$week_start = date('Y-m-d', strtotime('-'.$day.' days'));
			$week_end = date('Y-m-d', strtotime('+'.(6-$day).' days'));
			// Get
			$events = $iCal->eventsByDateBetween($week_start, $week_end);
		}
	}

	// For use with timetables, deadlines
	function colorFromString($string)
	{
		$colors = ['#e67e22', '#2ecc71', '#3498db', '#1abc9c', '#e74c3c', '#9b59b6', '#34495e'];
		$hash = substr(sha1($string), 0, 10);
		return $colors[hexdec($hash) % count($colors)];
	}

	// Properties to inject into body element
	$bodyProperties = "";
	if (isset($_SESSION['id'])) $bodyProperties .= 'class="logged-in"';
	if (isset($_SESSION['colour_scheme'])) $bodyProperties .= ' id="' . $_SESSION['colour_scheme'] . '"';
    

    $svgLib = "svg-pan-zoom.js";
    $core = "coreScript.js";
    // If we have a building parameter in the url, 
	if (isset($_GET["buildingID"])) {
		$building = $_GET["buildingID"];
	}
	else{
		// Default map (main)
		$loadscript = "<script src='inc/js/mainMap.js'></script>";
        
	}

	$mapFile = "Campus Map Entire.svg";
	$mapScript = "mainMap.js";
	$showParkingButton = true;
    $pathfinder = "none.js";

    $pathfinderMenu = "";
    


    if (isset($_GET["buildingID"])) {

    	$mapFile = $_GET["buildingID"];
    	$mapScript = "indoorMap.js";
    	$showParkingButton = false;

                if ($mapFile == "CW-Oct-GF.svg") {
            //for PATHFINDER
            $pathfinder = "pathfinder.js";
            $pathfinderMenu = "  <div id = 'pathfinder'>  <h1>Path Finder Demo</h1>
    
    <div id = 'startPoint'>
    <label>Choose starting point:</label>
    <select id='options' onchange='highlight()' '>
        <option>E1</option>
        <option>E2</option>
        <option>E3</option>
        <option>Stairs</option>
        <option>Lift</option>
        <option>SE01</option>
        <option>SE03</option>
        <option>SE05</option>
        <option>SE06</option>
        <option>SE07</option>
        <option>SE08</option>
        <option>SE09</option>
        <option>SE11</option>
        <option>SE12</option>
        <option>SE13</option>
        <option>SE14</option>
        <option>SE15</option>
        <option>SE16</option>
        <option>SE17</option>
        <option>SE18</option>
        <option>SE19</option>
        <option>SE20</option>
        <option>SE21</option>
        <option>SE22</option>
        <option>SE23</option>
        <option>SE24</option>
    </select> </div> </br>
    <div id = 'searchSection'>
    <label id = 'searchLabel'>Search:</label> <input type='text' id='room' required>
    <button onclick='loadData();' class = 'searchButton'>Search</button>  
    <label>Shortest route:</label><input type='checkbox' id='shortest'> </div>
    <a id = 'demo'></a>
    </div>";        
                    
        }
    } else {
        
        $pathfinder = "pathfinder.js";
            $pathfinderMenu = "  <div id = 'pathfinder'>  <h1>Path Finder Demo</h1>
    
    <div id = 'startPoint'>
    <label>Choose starting point:</label>
    <select id='options' onchange='highlight()' '>
        <option value='CH-MD'>Chipperfield (CH) Main Entrance</option>
			<option value='SIB-MD'>Sibson Main Entrance</option>
			<option value='KEN-MD'>Kennedy (KEN) Main Entrance</option>
			<option value='JEN-MD'>Jennison (J) Main Entrance</option>
			<option value='GYM-MD'>Sports Centre</option>
			<option value='I-MD'>Ingram (I) Main Entrance</option>
			<option value='S-MD'>Stacey (S) Main Entrance</option>
			<option value='SHOPSD'>COOP/CAFE/FOOD</option>
			<option value='E-MD'>Eliot College</option>
			<option value='EE-MD'>Eliot Extension</option>
			<option value='LIB-MD'>Library Main Entrance</option>
			<option value='G-MD'>Grimond Main Entrance</option>
			<option value='LIB-RED'>Library Road Entrance</option>
			<option value='GULB-MD'>The Gulbenkian Main Entrance</option>
			<option value='CW-MD'>Cornwallis West Main Entrance</option>
			<option value='CS-MD'>Cornwallis South Main Entrance</option>
			<option value='R-MD'>Rutherford Main Entrance</option>
			<option value='RE-MD'>Rutherford Extension (RE) Main Entrance</option>
			<option value='REG-MD'>The Registry Main Entrance</option>
			<option value='CSE-OCT-MD'>Cornwallis South East/Octagan</option>
			<option value='CC-MD'>Cornwallis Central Main Entrance </option>
			<option value='CE-MD'>Cornwallis East Main Entrance</option>
			<option value='D-MD'>Darwin Main Entrance</option>
    </select> </div> </br>
    <div id = 'searchSection'>
    <label id = 'searchLabel'>Search:</label> <input type='text' id='room' required>
    <button onclick='loadData();' class = 'searchButton'>Search</button>  
    <label>Shortest route:</label><input type='checkbox' id='shortest'> </div>
    <a id = 'demo'></a>
    </div>";
        
    }

	if (isset($_GET["search"])) {
	    $search = $_GET["search"];
		// ??
	}




?>
<HTML>
	<head>
		<title>UKCGURU</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" type="text/css" href="inc/css/style.css">
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		<script src="inc/js/jquery-3.4.1.js"></script>
		<?= "<script src='inc/js/$svgLib'></script>" ?>
        <?= "<script src='inc/js/$mapScript'></script>" ?>
        <?= "<script src='inc/js/$core'></script>" ?>
		<script src="inc/js/toggle-tab-funcs.js"></script>
        <?= "<script src='inc/js/$pathfinder'></script>" ?>
	</head>

	<body <?= $bodyProperties ?> 
          
          >
        <div id = "overlay">
        <img  id = "loadimg" src= "inc/img/loading.gif" alt="Loading">
        </div>
		<div id="map">
			<?php echo "<object id='stage' data='floorplans/$mapFile' type='image/svg+xml'></object>" ?>
        	<div id="zoom-controls">
        		<button id = "zoomIn">+</button>
        		<button id = "zoomOut">-</button>
        	</div>
        </div>
		<div id="topbar">

			<div id="logo">
				<b>UKC</b>GURU
			</div>

			<div id="search">
				<input type="text" spellcheck="false" id="sInput">
				<a id = "sButton"><i class="material-icons">search</i></a>
			</div>
<?php 
	if (!$loggedIn){ 
?>
				<div id="user-panel">
					<a href="login.php">Log in</a> or <a href="signup.php">sign up</a> to use more features!
				</div>
<?php 
	}
?>
		</div>
<?php 
	if ($loggedIn){ 
?>
		<div id="sidebar">
			<div class="navigation" id="nav-tabs">
				<span onClick="changeTab(this)" target="sidebar-timetable">
					<i class="material-icons">date_range</i>
				</span>
				<span onClick="changeTab(this)" target="sidebar-deadlines">
					<i class="material-icons">alarm</i><span id="deadline-number">1</span>
				</span>
				<span id="settings-button" onClick="changeTab(this)" target="sidebar-user">
					<i class="material-icons">person</i>
				</span>
                <span id = "search-result" onClick="changeTab(this)"
                      target = "sidebar-search">
                    <i class = "material-icons">search</i>
                </span>
			</div>
			<div class="tab-content" id="sidebar-timetable">
				<?php
					if (!isset($events)){
						// Invalid url
						echo"<div class='day'><div class='heading'>Timetable</div></span><div id='no-events'>You either haven't entered a timetable URL, or the current one isn't working.</br></br>Update your <a href='#' onclick='settingsTab();return false;'>settings</a>.</div></div>";
					}
					else{
						if (count($events) == 0){
							echo"<div class='day'><div class='heading'>Nothing!</div><div id='no-events'>You have no events this week.</br></br>If you think this is an error, check your URL <a href='#' onclick='settingsTab();return false;'>setting</a> is valid.</div></div>";
						}
						else{
							foreach ($events as $date => $events)
							{
								$day = DateTime::createFromFormat('Y-m-d', $date)->format('l');
								echo "<div class='day'><div class='subheading'>$day</div>";
									foreach ($events as $event)
									{
										$title = $event->title();
										$start = date('H:i', $event->startTime());
										$end = date('H:i', $event->endTime());
										$location = $event->location();
										$generatedColour = colorFromString($title);

										echo "
											<div class='card' style='border-color: $generatedColour;'>
												<div class='details'>$title</div>
												<div class='start-end-location'><a href='https://www.kent.ac.uk/timetabling/rooms/room.html?room=$location'>$location</a> | $start - $end</div>
											</div>
										";
									}
								echo "</div>";
							}
						}
					}
				?>
			</div>

			<div class="tab-content" id="sidebar-deadlines">
				<?php include('inc/php/views/get-deadlines.php'); ?>

				<form action="inc/php/handlers/handle-add-deadline.php" method="post">
				    <input name="title" type="text" autocapitalize="off" spellcheck="true" required>   
				    <input name="link" type="text" autocapitalize="off" spellcheck="true" required>
				    <input name="date-time" type="datetime-local" required>

					<input class="button" id="submit-button" type="submit" name="submit" value="Save"/>
				</form>

			</div>

			<div class="tab-content" id="sidebar-user">
				<div class="heading">Account</div>
				<span><?= $_SESSION['email'] ?> (<a href="logout.php">log out</a>)</span>
				<hr>
				<div class="heading">Settings</div>
				<form action="inc/php/handlers/handle-settings-attempt.php" method="post">
				    <div class="group">      
				        <input id="timetable-url-input" name="timetable-url" type="text" autocapitalize="off" spellcheck="false" <?php if (isset($url)) echo 'value="' . $url . '"'; ?>>
				        <span class="highlight"></span>
				        <span class="bar"></span>
				        <label for="timetable-url-input">Timetable URL</label>
				    </div>

				    <div class="group">      
						<select id="colour-scheme-input" name="colour-scheme">
						  <option <?php if (isset($col) && $col == "default") echo "selected" ?> value="default">Default</option>
						  <option <?php if (isset($col) && $col == "darkmode") echo "selected" ?> value="darkmode">Dark Mode</option>
						  <option <?php if (isset($col) && $col == "colourblindmode") echo "selected" ?> value="colourblindmode">Colour Blind Mode</option>
						</select>
				    </div>

					<input class="button enabled" id="submit-button-settings" type="submit" name="submit" value="Save Changes"/>
				</form>
			</div>

            <div class = "tab-content" id="sidebar-search">
            <?php echo $pathfinderMenu ?>
                <div id = "search results"></div>
                <h1> Building/Room Information</h1>
                <div id = "itemTitle"><a>The University Of Kent</a></div>
                <div id = "itemInfo">
                <a>Welcome to the University Of Kent's Campus Maps! </a> </div>
                <div id = "itemPicture">
                    <br>
                    <img id = "itemIMG" src="inc/img/buildings/Placeholder.jpg">
                </div>
                <div id = "itemStaffInfo"> <br>
                    You can view building or room information in this sidebar by clicking on or searching for a building
                </div>
                <div id = "itemLinks"></div>
                <div id = "itemRooms"></div>
            </div>
        </div>
<?php 
	}
?>
	</body>
</HTML>