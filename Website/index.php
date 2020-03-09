<?php
	session_start();
	include 'inc/php/timetable-funcs.php';
	include('inc/php/db.php');

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

    //Map Type Handling
    
    if (isset($_GET["buildingID"])) {
        
            $building = $_GET["buildingID"];
    $mapElem = "<object id='stage' data='floorplans/Campus Map Entire.svg' type='image/svg+xml'></object>";
    $loadscript = "<script src='inc/js/mainMap.js'></script>";
    $mapFilterBox =  "<div>
                <div id='mapFilterBox'>
                    <div class='parkToggle'>
                        <a> Parking Icons</a>
                        <label class='switch'>
                            <input type=checkbox id='parkToggle'>
                            <span class ='slider round'></span>
                        </label>
                    </div>
                   <div class = 'textToggle'>
                    </div>
                </div>
                <div id = 'mapZoomContainer'>
                    <div id = 'zoomBox'>
                    <p id = 'zoomIn'>+</p>
                    <p id = 'zoomOut'>_</p>
                    </div>
                </div>
            </div>
		</div>";
    
    if($building != "svg16") { //if building is not the entire map file
        $mapElem = "<object id='stage' data='floorplans/$building' type='image/svg+xml'></object>";
        $loadscript = "<script src='inc/js/indoorMap.js'></script>";
            $mapFilterBox =  "<div>
                <div id='mapFilterBox'>
                   <div class = 'textToggle'>
                    </div>
                </div>
                <div id = 'mapZoomContainer'>
                    <div id = 'zoomBox'>
                    <p id = 'zoomIn'>+</p>
                    <p id = 'zoomOut'>_</p>
                    </div>
                </div>
            </div>
		</div>";
        }
 
    }

if (isset($_GET["search"])) {
    $search = $_GET["search"];
    $mapElem = "";
    $loadscript = "";
    $mapFilterBox =  "<div>
                <div id='mapFilterBox'>
                   <div class = 'textToggle'>
                    </div>
                </div>
                <div id = 'mapZoomContainer'>
                    <div id = 'zoomBox'>
                    <p id = 'zoomIn'>+</p>
                    <p id = 'zoomOut'>_</p>
                    </div>
                </div>
            </div>
		</div>";
}




?>
<HTML>
	<head>
		<title>UKCGURU</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" type="text/css" href="inc/css/style.css">
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		<script src="inc/js/jquery-3.4.1.js"></script>
		<script src="inc/js/svg-pan-zoom.js"></script>
        <?php
        echo $loadscript;
        ?>
		<script src="inc/js/coreScript.js"></script>
		<script src="inc/js/toggle-tab-funcs.js"></script>
	</head>

	<body <?= $bodyProperties ?> >

		<div id="main-container">
			<div id="map">
            <?php
            echo $mapElem;
            ?>
            </div>
			<div id="topbar">

				<div id="logo">
					<b>UKC</b>GURU
				</div>

				<div id="search">
					<input type="text" spellcheck="false" id="sInput">
					<a id = "sButton"><i class="material-icons">search</i></a>
				</div>

				<?php if (isset($_SESSION['id'])){ ?>
					<div id="user-panel">
						<div class="user">
							<i class="material-icons">account_circle</i>
							<div class="details">
								<span class="email"><?= $_SESSION['email'] ?></span>
								<a href="settings.php" class="link">Settings</a><a href="logout.php" class="link">Log out</a>
							</div>
						</div>
					</div>
				<?php }else{ ?>
					<div id="user-panel"><a href="login.php">Log in</a> or <a href="signup.php">sign up</a> to use more features!</div>
				<?php } ?>
			</div>
            <?php
            if(isset($mapFilterBox))
            echo $mapFilterBox;
                ?>
		<?php if (isset($_SESSION['id'])){ ?>
			<div id="sidebar">
				<div class="navigation" id="nav-tabs">
					<span class='selected' onClick="changeTab(this)" target="timetable"><i class="material-icons">date_range</i></span>
					<span onClick="changeTab(this)" target="deadlines"><i class="material-icons">alarm</i><span id="deadline-number">1</span></span>
                    <span onClick="changeTab(this)" target="mapResults" id="mapTab"><i class="material-icons">search</i></span>
				</div>
				<div class="tab-content visible" id="timetable">
					<?php
						if (!isset($events)){
							// Invalid url
							echo"<div class='day'><span class='day-label'>Timetable</span><div id='no-events'>You either haven't entered a timetable url, or the current one isn't working.</br></br>Update your <a href='settings.php'>settings</a>.</div></div>";
						}
						else{
							if (count($events) == 0){
								echo"<div class='day'><span class='day-label'>Nothing!</span><div id='no-events'>You have no events this week.</br></br>If you think this is an error, check your URL <a href='settings.php'>setting</a> is valid.</div></div>";
							}
							else{
								foreach ($events as $date => $events)
								{
									$day = DateTime::createFromFormat('Y-m-d', $date)->format('l');
									echo "<div class='day'><span class='day-label'>$day</span>";
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

				<div class="tab-content" id="deadlines">
					<?php include('inc/php/views/get-deadlines.php'); ?>


					<form action="inc/php/handlers/handle-add-deadline.php" method="post">
					    <input name="title" type="text" autocapitalize="off" spellcheck="true" required>   
					    <input name="link" type="text" autocapitalize="off" spellcheck="true" required>
					    <input name="date-time" type="datetime-local" required>

						<input class="button" id="submit-button" type="submit" name="submit" value="Save"/>
					</form>
				</div>
                <div class = "tab-content" id="mapResults">
                    <div id = "itemTitle"><a>The University Of Kent</a></div>
                    <div id = "itemInfo"></div>
                    <div id = "itemPicture">
                        <img id = "itemIMG">
                    </div>
                    
                    <div id = "itemStaffInfo"></div>
                    <div id = "itemLinks"></div>
                    <div id = "itemRooms"></div>
                </div>
			</div>
		<?php } ?>
	</body>
</HTML>