<?php
	include 'resources/php/ical.php';
	// Timetable source
	$file = 'http://www.kent.ac.uk/timetabling/ical/143131.ics';
	$iCal = new iCal($file);
	// Dates
	$day = date('w');
	$week_start = date('Y-m-d', strtotime('-'.$day.' days'));
	$week_end = date('Y-m-d', strtotime('+'.(6-$day).' days'));
	// Get
	$events = $iCal->eventsByDateBetween($week_start, $week_end);
?>

<HTML>	
	<head>
		<title>KentMap</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" type="text/css" href="style.css">
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	</head>

	<body>
		<div class="center search-page">
			<div id="logo">
				<b>UKC</b>INFO
			</div>
			<div id="search">
				<input type="text" spellcheck="false">
				<a href="#"><i class="material-icons">search</i></a>
			</div>
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
	</body>
</HTML>