<?php
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
	$rows = $stmt->fetchAll();

	if (count($rows) == 0){
		echo "<h1>No deadlines!</h1>Deadlines are not added automatically.";
	}
	else{
		foreach ($rows as $row){
			$dateDifferenceDays = dateDifference($row[4], '%a');
			$borderColour = "#2ecc71"; // Green

			if ($dateDifferenceDays < 1){
				$borderColour = "#e74c3c";
			}
			elseif ($dateDifferenceDays <= 7) {
				$borderColour = "#e67e22"; 
			}

			echo "<div class='card' style='border-color:" . $borderColour . "'><a href='" . $row[3] . "'>" . $row[2] . "</a></br><b>" . dateDifference($row[4]) . "</b></div>";
		}
	}
?>