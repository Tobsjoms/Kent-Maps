<?php
	include 'inc/php/timetable-funcs.php';
	// Timetable source
	$file = 'http://www.kent.ac.uk/timetabling/ical/143131.ics';
	$iCal = new iCal($file);
	// Dates
	$day = date('w');
	$week_start = date('Y-m-d', strtotime('-'.$day.' days'));
	$week_end = date('Y-m-d', strtotime('+'.(6-$day).' days'));
	// Get
	$events = $iCal->eventsByDateBetween($week_start, $week_end);

	function colorFromString($string)
	{
		$colors = ['#e67e22', '#2ecc71', '#3498db', '#1abc9c', '#e74c3c', '#9b59b6', '#34495e'];
		$hash = substr(sha1($string), 0, 10);
		return $colors[hexdec($hash) % count($colors)];
	}
?>

<HTML>	
	<head>
		<title>KentMap</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" type="text/css" href="inc/css/style.css">
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		<script src="inc/js/svg-pan-zoom.js"></script>
		<script src="inc/js/svg-colours.js"></script>
	</head>

	<body class="sidebar-open">

		<div id="main-container">
			<div id="map"><object id="stage" data="floorplans/CW-SW-GF-Test.svg" type="image/svg+xml"></object></div>
			<script>
				window.onload = function(){
					var a = document.getElementById('stage');
	    			var svgDoc = a.contentDocument;
	    			var allSVG= svgDoc.getElementById("CW-SW-GF");
				    var panZoom = svgPanZoom(allSVG, {
				        zoomEnabled: true,
				        minZoom: 0.8,
				        controlIconsEnabled: false
				    });

				    panZoom.zoom(0.8);
				    panZoom.center();

				    updateSVGColourScheme();
				};
			</script>
			<div id="topbar">
				<div id="logo">
					<b>UKC</b>INFO 
				</div>
				<div id="search">
					<input type="text" spellcheck="false">
					<a href="#"><i class="material-icons">search</i></a>
				</div>

				<div id="user-panel">
					<div class="user">
						<i class="material-icons">account_circle</i>
						<div class="details">
							<span class="email">hn65@kent.ac.uk</span>
							<a href="#" class="logout">Log out</a>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div id="sidebar">
			<div class="navigation">
				<a href="#" class="selected"><i class="material-icons">date_range</i></a>
				<a href="#"><i class="material-icons">alarm</i><span>1</span></a>
			</div>
			<div id="timetable">
				<?php
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
				?>

			</div>
		</div>
	</body>
</HTML>