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

		function dateDifference($d1, $differenceFormat = '%d days %h hours' )
		{
		    $d1 = date_create($d1);
		    $d2 = new DateTime("now", new DateTimeZone('Europe/London') );
		    $interval = date_diff($d1, $d2);
		    return $interval->format($differenceFormat);
		}

		$sql= "SELECT * FROM deadlines WHERE user_id = :user_id ORDER BY deadline_datetime ASC";
		$stmt = $conn->prepare($sql);
		$stmt->bindParam(':user_id', $_SESSION['id'], PDO::PARAM_STR);
		$stmt->execute();
		$deadlineRows = $stmt->fetchAll();
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
            $pathfinderMenu = "  <div id = 'pathfinder'>  <h1>PathFinder</h1>
    
		<label>Start:</label><select id='startOptions' onchange='highlight();'>
			<option value='LIBD'>Library Main Entrance</option>
			<option value='CHD'>Chipperfield (CH) Main Entrance</option>
			<option value='SIBD'>Sibson Main Entrance</option>
			<option value='KEND'>Kennedy (KEN) Main Entrance</option>
			<option value='JEND'>Jennison (J) Main Entrance</option>
			<option value='GYMD'>Sports Centre</option>
			<option value='ID'>Ingram (I) Main Entrance</option>
			<option value='SD'>Stacey (S) Main Entrance</option>
			<option value='SHOPSD'>COOP/CAFE/FOOD</option>
			<option value='ED'>Eliot College</option>
			<option value='EED'>Eliot Extension</option>
			<option value='GD'>Grimond Main Entrance</option>
			<option value='LIB-RED'>Library Road Entrance</option>
			<option value='GULBD'>The Gulbenkian Main Entrance</option>
			<option value='CWD'>Cornwallis West Main Entrance</option>
			<option value='CSD'>Cornwallis South Main Entrance</option>
			<option value='RD'>Rutherford Main Entrance</option>
			<option value='REXD'>Rutherford Extension (RE) Main Entrance</option>
			<option value='REGD'>The Registry Main Entrance</option>
			<option value='CSE-OCTD'>Cornwallis South East/Octagan</option>
			<option value='CCD'>Cornwallis Central Main Entrance </option>
			<option value='CED'>Cornwallis East Main Entrance</option>
			<option value='DARWD'>Darwin Main Entrance</option>
		</select>

		<label>Destination:</label> <select id='destOptions' onchange='highlight();'>
			<option value='LIBD'>Library Main Entrance</option>
			<option value='CHD'>Chipperfield (CH) Main Entrance</option>
			<option value='SIBD'>Sibson Main Entrance</option>
			<option value='KEND'>Kennedy (KEN) Main Entrance</option>
			<option value='JEND'>Jennison (J) Main Entrance</option>
			<option value='GYMD'>Sports Centre</option>
			<option value='ID'>Ingram (I) Main Entrance</option>
			<option value='SD'>Stacey (S) Main Entrance</option>
			<option value='SHOPSD'>COOP/CAFE/FOOD</option>
			<option value='ED'>Eliot College</option>
			<option value='EED'>Eliot Extension</option>
			<option value='GD'>Grimond Main Entrance</option>
			<option value='LIB-RED'>Library Road Entrance</option>
			<option value='GULBD'>The Gulbenkian Main Entrance</option>
			<option value='CWD'>Cornwallis West Main Entrance</option>
			<option value='CSD'>Cornwallis South Main Entrance</option>
			<option value='RD'>Rutherford Main Entrance</option>
			<option value='REXD'>Rutherford Extension (RE) Main Entrance</option>
			<option value='REGD'>The Registry Main Entrance</option>
			<option value='CSE-OCTD'>Cornwallis South East/Octagan</option>
			<option value='CCD'>Cornwallis Central Main Entrance </option>
			<option value='CED'>Cornwallis East Main Entrance</option>
			<option value='DARWD'>Darwin Main Entrance</option>
		</select>

		<button onclick='loadData();'>Search</button>
		
		<p id='demo'></p>
    </div>";
        
    }

	if (isset($_GET["search"])) {
	    $search = $_GET["search"];
		// ??
	}




?>
<HTML>
	<head>
        <link rel="icon" href="inc/img/favicon.ico" type="image/ico">
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
                <button id = "map_centre"> <i class="material-icons">gps_fixed</i></button>
                 <button id = "home"> <i class="material-icons">home</i></button>
               
               
        	</div>
        </div>
		<div id="topbar">

			<div id="logo">
				<b>UKC</b>MAPS
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
					<i class="material-icons">alarm</i>
					<?php
						if (count($deadlineRows) != 0){
							echo "<span id='deadline-number'>" . count($deadlineRows) . "</span>";
						}
					?>
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
				<?php 
					if (count($deadlineRows) == 0){
						echo "<div class='heading'>No deadlines!</div>Add one with the form below.";
					}
					else{
						foreach ($deadlineRows as $row){
							$dateDifferenceDays = dateDifference($row[4], '%a');
							$borderColour = "#2ecc71"; // Green

							if ($dateDifferenceDays < 1){
								$borderColour = "#e74c3c";
							}
							elseif ($dateDifferenceDays <= 7) {
								$borderColour = "#e67e22"; 
							}

							$additionalText = "Due in ";
							$date = new DateTime($row[4]);
							$now = new DateTime("now", new DateTimeZone('Europe/London') );

							if($date < $now) {
							    $additionalText = "Overdue by ";
							    $borderColour = "#000";
							}

							echo "<div class='card' style='border-color:" . $borderColour . "'><a href='" . $row[3] . "'>" . $row[2] . "</a></br><b>" . $additionalText . dateDifference($row[4]) . "</b> <a class='delete-deadline' href='inc/php/handlers/handle-delete-deadline.php?id=" . $row[0] . "'>X</a></div>";
						}
					}
				?>

				<hr>
				<form action="inc/php/handlers/handle-add-deadline.php" method="post">
				    <input name="title" type="text" autocapitalize="off" spellcheck="true" placeholder="Title" required>   
				    <input name="link" type="text" autocapitalize="off" spellcheck="true" placeholder="Relevant URL" required>
				    <input name="date-time" type="datetime-local" required>
					<input class="button" id="submit-button" type="submit" name="submit" value="Add Deadline"/>
				</form>
			</div>

			<div class="tab-content" id="sidebar-user">
				<div class="heading">Account</div>
				<span><?= $_SESSION['email'] ?> (<a href="logout.php">log out</a>)</span></br></br>
				<form action="inc/php/handlers/handle-delete-account.php" method="post" onSubmit="return confirm('Click OK to confirm the deletion of your account.')">
					<input class="button enabled" id="submit-button-delete-account" type="submit" name="submit" value="Delete Account"/>
				</form>
				<hr>
				<div class="heading">Settings</div>
				<form action="inc/php/handlers/handle-settings-attempt.php" method="post">
				    <div class="group">      
				        <input id="timetable-url-input" placeholder="Timetable URL" name="timetable-url" type="text" autocapitalize="off" spellcheck="false" <?php if (isset($url)) echo 'value="' . $url . '"'; ?>>
				    </div>

				    <div class="group">      
						<select id="colour-scheme-input" name="colour-scheme">
						  <option <?php if (isset($col) && $col == "default") echo "selected" ?> value="default">Default Colour Scheme</option>
						  <option <?php if (isset($col) && $col == "darkmode") echo "selected" ?> value="darkmode">Dark Colour Scheme</option>
						  <option <?php if (isset($col) && $col == "colourblindmode") echo "selected" ?> value="colourblindmode">High Contrast Colour Scheme</option>
						</select>
				    </div>

					<input class="button enabled" id="submit-button-settings" type="submit" name="submit" value="Save Changes"/>
				</form>
			</div>

            <div class = "tab-content" id="sidebar-search">
                <div id = "scrollWrapper"> 
            <?php echo $pathfinderMenu ?>
                <div id = "search results"></div>
                <h1> Building/Room Information</h1>
                <div id = "itemTitle"><a>The University Of Kent</a></div>
                <div id = "itemInfo">
                <a>Welcome to the University Of Kent's Campus Maps! </a> </div>
                <div id = "itemPicture">
                    <br>
                    <img id = "itemIMG" src="floorplans/Campus%20Map%20Entire.svg">
                </div>
                <div id = "itemStaffInfo"> <br>
                    You can view building or room information in this sidebar by clicking on or searching for a building
                </div>
                <div id = "itemLinks"></div>
                <div id = "itemRooms"></div>
            </div>
             </div>    
        </div>
<?php 
	}
?>
	</body>
</HTML>